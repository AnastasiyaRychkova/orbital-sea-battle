import type { CellQN } from '../Services/Chemistry';
import type IDiagram from "../Diagram/DiagramInterface";

interface OB_IPlayer
{
	/** Порядковый номер химического элемента. 
	 * Пока не выбран, равен `0`.
	*/
	selectedElement: number;

	selectElement( elemNumber: number ): void

	setDiagram( diagram: IDiagram): void

		/**
	 * Отметить выстрел, который совершил противник, по полю локального игрока
	 * @param cell Координаты ячейки диаграммы противника, по которой игрок сделал выстрел
	 * @param result Результат выстрела: попадание (true) или промах (false)
	 */
	markShotResult( cell: CellQN, result: boolean ): void;

	isThisElementSelected( elemNumber: number ): boolean
}


export default OB_IPlayer;