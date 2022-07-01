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
const sendConsoleMsg = WaitFor<BindableEvent>(ReplicatedStorage, "SendConsoleMsg");
const reply = (msg: string) => sendConsoleMsg.Fire(msg);
const data = Knit.GetService("DataService");
const round = Knit.GetService("RoundService");
const CommandService = Knit.CreateService({
    Name: "CommandService",
    Commands: new Map<string, Command>([
        [
            "addgold", 
            new Command(["addmoney", "addcoins"], (plr, [ amountStr, recipientName ]) => {
                const amount = tonumber(amountStr);
                if (!amountStr || !amount)
                    return reply("Gold amount could not be parsed to number");

                recipientName = recipientName ?? plr.Name;
                const recipient = Players.GetPlayers().find(p => p.Name.find(recipientName)[0] ? true : false)!;
                data.Increment(recipient, "gold", amount);
                reply(`Successfully gave ${amount} gold to ${recipient.Name}`);
            })
        ],
        [
            "timerspeed", 
            new Command(["settimerspeed", "countdownspeed"], (plr, [ scaleStr ]) => {
                const scale = tonumber(scaleStr);
                if (!scaleStr || !scale)
                    return reply("Timer speed could not be parsed to a number");

                round.SetTimerSpeed(scale);
                reply(`Successfully set timer speeds to ${scale}x`);
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