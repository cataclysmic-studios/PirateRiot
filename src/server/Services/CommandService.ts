import { KnitServer as Knit } from "@rbxts/knit";
import { Players, ReplicatedStorage } from "@rbxts/services";
import Logger from "shared/Logger";
import WaitFor from "shared/Util/WaitFor";

declare global {
    interface KnitServices {
        CommandService: typeof CommandService;
    }
}

class Command {
    public constructor(
        public readonly Aliases: string[],
        private readonly callback: (plr: Player, args: string[]) => void
    ) {}

    public Run(plr: Player, args: string[]): void {
        this.callback(plr, args);
    }
}

const chatted = WaitFor<RemoteEvent>(ReplicatedStorage, "MessageSentRE");
const data = Knit.GetService("DataService");
const CommandService = Knit.CreateService({
    Name: "CommandService",
    Commands: new Map<string, Command>([
        [
            "addgold", 
            new Command(["addmoney", "addcoins"], (plr, [ amountStr, recipientName ]) => {
                const amount = tonumber(amountStr);
                if (!amount || !amountStr)
                    return Logger.CommandError("addgold", "Gold amount could not be parsed to number");

                recipientName = recipientName ?? plr.Name;
                const recipient = Players.GetPlayers().find(p => p.Name.find(recipientName)[0] ? true : false)!;
                data.Increment(recipient, "gold", amount);
            })
        ]
    ]),

    
    KnitStart(): void {
        const prefix = ".";
        chatted.OnServerEvent.Connect((plr, text) => {
            const msg = <string>text;
            const args = msg.split(" ");
            const cmdName = args[0].split(prefix)[1];
            args.shift();
            
            const cmd = this.FindCommand(cmdName);
            cmd?.Run(plr, args);
        });
    },

    FindCommand(cmdName: string): Command | undefined {
        let cmd = this.Commands.get(cmdName);
        if (!cmd)
            this.Commands.forEach(c => {
                if (!c.Aliases.includes(cmdName)) return;
                cmd = c;
            });

        return cmd;
    }
});

export = CommandService;