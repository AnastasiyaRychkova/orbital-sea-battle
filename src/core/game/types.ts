import type { ChemicalElement as ChemicalElementEntity } from "./ChemicalElement/ChemicalElement";
import type { ReadinessStatusType, ReadinessCodeType } from "./Readiness";

export type ElemCheckResult = boolean;

/** Выбранный игроком химический элемент */
export type SelectedChemicalElement = {
	number: number;
}

export function makeSelectedChemicalElement( element: ChemicalElementEntity ): SelectedChemicalElement
{
	return {
		number: element.number,
	}
}

/** Химический элемент с заполненной игроком конфигурацией */
export type FilledChemicalElement = {
	number: number;
	config: number[];
}

export function makeFilledChemicalElement( element: ChemicalElementEntity ): FilledChemicalElement
{
	return {
		number: element.number,
		config: element.config.toNumArray(),
	}
}

/** Готовность игрока к матчу */
export type PlayerReadiness = {
	status: ReadinessStatusType; // готов или нет
	code: ReadinessCodeType; // сгенерированный код для определения I хода
}

/** Тип выстрела по ячейке */
export type ShotType = number;
/** Результат выстрела (попал/промахнулся) */
export type ShotResult = boolean;
/** Ответ на предложение сыграть еще раз */
export type OfferResponse = boolean;


/** Входящие сообщения */
export type InputMessage = 'ShotRequest' // оппонент (О.) сделал выстрел
						| 'ElemRequest' // О. называет элемент
						| 'NewGameOffer' // О. предлагает сыграть еще раз
						| 'ReadinessRequest' // О. готов к матчу
						| 'OppGivingIn' // О. сдается
						| 'OppDisconnect' // потеряна связь с О.
						| 'OppConnect' // связь с О. восстановлена
						| 'Update'; // синхронизация состояния игры с сервером

/** Исходящие сообщения */
export type OutputMessage = 'CheckSelection' // проверить выбранный элемент
						| 'CheckConfig' // проверить заполненную конфигурацию
						| 'Ready' // готов к матчу
						| 'Fire' // сделать выстрел
						| 'NameElement' // назвать элемент О.
						| 'GiveIn' // сдаться
						| 'OfferNewGame' // предложить сыграть еще раз
						| 'OfferResponse'; // ответить на предложение сыграть еще