import { KnitClient as Knit } from "@rbxts/knit";
import { Player } from "@rbxts/knit/Knit/KnitClient";
import { Debris, Players, ReplicatedFirst as Replicated, RunService, SoundService, UserInputService as UIS, Workspace as World } from "@rbxts/services";
import Logger from "shared/Logger";

declare global {
    interface KnitControllers {
        FlintlockController: typeof FlintlockController;
    }
}

const max_dist = 1000;

const ms = Player.GetMouse();
const sounds = Replicated.Assets.Sounds;
const flintlockServer = Knit.GetService("FlintlockService");
const score = Knit.GetService("ScoreService");
const serverSettings = Knit.GetService("ServerSettingsService");
const FlintlockController = Knit.CreateController({
    Name: "FlintlockController",
    Equipped: false,
    CanShoot: true,

    Toggle(eq?: boolean): void {
        const crosshair = Knit.GetController("CrosshairController");
        this.Equipped = eq ?? !this.Equipped;
        
        crosshair.Toggle(this.Equipped);
        if (this.Equipped) {    
            UIS.MouseIconEnabled = false;
            flintlockServer.PlayCharAnim("Idle");
            flintlockServer.PlayFlintlockAnim("Idle");
            flintlockServer.Equip();
        } else {
            UIS.MouseIconEnabled = true;
            flintlockServer.StopAnims();
            flintlockServer.Unequip();
        }
    },

    Fire(): void {
        this.CanShoot = false;
        const crosshair = Knit.GetController("CrosshairController");
        crosshair.FireAnim();
        
        const char = Player.Character!;
        const flintlock = char.WaitForChild("Flintlock")
        const muzzle = <Part>flintlock.WaitForChild("Muzzle");
        this.CreateMuzzleFlashVFX(muzzle);
        
        const msLocation = UIS.GetMouseLocation();
        const ray2D = World.CurrentCamera!.ViewportPointToRay(msLocation.X, msLocation.Y);
        const dir = ray2D.Direction.mul(max_dist);
        const params = new RaycastParams();
        params.FilterDescendantsInstances = [char, World.WaitForChild("Ignore")];
        params.FilterType = Enum.RaycastFilterType.Blacklist;
        
        const castRes = World.Raycast(ray2D.Origin, dir, params);
        if (castRes)
            this.Hit(castRes, ray2D, char);
        
        flintlockServer.ReloadEnded.Connect(() => this.CanShoot = true);
        flintlockServer.PlayCharAnim("Fire");
        flintlockServer.PlayFlintlockAnim("Fire");
        flintlockServer.CreateGunshotSound();
    },

    Hit(castRes: RaycastResult, ray2D: Ray, char: Model): void {
        const crosshair = Knit.GetController("CrosshairController");
        const killFeed = Knit.GetController("KillFeedController");
        const part = castRes.Instance;
        const victimChar = part.FindFirstAncestorOfClass("Model");
        const hum = victimChar?.FindFirstChildOfClass("Humanoid");
        if (victimChar && hum) {
            if (hum.Health === 0) return;
            Logger.Debug(Player, "shot", victimChar.Name);
            const headshot = part.Name === "Head";
            const dist = victimChar.PrimaryPart!.Position.sub(char.PrimaryPart!.Position).Magnitude;
            crosshair.HitAnim(headshot);
            flintlockServer.HitPlayer(victimChar);
            
            const scoreMult = serverSettings.GetScoreMultiplier();
            if (dist > 100)
                score.AddScore(75 * scoreMult, "Longshot")
            if (headshot)
                score.AddScore(50 * scoreMult, "Headshot");

            this.CreateSound(headshot ? sounds.Headshot : sounds.Kill);
            killFeed.AddKill(char.Name, victimChar.Name, headshot);
        } else {
            const hitCF = new CFrame(castRes.Position, ray2D.Direction);
            this.CreateHitDustVFX(hitCF, castRes.Instance.Color);
        }
    },

    CreateHitDustVFX(hitCF: CFrame, hitColor: Color3): void {
        const [h, s, v] = hitColor.ToHSV();
        const dust = Replicated.Assets.VFX.Dust.Clone();
        dust.CFrame = hitCF;
        dust.Particles.Color = new ColorSequence(Color3.fromHSV(h, s / 1.75, v));
        dust.Smoke.Color = new ColorSequence(Color3.fromHSV(h, s / 1.5, v));
        dust.Parent = World.WaitForChild("Ignore");
        // if (RunService.IsStudio())
        //     dust.Transparency = 0;

        const toggleParticles = () => {
            dust.Particles.Enabled = !dust.Particles.Enabled;
            dust.Smoke.Enabled = !dust.Smoke.Enabled;
        }

        task.spawn(() => {
            toggleParticles();
            task.wait(.25);
            toggleParticles();
            Debris.AddItem(dust, 4.5);
        });
    },

    CreateMuzzleFlashVFX(muzzle: Part): void {
        for (const p of muzzle.GetDescendants())
            if (p.IsA("ParticleEmitter"))
                task.spawn(() => {
                    p.Enabled = true;
                    task.wait(.05);
                    p.Enabled = false;
                });
    },

    CreateSound(soundAsset: Sound): void {
        const sound = soundAsset.Clone();
        sound.Parent = SoundService;
        sound.Play();
        Debris.AddItem(sound, 5);
    },

    KnitStart(): void {
        Logger.ComponentActive(this.Name);
        ms.Button1Down.Connect(() => {
            if (this.Equipped && this.CanShoot)
                this.Fire();
        });
    }
});

export = FlintlockController;