
import { RunService } from "@rbxts/services";

const data = ["gold"];
export const Data = RunService.IsStudio() ? data.map(k => "TEST_" + k) : data;