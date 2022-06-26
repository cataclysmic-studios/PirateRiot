import { KnitClient as Knit } from "@rbxts/knit";
import { Player } from "@rbxts/knit/Knit/KnitClient";
import { ReplicatedFirst as Replicated, UserInputService as UIS } from "@rbxts/services";

declare global {
    interface KnitControllers {
        MovementController: typeof MovementController;
    }
}

const MovementController = Knit.CreateController({
    Name: "MovementController",
    Rolling: false,

    Roll(): void {
        this.Rolling = true;
        const char = Player.Character!;
        const hum = char.FindFirstChildOfClass("Humanoid")!;
        const rollAnim = Replicated.Assets.Animations.Roll.Clone();
        const track = hum.LoadAnimation(rollAnim);
        track.Stopped.Connect(() => this.Rolling = false);
        track.Play();
    },

    KnitStart() {
        const movementServer = Knit.GetService("MovementService");
        UIS.InputBegan.Connect(({ KeyCode: key }) => {
            if (!movementServer.IsActive()) return;
            if (key === Enum.KeyCode.R) {
                if (this.Rolling) return;
                this.Roll();
                movementServer.Roll();
            }
        });
    }
});

export = MovementController;