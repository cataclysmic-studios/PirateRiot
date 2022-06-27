import { KnitClient as Knit } from "@rbxts/knit";
import { ReplicatedFirst as Replicated } from "@rbxts/services";
import Logger from "shared/Logger";
import UI from "shared/UI";
import Tweenable from "shared/Util/Tweenable";

declare global {
    interface KnitControllers {
        ScoreNotificationController: typeof ScoreNotificationController;
    }
}

const score = Knit.GetService("ScoreService");
const main = UI.Main();
const notifier = main.Game.Notifier;
const ScoreNotificationController = Knit.CreateController({
    Name: "ScoreNotificationController",

    KnitStart() {
        Logger.ComponentActive(this.Name);
        score.ScoreAdded.Connect((amt, action) => {
            const killNotif = Replicated.Assets.UI.KillNotif.Clone();
            killNotif.Text = `[+${amt}] ${action}`;
            killNotif.Parent = notifier;

            task.spawn(() => {
                task.wait(4);
                const fader = new Tweenable(killNotif, 1, Enum.EasingStyle.Sine);
                fader.Tween({
                    TextTransparency: 1,
                    TextStrokeTransparency: 1
                }).Completed.Connect(() => killNotif.Destroy());
            });
        });
    }
});

export = ScoreNotificationController;