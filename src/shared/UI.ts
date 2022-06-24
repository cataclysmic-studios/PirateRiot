import { Players } from "@rbxts/services";

export default class UI {
    public static Main(plr: Player = Players.LocalPlayer): PlayerGui["Main"] {
        return plr.WaitForChild("PlayerGui").WaitForChild("Main", 10) as PlayerGui["Main"];
    }
}