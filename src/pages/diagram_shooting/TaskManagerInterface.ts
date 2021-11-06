import { DiagramEventData } from "../../lib/game/Diagram/DiagramInterface";
import { State } from "./types";


interface ITaskManager<Task>
{

	state: State;

	/**
	 * Загрузить новые задания в менеджер
	 * 
	 * * Менеджер перейдет в состояние `task`
	 * * Предыдущий прогресс будет сброшен
	 * @param tasks Массив заданий для выполнения
	 */
	setTasksSequence( tasks: Task[] ): void;
	
	/**
	 * Начать выполнение задания
	 * 
	 * Состояние системы будет изменено для корректного выполнения. Когда будет зарегистрировано, что задание выполнено, состояние менеджера изменится на `correct` или `error`. Если задания все выполнены, происходит переход в состояние `finish`.
	 */
	startTask( state: State ): void;

	/** Функция проверки выполненности задания
	 * 
	 * Вызывается при изменениях в системе */
	checkCompletionOfTask( shotInfo: CustomEvent<DiagramEventData> ): void;

	/** Массив результатов завершенных заданий.
	 * 
	 * `true` — выполнено правильно,`false` — неправильно */
	results: boolean[];
}


export default ITaskManager;