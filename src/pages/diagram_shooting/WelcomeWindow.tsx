import React, { useState } from 'react';
import { inject } from 'mobx-react';
import IExperimentController from './ExperimentControllerInterface';
import styles from './Windows.module.css';

interface IProps {
	controller?: IExperimentController;
	nextFunc: () => any,
}

const WelcomeWindow = inject( 'controller' )( ( props: IProps) => {
	const [page, setPage] = useState(0);
	return (
		<div className={styles.window}>
		{
		page === 0
		?
			<div>
				<div className={styles.content}>
					<h2>OrbitalBattleship. Usability Testing</h2>
					<h3>
						Спасибо, что согласились принять участие в юзабилити-тестировании!
					</h3>
					<p>
						Мы хотим сравнить две версии игровой панели ввода для разрабатываемой в данный момент образовательной игры.
					</p>
					<p> ⏱ Тестирование займет ~10 минут<br/>
						💻 Можно проходить <span className={styles.important}>только с компьютера</span> или большого планшета<br/>
						🔒 Персональные данные не собираются<br/>
						👶 Знание химии не требуется
					</p>
					<p className={styles.importantInfo}>
						Заполняйте, пожалуйста, <span className={styles.important}>все</span> анкеты и <span className={styles.important}>нажимайте кнопку «Отправить»</span> перед переходом к следующему этапу тестирования.
					</p>
					<p>Давайте потренируемся!<br/>Отметьте Ваш возраст и нажмите кнопку «Отправить».</p>
					<script src="https://yastatic.net/s3/frontend/forms/_/embed.js"></script>
					<iframe
						src={props.controller?.getFormURL( 'general' )}
						frameBorder="0"
						name="ya-form-6149019fbefa31fa01c8e734" 
						className={styles.generalQuestion}
						title="general"></iframe>

				</div>
				<div className={styles.btnContainer}>
					<button
						className={styles.nextBtn}
						type="button"
						onClick={() => {setPage(1)}} >
						
						Далее
					</button>
				</div>
			</div>
		:
			<div>
				<div className={styles.content}>
					<h3>Шаг 1 <span className={styles.steps}>из 4</span></h3>
					<p>
						Вам необходимо будет стрелять по стрелкам в химической диаграмме. Чтобы произвести выстрел, нужно отметить 4 координаты стрелки на панели управления в нижней части экрана и нажать кнопку Пуск.
						{/* В нашей игре центральную роль занимает химическая диаграмма, состоящая из блоков с парами стрелок. Всего стрелок — 118. Как на шахматной доске координаты всех клеток задаются парой значений (например, 4f), так и на нашей диаграмме координаты стрелок определяются комбинацией из четырех значений (например, [4, f, 3, -1/2]). */}
					</p>
					<p className={styles.importantInfo}>
						<span className={styles.important}>Задача 1:</span> Разберитесь с управлением и произведите <span className={styles.important}>1 тренировочный выстрел</span>.
					</p>
					<p>
						🚩 Попробуйте понажимать на разные кнопки, чтобы понять, за что они отвечают. <br/>
						🔮 Диаграмма поможет разобраться, но выяснять принцип работы Вам придется самостоятельно эмпирическим путем. <br/>
						⏱ До первого выстрела время не засекается.
					</p>
					<p className={styles.importantInfo}>
						<span className={styles.important}>Задача 2:</span> После тренировочного выстрела как можно быстрее произведите <span className={styles.important}>5 выстрелов</span> по стрелкам.
					</p>
					<p>
						🌟 Стрелять нужно в конкретные стрелки. Они будут подсвечены и мигать. <br/>
						⏱ Время будет засекаться.
					</p>
				</div>
				<div className={styles.btnContainer}>
					<button
						className={styles.prevBtn}
						type="button"
						onClick={() => {setPage(0)}} >
						
						Назад
					</button>
					<button
						className={styles.nextBtn}
						type="button"
						onClick={props.nextFunc} >
				
						Погнали!
					</button>
				</div>
			</div>
		}
		</div>
	);
});

export default WelcomeWindow;