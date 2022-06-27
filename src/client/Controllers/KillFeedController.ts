import { KnitClient as Knit } from "@rbxts/knit";
import { Debris, ReplicatedFirst as Replicated } from "@rbxts/services";
import UI from "shared/UI";

declare global {
    interface KnitControllers {
        KillFeedController: typeof KillFeedController;
    }
}

const main = UI.Main();
const feed = main.Game.KillFeed;
const KillFeedController = Knit.CreateController({
    Name: "KillFeedController",

    AddKill(killer: string, victim: string, headshot: boolean): void {
        const obj = Replicated.Assets.UI.KillFeedObject.Clone();
        obj.Killer.Text = killer;
        obj.Victim.Text = victim;
        obj.KillType.Image = headshot ? "" : ""; //add images
        obj.Parent = feed;
        Debris.AddItem(obj, 10);
    }
});

export = KillFeedController;