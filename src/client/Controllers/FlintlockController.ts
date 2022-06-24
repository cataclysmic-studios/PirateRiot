import { KnitClient as Knit } from "@rbxts/knit";
import { Player } from "@rbxts/knit/Knit/KnitClient";
import Logger from "shared/Logger";

declare global {
    interface KnitControllers {
        FlintlockController: typeof FlintlockController;
    }
}

const ms = Player.GetMouse();
const FlintlockController = Knit.CreateController({
    Name: "FlintlockController",
    Equipped: false,

    Toggle(eq?: boolean): void {
        const flintlockServer = Knit.GetService("FlintlockService");
        this.Equipped = eq ?? !this.Equipped;
        
        Logger.Debug("Flintlock toggled: ", this.Equipped);
        if (this.Equipped) {
            flintlockServer.Equip();

            // ms.Icon = "";
            flintlockServer.PlayCharAnim("Idle");
            flintlockServer.PlayFlintlockAnim("Idle");
        } else {
            ms.Icon = "";
            flintlockServer.StopAnims();
            flintlockServer.Unequip();
        }
    },

    KnitStart(): void {
        Logger.ComponentActive(this.Name);
        const flintlockServer = Knit.GetService("FlintlockService");
        ms.Button1Down.Connect(() => {
            if (this.Equipped) {
                Logger.Debug(Player, "fired flintlock");
                flintlockServer.CreateGunshotSound();
                flintlockServer.PlayCharAnim("Fire");
                flintlockServer.PlayFlintlockAnim("Fire");
            }
        });
    }
});

export = FlintlockController;