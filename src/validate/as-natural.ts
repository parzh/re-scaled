import { valuer } from "@valuer/main";

/** @internal */
export const asNatural = valuer.as<number>({ number: "integer", spectrum: "non-negative" });
