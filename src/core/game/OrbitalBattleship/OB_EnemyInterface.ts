import { CellQN } from "../Services/Chemistry";
import IDiagram from "../Diagram/DiagramInterface";

interface OB_IEnemy
{
	/**
	 * Отметить, что элемент игроком был выбран
	 */
	markElementSelection(): void

	/**
	 * Отметить, что диаграмма была удачно заполнена
	 */
	markDiagramFilling(): void

	/**
	 * Отметить выстрел соперника на диаграмме игрока.
	 * Диаграмма инициирует событие `shot`.
	 * @param cell Ячейка диаграммы, в которую стреляют
	 */
	markEnemyShot( cell: CellQN ): Promise<boolean>

	/**
	 * Сделать предположение, какой элемент загадал противник
	 * @param elemNumber Номер предполагаемого элемента
	 */
	isThisElementSelected( elemNumber: number ): Promise<boolean>

	/**
	 * Установка объекта состояния диаграммы снаружи класса.
	 * Позволяет установить тот экземпляр класса,
	 * который подходит для пользовательского интерфейса,
	 * что делает Player независимым от интерфейса.
	 * @param diagram Диаграмма
	 */
	setDiagram( diagram: IDiagram): void


}


export default OB_IEnemy;