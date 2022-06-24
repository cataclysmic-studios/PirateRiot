/* eslint-disable no-constant-condition */
import { KnitServer as Knit, RemoteSignal } from "@rbxts/knit";
import { Players, ReplicatedFirst as Replicated, RunService, ServerStorage, Workspace as World } from "@rbxts/services";
import Logger from "shared/Logger";
import RandomElement from "shared/Util/RandomElement";
import Teleport from "shared/Util/Teleport";
import WaitFor from "shared/Util/WaitFor";

declare global {
    interface KnitServices {
        RoundService: typeof RoundService;
    }
}

enum GameStatus {
    Intermission,
    InGame
}

class Mode {
    public constructor(
        public readonly Name: string,
        public readonly RoundLength: number
    ) {}
}

const modes = [new Mode("FFA", 300)];
const RoundService = Knit.CreateService({
    Name: "RoundService",
    Status: GameStatus.Intermission,

    Client: {
        Began: new RemoteSignal<(mapName: string, roundLength: number) => void>(),
        Ended: new RemoteSignal<(intermissionLength: number) => void>()
    },

    TeleportPlayers(map: Model): void {
        const spawns = <SpawnLocation[]>WaitFor<Folder>(map, "Spawns").GetChildren();
        for (const plr of Players.GetPlayers()) {
            const plrSpawn = RandomElement(spawns);
            const char = plr.Character ?? plr.CharacterAdded.Wait()[0];
            const torso = WaitFor<MeshPart>(char, "UpperTorso");
            torso.CFrame = plrSpawn.CFrame.add(new Vector3(0, 6, 0));
        }
    },

    ToggleSpawns(map: Model, on: boolean): void {
        const spawns = <SpawnLocation[]>WaitFor<Folder>(map, "Spawns").GetChildren();
        Logger.Debug("Turning spawns for", map.Name, on ? "on" : "off");
        for (const spawn of spawns)
            spawn.Enabled = on;
    },

    KnitStart(): void {
        Logger.ComponentActive(this.Name);
        task.wait(10);
        task.spawn(() => {
            const lobby = WaitFor<Model>(World, "Lobby");
            const settings = WaitFor<Configuration>(ServerStorage, RunService.IsStudio() ? "TestServerSettings" : "ServerSettings");
            const intermissionTime = <number>settings.GetAttribute("IntermissionTime")
            while (true) {
                this.Client.Ended.FireAll(intermissionTime);
                task.wait(intermissionTime);
                const mode = RandomElement(modes);
                const map = <Model>RandomElement(Replicated.Maps.GetChildren()).Clone();
                Logger.Debug("mode:", mode.Name, "map:", map.Name);

                this.Client.Began.FireAll(map.Name, mode.RoundLength);
                map.Parent = World;
                this.TeleportPlayers(map);
                this.ToggleSpawns(lobby, false);
                this.ToggleSpawns(map, true);

                task.wait(mode.RoundLength);
                this.ToggleSpawns(lobby, true);
                this.ToggleSpawns(map, false);
                this.TeleportPlayers(lobby);
                map.Destroy();
            }
        });
    }
});

export = RoundService;