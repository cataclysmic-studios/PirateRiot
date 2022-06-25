import { KnitClient as Knit } from "@rbxts/knit";
import { Player } from "@rbxts/knit/Knit/KnitClient";
import { Players, UserInputService as UIS, Workspace as World } from "@rbxts/services";
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
    CanShoot: true,

    Toggle(eq?: boolean): void {
        const flintlockServer = Knit.GetService("FlintlockService");
        const crosshair = Knit.GetController("CrosshairController");
        this.Equipped = eq ?? !this.Equipped;
        
        Logger.Debug("Flintlock toggled: ", this.Equipped);
        crosshair.Toggle(this.Equipped);
        if (this.Equipped) {    
            UIS.MouseIconEnabled = false;
            flintlockServer.PlayCharAnim("Idle");
            flintlockServer.PlayFlintlockAnim("Idle");
            flintlockServer.Equip();
        } else {
            UIS.MouseIconEnabled = true;
            flintlockServer.StopAnims();
            flintlockServer.Unequip();
        }
    },

    Fire(): void {
        Logger.Debug(Player, "fired flintlock");
        this.CanShoot = false;

        const char = Player.Character!;
        const flintlock = char.WaitForChild("Flintlock")
        const flintlockServer = Knit.GetService("FlintlockService");
        const muzzle = <Part>flintlock.WaitForChild("Muzzle"); //todo: muzzle flash vfx
        const params = new RaycastParams();
        params.FilterDescendantsInstances = [char];
        params.FilterType = Enum.RaycastFilterType.Blacklist;

        const castRes = World.Raycast(muzzle.Position, ms.Hit.Position, params);
        if (castRes) {
            const part = castRes.Instance;
            const victim = Players.GetPlayerFromCharacter(part.Parent)
            if (victim) {
                Logger.Debug(Player, "shot", victim);
            }
        }

        flintlockServer.ReloadEnded.Connect(() => this.CanShoot = true);
        flintlockServer.PlayCharAnim("Fire");
        flintlockServer.PlayFlintlockAnim("Fire");
        flintlockServer.CreateGunshotSound();
    },

    KnitStart(): void {
        Logger.ComponentActive(this.Name);
        ms.Button1Down.Connect(() => {
            if (this.Equipped && this.CanShoot)
                this.Fire();
        });
    }
});

export = FlintlockController;