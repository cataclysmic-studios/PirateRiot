import { Signal } from "@rbxts/knit";

export class TimerHandle {
    public Active = true;
    public Disable(): void {
        this.Active = false;
    }
}

export class Timer {
    private timeRemaining = 0;

    public readonly Count = new Signal<(timeRemaining: number) => void>();
    public readonly OnSet = new Signal<(time: number) => void>();
    public readonly Finished = new Signal<() => void>();

    public constructor(
        private readonly increment = 1
    ) {}

    public Set(time: number): void {
        this.timeRemaining = time;
        this.OnSet.Fire(time);
    }

    public Start(): TimerHandle {
        const handle = new TimerHandle;
        task.spawn(() => {
            while (this.timeRemaining > 0) {
                if (!handle.Active) break;
                task.wait(1);
                this.timeRemaining -= this.increment;
                this.Count.Fire(this.timeRemaining);
            }
            this.Finished.Fire();
        });
        return handle;
    }

    public Stop(handle: TimerHandle): void {
        handle.Disable()
    }
}