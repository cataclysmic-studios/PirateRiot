import { KnitClient as Knit } from "@rbxts/knit";
import { Player } from "@rbxts/knit/Knit/KnitClient";
import { ReplicatedFirst as Replicated, RunService } from "@rbxts/services";
import UI from "shared/UI";

declare global {
    interface KnitControllers {
        CrosshairController: typeof CrosshairController;
    }
}

const crosshair = Replicated.Assets.Crosshair;
let mouseMove: RBXScriptConnection;
let gui: typeof crosshair;
const CrosshairController = Knit.CreateController({
    Name: "CrosshairController",
    Enabled: false,

    Toggle(on: boolean): void {
        this.Enabled = on;
        if (on) {
            const ms = Player.GetMouse();
            gui = Replicated.Assets.Crosshair.Clone();
            gui.Parent = UI.Main().Parent;
            mouseMove = RunService.Stepped.Connect(() => gui.Box.Position = new UDim2(0, ms.X, 0, ms.Y));
        } else {
            mouseMove?.Disconnect();
            gui?.Destroy();
        }
    },

    FireAnim(): void {
        //todo: tween each part of crosshair diff direction (gross)
    }
});

export = CrosshairController;