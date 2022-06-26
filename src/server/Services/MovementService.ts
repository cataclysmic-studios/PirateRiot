import { KnitServer as Knit } from "@rbxts/knit";
import { Debris } from "@rbxts/services";
import Logger from "shared/Logger";

declare global {
    interface KnitServices {
        MovementService: typeof MovementService;
    }
}

const MovementService = Knit.CreateService({
    Name: "MovementService",
    Active: false,

    Client: {
        IsActive(plr: Player): boolean {
            return this.Server.Active;
        },
        Roll(plr: Player): void {
            this.Server.Roll(plr);
        },
        Toggle(plr: Player, on: boolean): void {
            this.Server.Toggle(plr, on)
        }
    },

    Roll(plr: Player): void {
        Logger.Debug(plr, "rolled");
        const char = plr.Character!;
        const mover = new Instance("BodyVelocity");
        const root = char.PrimaryPart!;
        mover.Parent = root;
        mover.Velocity = root.CFrame.LookVector.mul(1000);
        Debris.AddItem(mover, 5)
    },

    Toggle(plr: Player, on: boolean): void {
        this.Active = on;
    }
});

export = MovementService;