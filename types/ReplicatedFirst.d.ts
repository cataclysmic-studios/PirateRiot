interface ReplicatedFirst extends Instance {
	Maps: Folder & {
		Volcano: Model & {
			["Map info"]: Model & {
				NoPlace2: Folder & {
					pickage: Part & {
						Mesh: SpecialMesh;
					};
					Terrain: Model;
					Bridge: Model & {
						pickage: Part & {
							Mesh: SpecialMesh;
						};
						["Mine entrance 2"]: Model;
					};
					["Straight rail"]: Model & {
						["Ruby cart"]: Model;
						["Diamond cart"]: Model;
						Rail: Model;
						["Mine entrance 4"]: Model & {
							["Mine entrance 4"]: Model & {
								Lantern: Model & {
									Lamp: Model & {
										Fire: Model;
										Glass: Part;
									};
								};
								["Mine entrance 4"]: Model;
							};
						};
						["Mine entrance 5"]: Model & {
							Lantern: Model & {
								Lamp: Model & {
									Fire: Model;
									Glass: Part;
								};
							};
							["Mine entrance 5"]: Model;
						};
						["Emerald cart"]: Model;
						["Gold cart"]: Model;
					};
					["track with Rumba"]: Model & {
						Union: UnionOperation;
						cave: Model;
						pickaxe: Part & {
							Mesh: SpecialMesh;
						};
						["Mine entrance 1"]: Model;
					};
					["Mine entrance 6"]: Model & {
						["Mine entrance 4"]: Model & {
							Lantern: Model & {
								Lamp: Model & {
									Fire: Model;
									Glass: Part;
								};
							};
							["Mine entrance 4"]: Model;
						};
					};
					Baseplate: MeshPart;
					["EASTER EGG!!"]: Part & {
						SurfaceGui: SurfaceGui & {
							TextLabel: TextLabel;
						};
					};
					["Mine entrance 3"]: Model;
					["fog or something"]: Model & {
						Part: Part;
					};
					Entrance: Model & {
						fog: Model;
					};
					["Mine exit"]: Model & {
						Cliff: MeshPart;
						Baseplate: MeshPart;
					};
				};
				Parts: Model & {
					["Cliff Spots"]: Model & {
						Cliff: Model & {
							Cliff: Model & {
								MeshPart: MeshPart;
							};
						};
					};
				};
			};
			pickage: Part & {
				Mesh: SpecialMesh;
			};
			Spawns: Folder;
			Part: Part;
			Lava: Part & {
				Lava: ParticleEmitter;
				Script: Script;
			};
			["groud with hole"]: Model;
		};
	};
	Assets: Folder & {
		Sounds: Folder & {
			Shoot: Sound;
			Headshot: Sound;
			Kill: Sound;
			Reload: Sound;
		};
		UI: Folder & {
			KillFeedObject: Frame & {
				Victim: TextLabel;
				Killer: TextLabel;
				KillType: ImageLabel & {
					UIAspectRatioConstraint: UIAspectRatioConstraint;
				};
			};
			KillNotif: TextLabel;
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
		};
		Characters: Folder & {
			Male: Model & {
				LeftLowerArm: MeshPart & {
					LeftLowerArm: WrapTarget;
					OriginalSize: Vector3Value;
					LeftElbowRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					LeftElbow: Motor6D;
					AvatarPartScaleType: StringValue;
					LeftWristRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
				};
				LeftFoot: MeshPart & {
					AvatarPartScaleType: StringValue;
					OriginalSize: Vector3Value;
					LeftAnkle: Motor6D;
					LeftFoot: WrapTarget;
					LeftAnkleRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					LeftFootAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
				};
				Clothing: Shirt;
				RightHand: MeshPart & {
					RightGripAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					RightWrist: Motor6D;
					RightWristRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					RightHand: WrapTarget;
					OriginalSize: Vector3Value;
					AvatarPartScaleType: StringValue;
				};
				HumanoidRootPart: Part & {
					RootRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					OriginalSize: Vector3Value;
				};
				Pants: Pants;
				RightLowerLeg: MeshPart & {
					RightAnkleRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					OriginalSize: Vector3Value;
					RightKneeRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					RightLowerLeg: WrapTarget;
					RightKnee: Motor6D;
					AvatarPartScaleType: StringValue;
				};
				LeftUpperLeg: MeshPart & {
					LeftHipRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					LeftHip: Motor6D;
					AvatarPartScaleType: StringValue;
					OriginalSize: Vector3Value;
					LeftUpperLeg: WrapTarget;
					LeftKneeRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
				};
				LeftLowerLeg: MeshPart & {
					LeftKnee: Motor6D;
					OriginalSize: Vector3Value;
					LeftLowerLeg: WrapTarget;
					AvatarPartScaleType: StringValue;
					LeftAnkleRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					LeftKneeRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
				};
				["Long Dreads"]: Accessory & {
					Handle: Part & {
						TouchInterest: TouchTransmitter;
						HairAttachment: Attachment;
						AccessoryWeld: Weld;
						SpecialMesh: SpecialMesh;
						AvatarPartScaleType: StringValue;
					};
				};
				LowerTorso: MeshPart & {
					WaistCenterAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					LeftHipRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					Root: Motor6D;
					LowerTorso: WrapTarget;
					OriginalSize: Vector3Value;
					RootRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					RightHipRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					AvatarPartScaleType: StringValue;
					WaistRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					WaistBackAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					WaistFrontAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
				};
				Head: MeshPart & {
					HatAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					OriginalSize: Vector3Value;
					NeckRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					FaceFrontAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					CustomREyeLow: Decal;
					CustomLEyeLow: Decal;
					CustomMouthSkepticTiltedL: Decal;
					Neck: Motor6D;
					HairAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					Head: WrapTarget;
					AvatarPartScaleType: StringValue;
					FaceCenterAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
				};
				FancyPants: Accessory & {
					Handle: MeshPart & {
						WaistCenterAttachment: Attachment;
						TouchInterest: TouchTransmitter;
						SurfaceAppearance: SurfaceAppearance;
						AccessoryWeld: Weld;
						Pants: WrapLayer;
					};
					ThumbnailConfiguration: Configuration & {
						ThumbnailCameraValue: CFrameValue;
						ThumbnailCameraTarget: ObjectValue;
					};
				};
				UpperTorso: MeshPart & {
					RightCollarAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					BodyBackAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					NeckRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					RightShoulderRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					Waist: Motor6D;
					UpperTorso: WrapTarget;
					OriginalSize: Vector3Value;
					AvatarPartScaleType: StringValue;
					LeftCollarAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					BodyFrontAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					WaistRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					LeftShoulderRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					NeckAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
				};
				HairBandanaUrbanSplinterCamo: Accessory & {
					Handle: Part & {
						HatAttachment: Attachment;
						TouchInterest: TouchTransmitter;
						AccessoryWeld: Weld;
						SpecialMesh: SpecialMesh;
						AvatarPartScaleType: StringValue;
					};
					ThumbnailConfiguration: Configuration & {
						ThumbnailCameraValue: CFrameValue;
						ThumbnailCameraTarget: ObjectValue;
					};
				};
				CollarShirt: Accessory & {
					Handle: MeshPart & {
						TouchInterest: TouchTransmitter;
						Collar: WrapLayer;
						SurfaceAppearance: SurfaceAppearance;
						AccessoryWeld: Weld;
						BodyFrontAttachment: Attachment;
					};
				};
				LeftUpperArm: MeshPart & {
					LeftUpperArm: WrapTarget;
					OriginalSize: Vector3Value;
					LeftShoulderAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					LeftElbowRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					LeftShoulder: Motor6D;
					LeftShoulderRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					AvatarPartScaleType: StringValue;
				};
				RightLowerArm: MeshPart & {
					RightLowerArm: WrapTarget;
					OriginalSize: Vector3Value;
					RightElbowRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					RightWristRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					RightElbow: Motor6D;
					AvatarPartScaleType: StringValue;
				};
				LeftHand: MeshPart & {
					LeftHand: WrapTarget;
					OriginalSize: Vector3Value;
					LeftWrist: Motor6D;
					LeftGripAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					AvatarPartScaleType: StringValue;
					LeftWristRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
				};
				RightFoot: MeshPart & {
					RightAnkleRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					OriginalSize: Vector3Value;
					RightFootAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					RightAnkle: Motor6D;
					RightFoot: WrapTarget;
					AvatarPartScaleType: StringValue;
				};
				RightUpperArm: MeshPart & {
					RightShoulder: Motor6D;
					RightUpperArm: WrapTarget;
					RightElbowRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					OriginalSize: Vector3Value;
					RightShoulderRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					RightShoulderAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					AvatarPartScaleType: StringValue;
				};
				Humanoid: Humanoid & {
					BodyTypeScale: NumberValue;
					HumanoidDescription: HumanoidDescription;
					HeadScale: NumberValue;
					BodyProportionScale: NumberValue;
					Animator: Animator;
					BodyWidthScale: NumberValue;
					BodyDepthScale: NumberValue;
					BodyHeightScale: NumberValue;
				};
				RightUpperLeg: MeshPart & {
					OriginalSize: Vector3Value;
					RightHipRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					RightKneeRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					RightHip: Motor6D;
					RightUpperLeg: WrapTarget;
					AvatarPartScaleType: StringValue;
				};
				["Body Colors"]: BodyColors;
			};
			Female: Model & {
				LeftLowerArm: MeshPart & {
					LeftLowerArm: WrapTarget;
					OriginalSize: Vector3Value;
					LeftElbowRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					LeftElbow: Motor6D;
					AvatarPartScaleType: StringValue;
					LeftWristRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
				};
				LeftFoot: MeshPart & {
					AvatarPartScaleType: StringValue;
					OriginalSize: Vector3Value;
					LeftAnkle: Motor6D;
					LeftFoot: WrapTarget;
					LeftAnkleRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					LeftFootAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
				};
				Clothing: Shirt;
				RightHand: MeshPart & {
					RightGripAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					RightWrist: Motor6D;
					RightWristRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					RightHand: WrapTarget;
					OriginalSize: Vector3Value;
					AvatarPartScaleType: StringValue;
				};
				HumanoidRootPart: Part & {
					RootRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					OriginalSize: Vector3Value;
				};
				Pants: Pants;
				RightLowerLeg: MeshPart & {
					RightAnkleRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					OriginalSize: Vector3Value;
					RightKneeRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					RightLowerLeg: WrapTarget;
					RightKnee: Motor6D;
					AvatarPartScaleType: StringValue;
				};
				LeftUpperLeg: MeshPart & {
					LeftHipRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					LeftHip: Motor6D;
					AvatarPartScaleType: StringValue;
					OriginalSize: Vector3Value;
					LeftUpperLeg: WrapTarget;
					LeftKneeRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
				};
				LeftLowerLeg: MeshPart & {
					LeftKnee: Motor6D;
					OriginalSize: Vector3Value;
					LeftLowerLeg: WrapTarget;
					AvatarPartScaleType: StringValue;
					LeftAnkleRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					LeftKneeRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
				};
				LowerTorso: MeshPart & {
					WaistCenterAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					LeftHipRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					Root: Motor6D;
					LowerTorso: WrapTarget;
					OriginalSize: Vector3Value;
					RootRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					RightHipRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					AvatarPartScaleType: StringValue;
					WaistRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					WaistBackAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					WaistFrontAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
				};
				Head: MeshPart & {
					HatAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					OriginalSize: Vector3Value;
					NeckRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					FaceFrontAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					CustomLEyeHalf: Decal;
					CustomREyeHalf: Decal;
					CustomMouthSkepticTiltedR: Decal;
					Neck: Motor6D;
					HairAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					Head: WrapTarget;
					AvatarPartScaleType: StringValue;
					FaceCenterAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
				};
				UpperTorso: MeshPart & {
					RightCollarAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					BodyBackAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					NeckRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					RightShoulderRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					Waist: Motor6D;
					UpperTorso: WrapTarget;
					OriginalSize: Vector3Value;
					AvatarPartScaleType: StringValue;
					LeftCollarAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					BodyFrontAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					WaistRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					LeftShoulderRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					NeckAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
				};
				["Body Colors"]: BodyColors;
				blouse1: Accessory & {
					Handle: MeshPart & {
						TouchInterest: TouchTransmitter;
						SurfaceAppearance: SurfaceAppearance;
						blouse1: WrapLayer;
						AccessoryWeld: Weld;
						BodyFrontAttachment: Attachment;
					};
					ThumbnailConfiguration: Configuration & {
						ThumbnailCameraValue: CFrameValue;
						ThumbnailCameraTarget: ObjectValue;
					};
				};
				LeftUpperArm: MeshPart & {
					LeftUpperArm: WrapTarget;
					OriginalSize: Vector3Value;
					LeftShoulderAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					LeftElbowRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					LeftShoulder: Motor6D;
					LeftShoulderRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					AvatarPartScaleType: StringValue;
				};
				RightLowerArm: MeshPart & {
					RightLowerArm: WrapTarget;
					OriginalSize: Vector3Value;
					RightElbowRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					RightWristRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					RightElbow: Motor6D;
					AvatarPartScaleType: StringValue;
				};
				LeftHand: MeshPart & {
					LeftHand: WrapTarget;
					OriginalSize: Vector3Value;
					LeftWrist: Motor6D;
					LeftGripAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					AvatarPartScaleType: StringValue;
					LeftWristRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
				};
				RightFoot: MeshPart & {
					RightAnkleRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					OriginalSize: Vector3Value;
					RightFootAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					RightAnkle: Motor6D;
					RightFoot: WrapTarget;
					AvatarPartScaleType: StringValue;
				};
				RightUpperArm: MeshPart & {
					RightShoulder: Motor6D;
					RightUpperArm: WrapTarget;
					RightElbowRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					OriginalSize: Vector3Value;
					RightShoulderRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					RightShoulderAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					AvatarPartScaleType: StringValue;
				};
				Humanoid: Humanoid & {
					BodyTypeScale: NumberValue;
					HumanoidDescription: HumanoidDescription;
					HeadScale: NumberValue;
					BodyProportionScale: NumberValue;
					Animator: Animator;
					BodyWidthScale: NumberValue;
					BodyDepthScale: NumberValue;
					BodyHeightScale: NumberValue;
				};
				RightUpperLeg: MeshPart & {
					OriginalSize: Vector3Value;
					RightHipRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					RightKneeRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					RightHip: Motor6D;
					RightUpperLeg: WrapTarget;
					AvatarPartScaleType: StringValue;
				};
				["Bandana Hair"]: Accessory & {
					Handle: Part & {
						OriginalSize: Vector3Value;
						TouchInterest: TouchTransmitter;
						HairAttachment: Attachment;
						AccessoryWeld: Weld;
						SpecialMesh: SpecialMesh;
						AvatarPartScaleType: StringValue;
					};
				};
			};
		};
		Animations: Folder & {
			FlintlockIdle: Animation;
			CharFire: Animation;
			CharIdle: Animation;
			Roll: Animation;
			FlintlockFire: Animation;
			something: Animation;
		};
		VFX: Folder & {
			Dust: Part & {
				Particles: ParticleEmitter;
				Smoke: ParticleEmitter;
			};
		};
		Flintlock: Model & {
			AnimationController: AnimationController & {
				Animator: Animator;
			};
			Trigger: MeshPart & {
				SurfaceAppearance: SurfaceAppearance;
			};
			Muzzle: Part;
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
