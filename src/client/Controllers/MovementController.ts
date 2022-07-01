import { KnitClient as Knit } from "@rbxts/knit";
import { ReplicatedFirst as Replicated, UserInputService as UIS } from "@rbxts/services";

declare global {
    interface KnitControllers {
        MovementController: typeof MovementController;
    }
}

const MovementController = Knit.CreateController({
    Name: "MovementController",

    KnitStart() {
        const movementServer = Knit.GetService("MovementService");
        UIS.InputBegan.Connect(({ KeyCode: key }, processed) => {
            if (!movementServer.IsActive()) return;
            if (processed) return;
            if (key === Enum.KeyCode.R)
                movementServer.Roll();
        });
    }
});

export = MovementController;