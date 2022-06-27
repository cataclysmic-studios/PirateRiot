import { ReplicatedFirst as Replicated } from "@rbxts/services";

type CrosshairGUI = typeof Replicated.Assets.UI.Crosshair;
export class CrosshairHandle {
    public constructor(
        public readonly GUI: CrosshairGUI, 
        public readonly MouseConnection: RBXScriptConnection
    ) {}

    public Destroy(): void {
        this.GUI.Destroy();
        this.MouseConnection.Disconnect();
    }
}