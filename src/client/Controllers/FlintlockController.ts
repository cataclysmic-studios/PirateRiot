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
const FlintlockController = Knit.CreateController({
    Name: "FlintlockController",
    Equipped: false,
    CanShoot: true,

    Toggle(eq?: boolean): void {
        const flintlockServer = Knit.GetService("FlintlockService");
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

    CreateMuzzleFlashVFX(muzzle: Part): void {
        for (const p of muzzle.GetDescendants())
            if (p.IsA("ParticleEmitter"))
                task.spawn(() => {
                    p.Enabled = true;
                    task.wait(.05);
                    p.Enabled = false;
                });
    },

    Fire(): void {
        this.CanShoot = false;
        const flintlockServer = Knit.GetService("FlintlockService");
        const crosshair = Knit.GetController("CrosshairController");
        const char = Player.Character!;
        const flintlock = char.WaitForChild("Flintlock")
        const muzzle = <Part>flintlock.WaitForChild("Muzzle");
        const params = new RaycastParams();
        params.FilterDescendantsInstances = [char];
        params.FilterType = Enum.RaycastFilterType.Blacklist;

        const msLocation = UIS.GetMouseLocation();
        const ray2D = World.CurrentCamera!.ViewportPointToRay(msLocation.X, msLocation.Y);
        const dir = ray2D.Direction.mul(max_dist);
        const castRes = World.Raycast(ray2D.Origin, dir, params);
        if (castRes) {
            const part = castRes.Instance;
            if (RunService.IsStudio())
                this.CreateDebugTracer(muzzle.Position, castRes.Position)

            const char = part.FindFirstAncestorOfClass("Model");
            const hum = char?.FindFirstChildOfClass("Humanoid");
            if (hum) {
                if (hum.Health === 0) return;
                Logger.Debug(Player, "shot", char!.Name);

                flintlockServer.HitPlayer(char!);
                const headshot = part.Name === "Head"
                crosshair.HitAnim(headshot);
                this.CreateSound(Replicated.Assets.Sounds.Kill);
                if (headshot)
                    this.CreateSound(Replicated.Assets.Sounds.Headshot);
            }
        }

        crosshair.FireAnim();
        flintlockServer.ReloadEnded.Connect(() => this.CanShoot = true);
        flintlockServer.PlayCharAnim("Fire");
        flintlockServer.PlayFlintlockAnim("Fire");
        flintlockServer.CreateGunshotSound();
        this.CreateMuzzleFlashVFX(muzzle);
    },

    CreateSound(soundAsset: Sound): void {
        const sound = soundAsset.Clone();
        sound.Parent = SoundService;
        sound.Play();
        Debris.AddItem(sound, 5);
    },

    CreateDebugTracer(startPos: Vector3, endPos: Vector3): void {
        const dist = startPos.sub(endPos).Magnitude;
        const tracerCF = CFrame.lookAt(startPos, endPos).mul(new CFrame(0, 0, -dist / 2));
        const tracer = new Instance("Part");
        tracer.Size = new Vector3(.15, .15, dist);
        tracer.CFrame = tracerCF;
        tracer.Anchored = true;
        tracer.CanCollide = false;
        tracer.Material = Enum.Material.ForceField;
        tracer.Color = new Color3(255, 0, 0);
        tracer.Parent = World;
        Debris.AddItem(tracer, .2);
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