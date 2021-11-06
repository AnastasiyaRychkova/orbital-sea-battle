import React, { useState } from 'react';
import { inject } from 'mobx-react';
import IExperimentController from './ExperimentControllerInterface';
import styles from './Windows.module.css';

interface IProps {
	controller?: IExperimentController;
	nextFunc: () => any,
}

const FirstInterfaceEvaluating = inject( 'controller' )( ( props: IProps ) => {
	const [page, setPage] = useState( 0 );
	return (
		<div className={styles.window}>
		{
		page === 0
		?
			<div>
				<div className={styles.content}>
					<h3>Шаг 2 <span className={styles.steps}>из 4</span></h3>
					<p>
						Один из двух вариантов Вы протестировали.<br/>
						Пожалуйста, поделитесь своими впечатлениями в анкете и не забудьте <span className={styles.important}>нажать кнопку "Отправить"</span> 😉
					</p>
					<script src="https://yastatic.net/s3/frontend/forms/_/embed.js"></script>
					<iframe
						className={styles.firstInterface}
						src={props.controller?.getFormURL( 'firstInterface' )}
						frameBorder="0"
						name="ya-form-615382e02f32d9ac52ac829d"
						title="first-interface">
					</iframe>
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
					<h3>Шаг 3 <span className={styles.steps}>из 4</span></h3>
					<p>
						Второй вариант, второй раунд.
					</p>
					<p className={styles.importantInfo}>
						<span className={styles.important}>Задача та же:</span> как можно быстрее произвести <span className={styles.important}>5 «выстрелов»</span> по стрелкам.
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
} );

export default FirstInterfaceEvaluating;