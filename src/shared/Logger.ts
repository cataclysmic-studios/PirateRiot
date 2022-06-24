export default class Logger {
    private static Log(source: string, msg: unknown, fatal = false): void {
        if (fatal)
            throw error(`[${source}]:   ➤ ${msg}`);
        else
            warn(`[${source}]:   ➤ ${msg}`);
    }

    public static ComponentActive(name: string): void {
        this.Log("Info", `${name} active`);
    }

    public static KnitError(msg: unknown): void {
        this.Log("Knit Error", msg, true);
    }
}