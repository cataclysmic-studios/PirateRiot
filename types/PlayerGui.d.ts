interface PlayerGui extends Instance { 
    Main: ScreenGui & {
        Leaderboard: Frame & {
            KDR: TextLabel;
            PlayerList: ScrollingFrame & {
                UIListLayout: UIListLayout;
            };
            UIPadding: UIPadding;
            Deaths: TextLabel;
            UICorner: UICorner;
            Kills: TextLabel;
            Line: Frame & {
                UICorner: UICorner;
            };
        };
        CharacterSelect: Frame & {
            Female: ImageButton & {
                Viewport: ViewportFrame & {
                    UICorner: UICorner;
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
            };
            Male: ImageButton & {
                Viewport: ViewportFrame & {
                    UICorner: UICorner;
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
                };
            };
            Close: TextButton & {
                UICorner: UICorner;
                UIAspectRatioConstraint: UIAspectRatioConstraint;
            };
            UICorner: UICorner;
            Title: TextLabel;
            UIAspectRatioConstraint: UIAspectRatioConstraint;
            UIPadding: UIPadding;
        };
        Game: Frame & {
            ChooseCharacter: TextButton & {
                UICorner: UICorner;
                Shadow: TextButton & {
                    UICorner: UICorner;
                };
                UIGradient: UIGradient;
            };
            KillFeed: Frame & {
                UIListLayout: UIListLayout;
            };
            UIPadding: UIPadding;
            Gold: Frame & {
                UIAspectRatioConstraint: UIAspectRatioConstraint;
                Value: TextLabel;
                Background: Frame & {
                    UICorner: UICorner;
                    Shadow: TextButton & {
                        UICorner: UICorner;
                    };
                    UIGradient: UIGradient;
                };
                Icon: ImageLabel & {
                    UIAspectRatioConstraint: UIAspectRatioConstraint;
                };
                Add: TextButton & {
                    UICorner: UICorner;
                    Shadow: TextButton & {
                        UICorner: UICorner;
                    };
                    UIAspectRatioConstraint: UIAspectRatioConstraint;
                    UIGradient: UIGradient;
                };
            };
            Status: Frame & {
                Status: TextLabel;
                RemainingTime: TextLabel;
            };
            Notifier: Frame & {
                UIListLayout: UIListLayout;
            };
            UIAspectRatioConstraint: UIAspectRatioConstraint;
            Settings: ImageButton & {
                UICorner: UICorner;
                Shadow: ImageButton;
                UIGradient: UIGradient;
                UIAspectRatioConstraint: UIAspectRatioConstraint;
            };
        };
        Settings: Frame & {
            UIPadding: UIPadding;
            Close: TextButton & {
                UICorner: UICorner;
                UIAspectRatioConstraint: UIAspectRatioConstraint;
            };
            UICorner: UICorner;
            Title: TextLabel;
            UIAspectRatioConstraint: UIAspectRatioConstraint;
            List: ScrollingFrame & {
                UIListLayout: UIListLayout;
                Chat: Frame & {
                    Toggle: Frame & {
                        UICorner: UICorner;
                        Button: TextButton;
                        UIPadding: UIPadding;
                        Circle: Frame & {
                            UICorner: UICorner;
                            Mini: Frame & {
                                UICorner: UICorner;
                            };
                        };
                    };
                    Title: TextLabel;
                    UIPadding: UIPadding;
                };
                Shadows: Frame & {
                    Toggle: Frame & {
                        UICorner: UICorner;
                        Button: TextButton;
                        UIPadding: UIPadding;
                        Circle: Frame & {
                            UICorner: UICorner;
                            Mini: Frame & {
                                UICorner: UICorner;
                            };
                        };
                    };
                    Title: TextLabel;
                    UIPadding: UIPadding;
                };
                PostProcessing: Frame & {
                    Toggle: Frame & {
                        UICorner: UICorner;
                        Button: TextButton;
                        UIPadding: UIPadding;
                        Circle: Frame & {
                            UICorner: UICorner;
                            Mini: Frame & {
                                UICorner: UICorner;
                            };
                        };
                    };
                    Title: TextLabel;
                    UIPadding: UIPadding;
                };
            };
        };
    }
}    