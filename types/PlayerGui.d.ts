interface PlayerGui extends Instance {
    Main: ScreenGui & {
        Game: Frame & {
            Status: Frame & {
                Status: TextLabel;
                RemainingTime: TextLabel;
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
                };
            };
        };
    }
    
}