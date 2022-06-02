import type { AliasId } from "../Aliases"

type SkinId = string;

export type UserRow = {
	id: number,
	name: string,
	lastVisit: Date,
	created: Date,
	alias: AliasId,
	balance: number,
	skin: SkinId,
	skinCollection: SkinId[],
}