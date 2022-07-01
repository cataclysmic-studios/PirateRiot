import { KnitServer as Knit, RemoteSignal } from "@rbxts/knit";
import { Players } from "@rbxts/services";
import StrictMap from "shared/Util/StrictMap";
import Logger from "shared/Logger";

declare global {
    interface KnitServices {
        ScoreService: typeof ScoreService;
    }
}

interface Score {
    Kills: number;
    Deaths: number;
    Streak: number;
    KDR: number;
    Score: number;
}

const defaultScore = {
    Kills: 0,
    Deaths: 0,
    Streak: 0,
    KDR: 0,
    Score: 0
};

const ScoreService = Knit.CreateService({
    Name: "ScoreService",
    ScoreSet: new StrictMap<Player, Score>(),

    Client: {
        Changed: new RemoteSignal<() => void>(),
        ScoreAdded: new RemoteSignal<(amount: number, action: string) => void>(),
        AddKill(plr: Player): void {
            this.Server.AddKill(plr);
        },
        AddDeath(plr: Player): void {
            this.Server.AddDeath(plr);
        },
        AddScore(plr: Player, amount: number, action: string): void {
            this.Server.AddScore(plr, amount, action);
        },
        GetScores(client: Player, plr: Player): Score {
            return this.Server.ScoreSet.Get(plr);
        }
    },
    
    AddScore(plr: Player, amount: number, action: string): void {
        const score = this.ScoreSet.Get(plr);
        score.Score += amount;
        this.ScoreSet.Set(plr, score);
        this.Client.Changed.FireAll();
        this.Client.ScoreAdded.Fire(plr, amount, action);
    },

    AddKill(plr: Player): void {
        const score = this.ScoreSet.Get(plr);
        score.Kills += 1;
        score.Streak += 1;
        score.KDR = score.Kills / score.Deaths;
        this.ScoreSet.Set(plr, score);
        this.Client.Changed.FireAll();
    },

    AddDeath(plr: Player): void {
        const score = this.ScoreSet.Get(plr);
        score.Deaths += 1;
        score.Streak = 0;
        score.KDR = score.Kills / score.Deaths;
        this.ScoreSet.Set(plr, score);
        this.Client.Changed.FireAll();
    },

    ResetScores(): void {
        for (const plr of Players.GetPlayers())
            this.ScoreSet.Set(plr, defaultScore);
    },

    KnitInit() {
        Logger.ComponentActive(this.Name);
        Players.PlayerRemoving.Connect(plr => {
            this.ScoreSet.Delete(plr);
            this.Client.Changed.FireAll();
        });
        Players.PlayerAdded.Connect(plr => {
            this.ScoreSet.Set(plr, defaultScore);
            this.Client.Changed.FireAll();
        });
    }
});

export = ScoreService;