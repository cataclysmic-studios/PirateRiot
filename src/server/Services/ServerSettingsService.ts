import { KnitServer as Knit } from "@rbxts/knit";

declare global {
    interface KnitServices {
        ServerSettingsService: typeof ServerSettingsService;
    }
}

let ScoreMultiplier = 1;
const ServerSettingsService = Knit.CreateService({
    Name: "ServerSettingsService",
    
    Client: {
        GetScoreMultiplier(): number {
            return this.Server.GetScoreMultiplier();
        },
        SetScoreMultiplier(plr: Player, mult: number): void {
            this.Server.SetScoreMultiplier(plr, mult);
        },
    },

    SetScoreMultiplier(plr: Player, mult: number): void {
        ScoreMultiplier = mult;
    },

    GetScoreMultiplier(): number {
        return ScoreMultiplier;
    }
});

export = ServerSettingsService;