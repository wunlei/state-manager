import { FILTERS, TOGGLE_MODE } from "@/constants";
import { AppState } from "@/state/types";
import {
  createSelectorHook,
  createUpdateStoreHook,
  Store,
} from "state-manager";

export const initialState: AppState = {
  tasks: [],
  toggleMode: TOGGLE_MODE.done,
  currFilter: FILTERS.ALL,
};

const appStore = new Store<AppState>(initialState);

export const useAppSelector = createSelectorHook<AppState>(appStore);

export const useUpdateAppStore = createUpdateStoreHook<AppState>(appStore);
