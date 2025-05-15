import { FILTERS } from "@/constants";

type Filters = typeof FILTERS;
type FiltersKeys = keyof Filters;
export type FiltersValues = Filters[FiltersKeys];
