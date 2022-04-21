import type { CellQN } from '../Services/Chemistry';

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
						| 'checking'; // Проверка заполнения диаграммы локально или удаленно.

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


export type ShootingContext = {
	playerShot?: CellQN,
	enemyShot?: CellQN,
};
