import type { FiltersValues } from "@/state/filters/types";
import type { AppState } from "@/state/types";

export function changeFilter(payload: FiltersValues) {
  return (state: AppState) => {
    state.currFilter = payload;
  };
}
