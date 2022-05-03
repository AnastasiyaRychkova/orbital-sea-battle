import type { CellQN } from '../Services/Chemistry';
import OB_IEnemy from './interfaces/OB_EnemyInterface';
import OB_ILocalPlayer from './interfaces/OB_LocalPlayerInterface';

export type SCompleteState = 'end';

export type SGivingIn = 'giving_in' // Подтверждение намерения сдаться.
						| 'surrender'; // Капитуляция

export type SGameState = 'preparing' // Подготовка к перестрелке. Каждый сам за себя.
						| 'waiting' // Ожидание соперника, пока тот закончит подготовительный этап.
						| 'shooting' // Перестрелка. Игра с противником.
						| 'results'; // Показ результатов.

export type SPreparingState = 'selecting' // Выбор химического элемента.
						| 'filling'; // Заполнение диаграммы.

export type SSelectingState = 'instruction' // Выдача задания. Действия пользователя ограничены.
						| 'choice' // Выбор химического элемента.
						| 'saving'; // Сохранение выбранного элемента локально или на сервере.

export type SFillingState = 'instruction' // Выдача задания. Действия пользователя ограничены.
						| 'diagram' // Заполнение диаграммы.
						| 'correct' // Правильное заполнение диаграммы.
						| 'fail'; // Неправильное заполнение диаграммы.

export type SShootingState = 'instruction' // Выдача задания. Действия пользователя ограничены.
						| 'moving' // Выполнение хода игроком.
						| 'enemy_waiting' // Выполнение хода противником.
						| 'result_waiting'; // Ожидание результатов хода игрока. Выполнение запроса.

export type SResultsState = 'final' // Показ результатов матча. Реванш доступен.
						| 'request' // Ожидание ответа противника на отправленный запрос реванша.
						| 'response' // Показ сообщения о запрошенном реванше.
						| 'rematch_unavailable' // Показ результатов матча. Реванш не доступен.
						| 'rematch_confirmed'; // Реванш одобрен.


export type SState = SPreparingState
					| SSelectingState
					| SFillingState
					| SShootingState
					| SResultsState
					| SGameState
					| SGivingIn
					| SCompleteState;


/*----------  Machine Context  ----------*/

export type RootContext = {
	detail: EventContext,
	selectionInstruction: boolean,
	diagramInstruction: boolean,
};



/*----------  Game State: Event Context  ----------*/



export type SelectingContext = {
	elemNumber: number,
};


export type ShootingContext = {
	shot?: CellQN,
};

export type NamingContext = {
	namedElemNumber: number,
	target: OB_ILocalPlayer | OB_IEnemy,
};

export type EventContext = SelectingContext
						| ShootingContext
						| NamingContext;



/*----------  Player  ----------*/

export type PlayerResults = {
	elemNumber: number,
	steps: number,
	certainty: number,
};


export type PlayerEvent = 'selection';

export type PlayerEventData = {
	elementNumber: number,
};