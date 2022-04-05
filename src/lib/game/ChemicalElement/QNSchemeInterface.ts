import { SpinIndex } from "./DiagramCell";
import { CellQN, ShipQN } from "./QuantumNumbers";

/**
 * Схема сборки состояния диаграммы в битовую последовательность
 */
interface QNSchemeInterface
{
	/**
	 * Получить индекс стрелки по ее координатам
	 * @param quantumNumbers 4 квантовых числа
	 */
	getCellIndex( quantumNumbers: CellQN ): SpinIndex | undefined;

	/**
	 * Получить индексы ячеек в блоке
	 * 
	 * **!!! Возвращает массив ссылок на объекты. Объекты НЕ менять!**
	 * @param quantumNumbers 2 квантовых числа (n, l)
	 * @returns Массив индексов ячеек блока
	 */
	getBlockIndexes( quantumNumbers: ShipQN ): SpinIndex[] | undefined;

	/**
	 * Получить координаты случайной стрелки
	 * @returns 4 квантовых числа
	 */
	getRandomCellQN(): [string, string, string, string];
}


export default QNSchemeInterface;