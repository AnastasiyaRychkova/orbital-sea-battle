import type { AliasId } from "../../Aliases"

type SkinId = string;

export type UserRow = {
	id: number,
	name: string,
	lastVisit: Date,
	created: Date,
	alias: AliasId,
	balance: number,
	level: number,
	points: number,
	skin: SkinId,
	skinCollection: SkinId[],
}



export type StoreType = {

	/** 
	 * Подключение к хранилищу
	 * 
	 * @throws Если открыть хранилище не удастся
	 * */
	async connect(): Promise<void>,

	/**
	 * Сохранить в хранилище профиль нового пользователя.
	 * 
	 * 💣 Если пользователь с таким же id уже сохранен, то метод выбросит ошибку!
	 * @param user Пользователь
	 */
	async createAccount( user: IUser ): Promise<void>,

	/**
	 * Получить все сохраненные профили (сокращенные версии)
	 * 
	 * @throws Если хранилище не было открыто или вовсе не доступно
	 * @throws Если операция извлечения данных из хранилища провалится
	 */
	async loadProfiles(): Promise<IProfile[]>,

	/**
	 * Получить полный профиль пользователя.
	 * 
	 * @param profile Профиль пользователя (сокращенная версия)
	 * @throws Если хранилище не было открыто или вовсе не доступно
	 * @throws Если операция извлечения данных из хранилища провалится
	 */
	async loadUser( profile: Profile ): Promise<IUser>,

	/** Закрыть соединение с хранилищем */
	disconnect(),

	/** Доступно ли хранилище в данном браузере */
	isAvailable(): boolean,
}