import { KnitClient as Knit } from "@rbxts/knit";
import { Data as DataKeys } from "shared/Classes/Data";
import { Timer, TimerHandle } from "shared/Util/Timer";
import FormatInt from "shared/Util/FormatInt";
import UI from "shared/UI";
import Logger from "shared/Logger";

declare global {
    interface KnitControllers {
        UIController: typeof UIController;
    }
}

const UIController = Knit.CreateController({
    Name: "UIController",
    
    Update(key: string, value: defined): void {
        const main = UI.Main();
        Logger.Debug("key:", key, "value:", value);
        switch(key) {
            case "TEST_gold":
            case "gold":
                main.Game.Gold.Value.Text = tostring(FormatInt(<number>value));
                break;
        }
    },

    GetDefaultValue(dataKey: string): defined {
        switch(dataKey) {
            case "TEST_gold":
            case "gold":
                return 100;
            default:
                throw Logger.UnhandledCase("Unhandled default value case");
        }
    },

    GetTime(time: number): string {
        const min = math.floor(time / 60);
        const sec = time - (min * 60);
        return `${min}:${(1e15 + sec + "").sub(-2)}`;
    },

    KnitStart(): void {
        Logger.ComponentActive("UIController");
        const main = UI.Main();
        const gameStatus = main.Game.Status;
        const data = Knit.GetService("DataManager");
        data.DataUpdated.Connect((k, v) => this.Update(k, v));
        for (const k of DataKeys)
        this.Update(k, <defined>data.Get(k, this.GetDefaultValue(k)));
        
        const round = Knit.GetService("RoundService");
        const flintlock = Knit.GetController("FlintlockController");
        const roundTimer = new Timer();
        const setTime = (time: number): string => gameStatus.RemainingTime.Text = this.GetTime(time);
        let roundHandle: TimerHandle
        let intermissionHandle: TimerHandle

        roundTimer.OnSet.Connect(setTime);
        roundTimer.Count.Connect(setTime);
        round.Began.Connect((_, roundLength: number) => {
            main.Game.Status.Status.Text = "In Game";
            roundTimer.Stop(intermissionHandle);
            roundTimer.Set(roundLength);
            roundHandle = roundTimer.Start();
            flintlock.Toggle(true);
        });
        round.Ended.Connect((intermissionLength: number) => {
            main.Game.Status.Status.Text = "Intermission";
            if (roundHandle)
                roundTimer.Stop(roundHandle);
                
            roundTimer.Set(intermissionLength);
            intermissionHandle = roundTimer.Start();
            flintlock.Toggle(false);
        });
    }
});

export = UIController;