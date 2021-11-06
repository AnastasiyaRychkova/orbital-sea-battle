import React from 'react';
import { inject } from 'mobx-react';
import IExperimentController from './ExperimentControllerInterface';
import styles from './Windows.module.css';

interface IProps {
	controller?: IExperimentController;
	nextFunc: () => any,
}

const SecondInterfaceEvaluating = inject( 'controller' )( ( props: IProps ) => {
	return (
		<div className={styles.window}>
			<div className={styles.content}>
				<h3>Шаг 4 <span className={styles.steps}>из 4</span></h3>
				<p>
					Как Вам такой вариант?<br/>
					Поделитесь, пожалуйста, своими впечатлениями в анкете и не забудьте нажать кнопку "Отправить" 😉
				</p>
				<script src={props.controller?.getFormURL( 'general' )}></script>
				<iframe
					src={props.controller?.getFormURL( 'secondInterface' )}
					frameBorder="0"
					name="ya-form-6153a3e2faeae69ffbfb5439"
					className={styles.secondInterface}
					title="second-interface"></iframe>
			</div>
			<div className={styles.btnContainer}>
				<button
				className={styles.nextBtn}
					type="button"
					onClick={props.nextFunc} >

					Завершить
				</button>
			</div>
		</div>
	);
});

export default SecondInterfaceEvaluating;