import { KnitServer as Knit } from "@rbxts/knit";
import { Players } from "@rbxts/services";
import Logger from "shared/Logger";

declare global {
    interface KnitServices {
        DataManager: typeof DataManager;
    }
}

const DataManager = Knit.CreateService({
    Name: "DataManager",
    
    KnitStart(): void {
        Logger.ComponentActive(this.Name);
        const data = Knit.GetService("DataService");
        Players.PlayerAdded.Connect(plr => {
            data.Store<number>(plr, "gold", 100);
        });
    }
});

export = DataManager;