import { CellQN } from "../Services/Chemistry";

interface OB_IEnemy
{
	/**
	 * Отметить выстрел соперника на диаграмме игрока.
	 * Диаграмма инициирует событие `shot`.
	 * @param cell Ячейка диаграммы, в которую стреляют
	 */
	markEnemyShot( cell: CellQN ): Promise<boolean>

	isThisElementSelected( elemNumber: number ): Promise<boolean>
}


export default OB_IEnemy;