import { KnitClient as Knit } from "@rbxts/knit";

declare global {
    interface KnitControllers {
        MovementController: typeof MovementController;
    }
}

const MovementController = Knit.CreateController({
    Name: "MovementController",

    KnitInit() {
    },

    KnitStart() {
    },
});

export = MovementController;