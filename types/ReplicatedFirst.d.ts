interface ReplicatedFirst extends Instance {
	Maps: Folder & {
		testie: Model & {
			Part: Part;
			Spawns: Folder;
		};
	};
	Assets: Folder & {
		FireSound: Sound;
		ReloadSound: Sound;
		Animations: Folder & {
			FlintlockIdle: Animation;
			CharFire: Animation;
			CharIdle: Animation;
			FlintlockFire: Animation;
			something: Animation;
		};
		Crosshair: ScreenGui & {
			Box: Frame & {
				UIScale: UIScale;
				B: Frame & {
					UIGradient: UIGradient;
				};
				R: Frame & {
					UIGradient: UIGradient;
				};
				T: Frame & {
					UIGradient: UIGradient;
				};
				UIAspectRatioConstraint: UIAspectRatioConstraint;
				L: Frame & {
					UIGradient: UIGradient;
				};
			};
		};
		Flintlock: Model & {
			AnimationController: AnimationController & {
				Animator: Animator;
			};
			Trigger: MeshPart & {
				SurfaceAppearance: SurfaceAppearance;
			};
			Muzzle: Part & {
				Attachment: Attachment;
			};
			Base2: MeshPart & {
				SurfaceAppearance: SurfaceAppearance;
			};
			Flint: MeshPart & {
				SurfaceAppearance: SurfaceAppearance;
			};
			Handle: Part;
			Frizzen: MeshPart & {
				SurfaceAppearance: SurfaceAppearance;
			};
			Base: MeshPart & {
				Muzzle: Weld;
				Handle: Weld;
				Flint: Motor6D;
				SurfaceAppearance: SurfaceAppearance;
				Trigger: Motor6D;
				Wand: Motor6D;
				Frizzen: Motor6D;
			};
			Wand: MeshPart & {
				SurfaceAppearance: SurfaceAppearance;
			};
		};
	};
}
