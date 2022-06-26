import { KnitClient as Knit } from "@rbxts/knit";
import { Player } from "@rbxts/knit/Knit/KnitClient";
import { Lighting, StarterGui } from "@rbxts/services";
import { Data as DataKeys } from "shared/Classes/Data";
import { Timer, TimerHandle } from "shared/Util/Timer";
import { Tween } from "shared/Util/Tween";
import AnimatedButton from "shared/Util/AnimatedButton";
import Tweenable from "shared/Util/Tweenable";
import FormatInt from "shared/Util/FormatInt";
import WaitFor from "shared/Util/WaitFor";
import Logger from "shared/Logger";
import UI from "shared/UI";
import { GameStatus } from "shared/Classes/GameStatus";

declare global {
    interface KnitControllers {
        UIController: typeof UIController;
    }
}

const main = UI.Main();
const gameStatus = main.Game.Status;
const gold = main.Game.Gold;
const chooseCharacter = main.Game.ChooseCharacter;
const charSelect = main.CharacterSelect;
let frameOpenCD = false;
const UIController = Knit.CreateController({
    Name: "UIController",

    KnitStart(): void {
        Logger.ComponentActive("UIController");
        StarterGui.SetCoreGuiEnabled("All", false);

        const data = Knit.GetService("DataManager");
        data.DataUpdated.Connect((k, v) => this.Update(k, v));
        for (const k of DataKeys)
            this.Update(k, <defined>data.Get(k, this.GetDefaultValue(k)));
        
        this.HandleButtonAnims();
        this.HandleButtons();
        this.HandleRounds();
    },

    Update(key: string, value: defined): void {
        const main = UI.Main();
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

    ToggleBlur(on: boolean): void {
        const blur = WaitFor<BlurEffect>(Lighting, "Blur");
        const info = new TweenInfo(.5, Enum.EasingStyle.Sine);
        const size = 15;
        if (on) {
            blur.Size = 0;
            blur.Enabled = true;
            Tween(blur, info, {
                Size: size
            });
        } else {            
            Tween(blur, info, {
                Size: 0
            }).Completed.Connect(() => blur.Enabled = false);
        }
    },

    OpenFrame(name: string): void {
        if (frameOpenCD) return;
        frameOpenCD = true;
        
        const closed = new UDim2(.5, 0, 1.5, 0);
        const spd = .25;
        const style = Enum.EasingStyle.Sine
        if (name === "Game") {
            for (const frame of main.GetChildren())
                if (frame.IsA("Frame") && frame.Name !== "Game")
                    new Tweenable(frame, spd, style).Tween({
                        Position: closed
                    }).Completed.Connect(() => frameOpenCD = false);

            main.Game.Visible = true;
            this.ToggleBlur(false);
        } else {
            main.Game.Visible = false;
            this.ToggleBlur(true);
            const open = new UDim2(.5, 0, .5, 0);
            const frame = new Tweenable(WaitFor<Frame>(main, name), spd, style);
            frame.Tween({
                Position: open
            });
            frameOpenCD = false;
        }
    },

    SpinViewportModel(model: Model): void {
        task.spawn(() => {
            // eslint-disable-next-line no-constant-condition
            while (true) {
                model.SetPrimaryPartCFrame(model.PrimaryPart!.CFrame.mul(CFrame.Angles(0, math.rad(1), 0)));
                task.wait(.025);
            }
        });
    },

    SelectCharacter(gender: "Male" | "Female"): void {
        Logger.Debug("Chose", gender, "character");
        const character = Knit.GetService("CharacterService");
        this.OpenFrame("Game");
        character.Change(gender);
    },

    HandleButtonAnims(): void {
        const addGold = new AnimatedButton(gold.Add);
        const chooseChar = new AnimatedButton(chooseCharacter);
        const closeCharChooser = new AnimatedButton(charSelect.Close);
        const maleBtn = new AnimatedButton(charSelect.Male);
        const femaleBtn = new AnimatedButton(charSelect.Female);
        const settings = new AnimatedButton(main.Game.Settings);
        const pop = 3, spd = .2
        addGold.HoverPop(pop, spd);
        addGold.ClickPop(pop, spd);
        settings.HoverPop(pop, spd);
        settings.ClickPop(pop, spd);
        chooseChar.HoverPop(pop, spd);
        chooseChar.ClickPop(pop, spd);
        closeCharChooser.HoverPop(pop, spd);
        closeCharChooser.ClickPop(pop, spd);
        maleBtn.HoverPop(pop * 2, spd);
        maleBtn.ClickPop(pop * 2, spd);
        femaleBtn.HoverPop(pop * 2, spd);
        femaleBtn.ClickPop(pop * 2, spd);
    },

    HandleButtons(): void {
        const settings = Knit.GetController("SettingsController");
        settings.HandleSettingsInterface();
        this.SpinViewportModel(charSelect.Male.Viewport.Male);
        this.SpinViewportModel(charSelect.Female.Viewport.Female);
        charSelect.Male.MouseButton1Click.Connect(() => this.SelectCharacter("Male"));
        charSelect.Female.MouseButton1Click.Connect(() => this.SelectCharacter("Female"));
        chooseCharacter.MouseButton1Click.Connect(() => this.OpenFrame("CharacterSelect"));
        main.CharacterSelect.Close.MouseButton1Click.Connect(() => this.OpenFrame("Game"));
        main.Game.Settings.MouseButton1Click.Connect(() => this.OpenFrame("Settings"));
        main.Settings.Close.MouseButton1Click.Connect(() => this.OpenFrame("Game"));
    },

    HandleRounds(): void {
        const round = Knit.GetService("RoundService");
        const flintlock = Knit.GetController("FlintlockController");
        const crosshair = Knit.GetController("CrosshairController");
        const movementServer = Knit.GetService("MovementService");
        const toggleOff = () => {
            flintlock.Toggle(false);
            crosshair.Toggle(false);
        }

        Player.Character!.FindFirstChildOfClass("Humanoid")!.Died.Connect(toggleOff);
        Player.CharacterAdded.Connect(() => {
            if (round.GetStatus() !== GameStatus.InGame) return;
            toggleOff();
            flintlock.Toggle(true);
            crosshair.Toggle(true);
        });

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
            movementServer.Toggle(true);
            this.OpenFrame("Game")
            chooseCharacter.Visible = false;
        });
        round.Ended.Connect((intermissionLength: number) => {
            main.Game.Status.Status.Text = "Intermission";
            if (roundHandle)
                roundTimer.Stop(roundHandle);
                
            roundTimer.Set(intermissionLength);
            intermissionHandle = roundTimer.Start();
            flintlock.Toggle(false);
            movementServer.Toggle(false);
            chooseCharacter.Visible = true;
        });
    }
});

export = UIController;