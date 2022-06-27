import { KnitClient as Knit } from "@rbxts/knit";
import { Player } from "@rbxts/knit/Knit/KnitClient";
import { ReplicatedFirst as Replicated, RunService } from "@rbxts/services";
import { CrosshairHandle } from "client/Classes/CrosshairHandle";
import UI from "shared/UI";
import Tweenable from "shared/Util/Tweenable";

declare global {
    interface KnitControllers {
        CrosshairController: typeof CrosshairController;
    }
}

let handle: CrosshairHandle;
const pgui = UI.Main().Parent;
const CrosshairController = Knit.CreateController({
    Name: "CrosshairController",
    Enabled: false,

    Toggle(on: boolean): CrosshairHandle | undefined {
        this.Enabled = on;
        if (on) {
            const ms = Player.GetMouse();
            const gui = Replicated.Assets.Crosshair.Clone();
            gui.Parent = pgui;
            const mouseMove = RunService.Stepped.Connect(() => {
                if (!gui) return;
                gui.Box.Position = new UDim2(0, ms.X, 0, ms.Y);
            });
            
            handle = new CrosshairHandle(gui, mouseMove);
        } else {
            handle?.Destroy();
            const extra = pgui?.FindFirstChild("Crosshair");
            extra?.Destroy();
        }
        return handle;
    },

    GetTweenPositions(line: Frame): { Closed: UDim2; Open: UDim2 } {
        return { 
            Closed: <UDim2>line.GetAttribute("Closed"),
            Open: <UDim2>line.GetAttribute("Open")
         };
    },

    HitAnim(head: boolean): void {
        const color = head ? Color3.fromRGB(255, 0, 0) : Color3.fromRGB(127, 127, 0);
        const ch = handle.GUI.Box;
        const style = Enum.EasingStyle.Sine;
        const time = .175;
        const t = new Tweenable(ch.T, time, style),
            b = new Tweenable(ch.B, time, style),
            l = new Tweenable(ch.L, time, style),
            r = new Tweenable(ch.R, time, style);
        
        const lines = [t, b, l, r];
        for (const line of lines)
            line.TweenInOut({ BackgroundColor3: color })
                .Completed.Connect(() => line.TweenInOut({ BackgroundColor3: Color3.fromRGB(255, 255, 255) }));
    },

    FireAnim(): void {
        //todo: tween each part of crosshair diff direction (gross)
        const ch = handle.GUI.Box;
        const t = this.GetTweenPositions(ch.T),
            b = this.GetTweenPositions(ch.B),
            l = this.GetTweenPositions(ch.L),
            r = this.GetTweenPositions(ch.R);

        const time = .08;
        const dir = Enum.EasingDirection.InOut, style = Enum.EasingStyle.Sine
        ch.T.TweenPosition(t.Open, dir, style, time, undefined, () => {
            ch.T.TweenPosition(t.Closed, dir, style, time);
        });
        ch.B.TweenPosition(b.Open, dir, style, time, undefined, () => {
            ch.B.TweenPosition(b.Closed, dir, style, time);
        });
        ch.L.TweenPosition(l.Open, dir, style, time, undefined, () => {
            ch.L.TweenPosition(l.Closed, dir, style, time);
        });
        ch.R.TweenPosition(r.Open, dir, style, time, undefined, () => {
            ch.R.TweenPosition(r.Closed, dir, style, time);
        });
    }
});

export = CrosshairController;