import { TOGGLE_MODE } from "@/constants";
import type { FiltersValues } from "@/state/filters/types";
import type { Tasks } from "@/state/tasks/types";

type ToggleModeValues = keyof typeof TOGGLE_MODE;

export type AppState = {
  currFilter: FiltersValues;
  tasks: Tasks;
  toggleMode: ToggleModeValues;
};
