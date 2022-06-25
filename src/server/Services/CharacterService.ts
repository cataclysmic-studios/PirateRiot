import { KnitServer as Knit } from "@rbxts/knit";
import { Players, ReplicatedFirst as Replicated } from "@rbxts/services";
import WaitFor from "shared/Util/WaitFor";
import Logger from "shared/Logger";
import RandomElement from "shared/Util/RandomElement";

declare global {
    interface KnitServices {
        CharacterService: typeof CharacterService;
    }
}

const CharacterService = Knit.CreateService({
    Name: "CharacterService",

    Client: {
        Change(plr: Player, gender: "Male" | "Female"): void {
            this.Server.Change(plr, gender);
        }
    },

    Change(plr: Player, gender: "Male" | "Female"): void {
        const char = plr.Character!;
        const newChar = WaitFor<Model>(Replicated.Assets.Characters, gender).Clone();
        for (const a of char.GetDescendants())
            if (a.IsA("Accessory") || a.IsA("Clothing"))
                a.Destroy();
        for (const a of newChar.GetDescendants())
            if (a.IsA("Accessory") || a.IsA("Clothing"))
                a.Parent = char;
    },

    KnitStart(): void {
        Logger.ComponentActive(this.Name);
        Players.PlayerAdded.Connect(plr =>
            plr.CharacterAdded.Connect(char => {
                const bodyColors = char.FindFirstChildOfClass("BodyColors")!;
                const skinColor = RandomElement([
                    Color3.fromRGB(255, 204, 153),
                    Color3.fromRGB(234, 184, 146),
                    Color3.fromRGB(204, 142, 105),
                    Color3.fromRGB(160, 95, 53),
                    Color3.fromRGB(143, 76, 42),
                    Color3.fromRGB(105, 64, 40),
                    Color3.fromRGB(108, 88, 75),
                    Color3.fromRGB(86, 66, 54),
                    Color3.fromRGB(160, 132, 79),
                    Color3.fromRGB(254, 243, 187)
                ]);

                bodyColors.HeadColor3 = skinColor;
                bodyColors.TorsoColor3 = skinColor;
                bodyColors.LeftArmColor3 = skinColor;
                bodyColors.RightArmColor3 = skinColor;
                bodyColors.LeftLegColor3 = skinColor;
                bodyColors.RightLegColor3 = skinColor;
            }));
    }
});

export = CharacterService;