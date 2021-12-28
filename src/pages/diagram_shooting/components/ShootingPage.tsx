import React, {Suspense} from 'react';
import { Provider, observer } from 'mobx-react';
import { Route } from "react-router-dom";

import page from '../ExpPage';
import Controller from '../Controller';

import FilterPanel from '../../../components/QnInputPanel/Filter';
import DropSidedInfo from '../../../components/DropSidedInfo/DropSidedInfo';
import TaskInfoBlock from './TaskInfoBlock';
import ModalWindowBuilder from '../../../components/ModalWindow/ModalWindowBuilder';
import styles from './style.module.css';

const Diagram = React.lazy(() => import( '../../../components/Diagram/Diagram'));


const controller = new Controller();

const ShootingPage = observer(() => {
	return (
		<div className={styles.page}>
			<Provider controller={controller}>
				<Suspense fallback={<div className={styles.diagram}></div>}>
					<Diagram
						className={styles.diagram}
						zooming />
				</Suspense>
				<FilterPanel className={styles.filter} />

				<Route path="/lesson/:state/t">
					<DropSidedInfo
						message='Выберете 2 ряд диаграммы'
						comment='Используйте панель внизу экрана'
					/>
					<TaskInfoBlock />
				</Route>

				<Route path="/lesson/:state/w">
					<ModalWindowBuilder provider={page} />
				</Route>

			</Provider>
		</div>
	);
});


export default ShootingPage;