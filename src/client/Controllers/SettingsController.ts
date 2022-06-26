import { KnitClient as Knit } from "@rbxts/knit";
import { Lighting, ReplicatedStorage } from "@rbxts/services";
import Logger from "shared/Logger";
import UI from "shared/UI";
import AnimatedButton from "shared/Util/AnimatedButton";
import Tweenable from "shared/Util/Tweenable";

declare global {
    interface KnitControllers {
        SettingsController: typeof SettingsController;
    }
}

const main = UI.Main();
const list = main.Settings.List;
type ToggleSwitch = typeof list.Shadows.Toggle;

const SettingsController = Knit.CreateController({
    Name: "SettingsController",
    State: {
        Shadows: true,
        PostProcessing: true
    },
    
    Update(): void {
        this.AnimateToggleSwitch(list.Shadows.Toggle, this.State.Shadows);
        this.AnimateToggleSwitch(list.PostProcessing.Toggle, this.State.PostProcessing);
    },

    AnimateToggleSwitch(toggleSwitch: ToggleSwitch, on: boolean): void {
        const spd = .25;
        const style = Enum.EasingStyle.Sine;
        const circle = new Tweenable(toggleSwitch.Circle, spd, style);
        const bg = new Tweenable(toggleSwitch, spd, style);
        const mini = new Tweenable(toggleSwitch.Circle.Mini, spd, style);
        const colors = {
            On: <Color3>toggleSwitch.GetAttribute("OnColor"),
            Off: <Color3>toggleSwitch.GetAttribute("OffColor")
        };

        if (on) {
            bg.Tween({ BackgroundColor3: colors.On });
            mini.Tween({ BackgroundColor3: colors.On });
            circle.Tween({ Position: new UDim2(.5, 0, .5, 0) });
        } else {
            bg.Tween({ BackgroundColor3: colors.Off });
            mini.Tween({ BackgroundColor3: colors.Off });
            circle.Tween({ Position: new UDim2(0, 0, .5, 0) });
        }
    },

    HandleSettingsInterface(): void {
        Logger.ComponentActive(this.Name);
        this.Update();

        const shadowsSwitch = list.Shadows.Toggle;
        const ppfxSwitch = list.PostProcessing.Toggle;
        shadowsSwitch.Button.MouseButton1Click.Connect(() => {
            this.State.Shadows = !this.State.Shadows;
            this.Update();
            Lighting.GlobalShadows = this.State.Shadows;
        });
        ppfxSwitch.Button.MouseButton1Click.Connect(() => {
            this.State.PostProcessing = !this.State.PostProcessing;
            this.Update();
            const ppfxClasses: string[] = ["BloomEffect", "SunRaysEffect", "Atmosphere"];
            for (const v of Lighting.GetChildren())
                if (ppfxClasses.includes(v.ClassName))
                    if (v.IsA("PostEffect"))
                        v.Enabled = this.State.PostProcessing;
                    else if (v.IsA("Atmosphere"))
                        if (this.State.PostProcessing)
                            ReplicatedStorage.FindFirstChildOfClass("Atmosphere")!.Parent = Lighting;
                        else
                            v.Parent = ReplicatedStorage;
        });
    }
});

export = SettingsController;