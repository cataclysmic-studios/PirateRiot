/* eslint-disable no-constant-condition */
import { KnitServer as Knit, RemoteSignal, Signal } from "@rbxts/knit";
import { Players, ReplicatedFirst as Replicated, RunService, ServerStorage, Workspace as World } from "@rbxts/services";
import { GameStatus } from "shared/Classes/GameStatus";
import { Timer, TimerHandle } from "shared/Util/Timer";
import RandomElement from "shared/Util/RandomElement";
import WaitFor from "shared/Util/WaitFor";
import Logger from "shared/Logger";

declare global {
    interface KnitServices {
        RoundService: typeof RoundService;
    }
}

class Mode {
    public constructor(
        public readonly Name: string,
        public readonly RoundLength: number
    ) {}
}

const modes = [new Mode("FFA", 300)];
const roundTimer = new Timer();
let roundHandle: TimerHandle;
let intermissionHandle: TimerHandle;
let map: Model;
let mode: Mode;

const RoundService = Knit.CreateService({
    Name: "RoundService",
    Status: GameStatus.Intermission,
    
    Client: {
        Began: new RemoteSignal<(mapName: string, roundLength: number) => void>(),
        Ended: new RemoteSignal<(intermissionLength: number) => void>(),
        OnTimerSet: new RemoteSignal<(time: number) => void>(),
        OnTimerCount: new RemoteSignal<(timeRemaining: number) => void>(),
        GetStatus(): GameStatus {
            return this.Server.Status;
        },
        GetMap(): Model | undefined {
            return map;
        },
        GetMode(): Mode | undefined {
            return mode;
        }
    },

    TeleportPlayers(map: Model): void {
        const spawns = <SpawnLocation[]>WaitFor<Folder>(map, "Spawns").GetChildren();
        for (const plr of Players.GetPlayers()) {
            const plrSpawn = RandomElement(spawns);
            const char = plr.Character ?? plr.CharacterAdded.Wait()[0];
            const torso = WaitFor<MeshPart>(char, "UpperTorso");
            torso.CFrame = plrSpawn.CFrame.add(new Vector3(0, 10, 0));
        }
    },

    SetTimerSpeed(multiplier: number): void {
        roundTimer.SetTimescale(multiplier);
    },

    ToggleSpawns(map: Model, on: boolean): void {
        const spawns = <SpawnLocation[]>WaitFor<Folder>(map, "Spawns").GetChildren();
        for (const spawn of spawns)
            spawn.Enabled = on;
    },

    StartIntermissionTimer(intermissionLength: number): void {
        if (roundHandle)
            roundTimer.Stop(roundHandle);
            
        roundTimer.Set(intermissionLength);
        intermissionHandle = roundTimer.Start();
    },

    StartRoundTimer(roundLength: number): void {
        roundTimer.Stop(intermissionHandle);
        roundTimer.Set(roundLength);
        roundHandle = roundTimer.Start();
    },

    KnitStart(): void {
        Logger.ComponentActive(this.Name);
        const score = Knit.GetService("ScoreService");

        roundTimer.OnSet.Connect(time => this.Client.OnTimerSet.FireAll(time));
        roundTimer.Count.Connect(timeRemaining => this.Client.OnTimerCount.FireAll(timeRemaining));
        task.spawn(() => {
            const lobby = WaitFor<Model>(World, "Lobby");
            const settings = WaitFor<Configuration>(ServerStorage, RunService.IsStudio() ? "TestServerSettings" : "ServerSettings");
            const intermissionTime = <number>settings.GetAttribute("IntermissionTime")
            while (true) {
                score.ResetScores();
                this.Status = GameStatus.Intermission;
                this.Client.Ended.FireAll(intermissionTime);
                this.StartIntermissionTimer(intermissionTime)
                roundTimer.Finished.Wait();

                mode = RandomElement(modes);
                map = <Model>RandomElement(Replicated.Maps.GetChildren()).Clone();
                Logger.Debug("mode:", mode.Name, "map:", map.Name);
                
                map.Parent = World;
                this.ToggleSpawns(lobby, false);
                this.ToggleSpawns(map, true);
                this.Status = GameStatus.InGame;
                this.Client.Began.FireAll(map.Name, mode.RoundLength);
                this.StartRoundTimer(mode.RoundLength)
                this.TeleportPlayers(map);
                roundTimer.Finished.Wait();
                
                this.ToggleSpawns(lobby, true);
                this.ToggleSpawns(map, false);
                this.TeleportPlayers(lobby);
                map.Destroy();
            }
        });
    }
});

export = RoundService;