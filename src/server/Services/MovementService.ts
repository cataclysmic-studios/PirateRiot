import { KnitServer as Knit } from "@rbxts/knit";
import { ReplicatedFirst as Replicated} from "@rbxts/services";
import Logger from "shared/Logger";

declare global {
    interface KnitServices {
        MovementService: typeof MovementService;
    }
}

const rollAnim = Replicated.Assets.Animations.Roll;
const MovementService = Knit.CreateService({
    Name: "MovementService",
    Rolling: false,
    Active: false,

    Client: {
        IsActive(plr: Player): boolean {
            return this.Server.Active;
        },
        Roll(plr: Player): void {
            this.Server.Roll(plr);
        },
        Toggle(plr: Player, on: boolean): void {
            this.Server.Toggle(plr, on)
        }
    },

    KnitStart(): void {
        Logger.ComponentActive(this.Name);
    },

    Roll(plr: Player): void {
        if (this.Rolling) return;
        this.Rolling = true;

        Logger.Debug(plr, "rolled");
        const char = plr.Character!;
        const root = char.PrimaryPart!;
        const hum = char.FindFirstChildOfClass("Humanoid")!;
        const anim = rollAnim.Clone();
        const track = hum.LoadAnimation(anim);

        track.Stopped.Connect(() => {
            this.Rolling = false;
        });
        track.AdjustSpeed(1.25);
        track.Play();
        task.spawn(() => {
            task.wait(.2);
            const mover = new Instance("BodyVelocity", root);
            mover.MaxForce = new Vector3(1, 0, 1).mul(30000);
            mover.Velocity = root.CFrame.LookVector.mul(35);
            for (let i = 1; i <= 6; i++) {
                task.wait(.07);
                mover.Velocity = mover.Velocity.mul(.85);
            }
            mover.Destroy();
        });
    },

    Toggle(plr: Player, on: boolean): void {
        this.Active = on;
        this.Rolling = false;
    }
});

export = MovementService;