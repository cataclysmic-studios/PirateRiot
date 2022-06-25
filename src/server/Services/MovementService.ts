import { KnitServer as Knit } from "@rbxts/knit";

declare global {
    interface KnitServices {
        MovementService: typeof MovementService;
    }
}

const MovementService = Knit.CreateService({
    Name: "MovementService",

    Client: {
    },

    KnitInit() {
    },

    KnitStart() {
    },
});

export = MovementService;