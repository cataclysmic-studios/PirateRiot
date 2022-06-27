import { KnitServer as Knit, RemoteSignal } from "@rbxts/knit";
import { Players, ReplicatedFirst as Replicated } from "@rbxts/services";
import Logger from "shared/Logger";
import WaitFor from "shared/Util/WaitFor";
import Weld from "shared/Util/Weld";

declare global {
    interface KnitServices {
        FlintlockService: typeof FlintlockService;
    }
}

type AnimName = "Idle" | "Fire"
type AnimType = "Char" | "Flintlock"
const storedAnims = new Map<string, AnimationTrack | undefined>();
const FlintlockService = Knit.CreateService({
    Name: "FlintlockService",

    Client: {
        ReloadEnded: new RemoteSignal<() => void>(),
        HitPlayer(plr: Player, char: Model): void {
            this.Server.HitPlayer(plr, char);
        },
        StopAnims(plr: Player): void {
            this.Server.StopAnims(plr);
        },
        Unequip(plr: Player): void {
            this.Server.Unequip(plr);
        },
        Equip(plr: Player): void {
            this.Server.Equip(plr);
        },
        PlayCharAnim(plr: Player, name: AnimName): void {
            this.Server.PlayCharAnim(plr, name);
        },
        PlayFlintlockAnim(plr: Player, name: AnimName): void {
            this.Server.PlayFlintlockAnim(plr, name);
        },
        CreateGunshotSound(plr: Player): void {
            this.Server.CreateGunshotSound(plr);
        }
    },

    HitPlayer(plr: Player, char: Model): void {
        const score = Knit.GetService("ScoreService");
        const data = Knit.GetService("DataService");
        const serverSettings = Knit.GetService("ServerSettingsService");
        const hum = char.FindFirstChildOfClass("Humanoid");
        hum!.TakeDamage(100);

        const scoreMult = serverSettings.GetScoreMultiplier();
        score.AddScore(plr, 100 * scoreMult, "Killed " + char.Name);
        score.AddKill(plr);

        const victim = Players.GetPlayerFromCharacter(char);
        if (victim)
            score.AddDeath(victim);

        data.Increment(plr, "gold", math.random(10, 100));
    },

    Unequip(plr: Player): void {
        const char = plr.Character ?? plr.CharacterAdded.Wait()[0];
        const flintlock = char.FindFirstChild("Flintlock");
        flintlock?.Destroy();
    },

    Equip(plr: Player): void {
        const char = plr.Character ?? plr.CharacterAdded.Wait()[0];
        const flintlock = Replicated.Assets.Flintlock.Clone();
        const hand = WaitFor<Part>(char, "RightHand");
        flintlock.SetPrimaryPartCFrame(hand.CFrame.mul(CFrame.Angles(math.rad(-90), 0, 0)));
        Weld(hand, flintlock.Handle);
        flintlock.Parent = char
    },

    PlayAnim(plr: Player, aType: AnimType, name: AnimName, controller?: AnimationController | Humanoid): AnimationTrack | undefined {
        if (!controller) return;
        const animName = aType + name;
        const anim = WaitFor<Animation>(Replicated.Assets.Animations, animName).Clone();
        let track: AnimationTrack;
        if (controller.ClassName === "Humanoid")
            track = (<Humanoid>controller)?.LoadAnimation(anim);
        else {
            if (controller.ClassName !== "AnimationController") return;
            track = (<AnimationController>controller)?.LoadAnimation(anim);
        }

        storedAnims.set(animName + "_" + plr.Name, track);
        track.Stopped.Connect(() => {
            storedAnims.delete(animName + "_" + plr.Name);
            anim.Destroy();
        });
        track.Play();

        return track;
    },

    PlayCharAnim(plr: Player, name: AnimName): void {
        const controller = plr.Character?.FindFirstChildOfClass("Humanoid");
        const track = this.PlayAnim(plr, "Char", name, controller);
        if (name === "Fire")
            track?.Stopped.Connect(() => this.Client.ReloadEnded.Fire(plr))
    },

    PlayFlintlockAnim(plr: Player, name: AnimName): void {
        const controller = plr.Character?.FindFirstChild("Flintlock")?.FindFirstChildOfClass("AnimationController");
        this.PlayAnim(plr, "Flintlock", name, controller);
    },

    StopAnims(plr: Player): void {
        storedAnims.forEach((track, key) => {
            if (key.find(plr.Name)[0])
                track?.Stop();
        });
    },

    CreateGunshotSound(plr: Player): void {
        const char = plr.Character;
        const fireSound = Replicated.Assets.Sounds.Shoot.Clone();
        const reloadSound = Replicated.Assets.Sounds.Reload.Clone();
        fireSound.Parent = char
        reloadSound.Parent = char
        fireSound.Stopped.Connect(() => reloadSound.Play());
        reloadSound.Stopped.Connect(() => {
            fireSound.Destroy();
            reloadSound.Destroy();
        });

        fireSound.Play();
    }
});

export = FlintlockService;