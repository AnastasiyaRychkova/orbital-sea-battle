import React, {Suspense} from 'react';
import { Provider, observer } from 'mobx-react';
import { Navigate, Route, Routes } from "react-router-dom";

import { browser } from "../../../core/core";
import page from '../ExpPage';
import process from '../ExpProcess';
import Controller from '../Controller';

import FilterPanel from '../../../components/QnInputPanel/Filter';
import DropSidedInfo from '../../../components/DropSidedInfo/DropSidedInfo';
import GameProgress from '../../../components/GameProgress/GameProgress';
import IconButton from '../../../components/Button/IconButton/Toggle';
import TaskInfoBlock from './TaskInfoBlock';
import ModalWindowBuilder from '../../../components/ModalWindow/ModalWindowBuilder';
import styles from './style.module.css';

const Diagram = React.lazy(() => import( '../../../components/Diagram/Diagram'));



const controller = new Controller();
page.setTaskBuilder( controller.makeTaskBuilder() );


const ShootingPage = observer(() => {
	return (
		<div className={styles.page}>
			<Provider controller={controller}>
				<div className={styles.interface}>
					<div className={styles.rightPageCorner}>
						<Routes>
							<Route path=":state/t/*" element={
								<>
								{ process.variant === 1 &&
										<GameProgress withLevel withScore
											className={styles.progressBar} />}
								</>
							} />
						</Routes>
						<IconButton
							state={browser.fullScreen.isOn}
							glyphOff='full_screen'
							glyphOn='accuracy'
							toggleFunc={browser.fullScreen.toggle}
							theme='backing'
							className={styles.fullScreenBtn }/>
					</div>
					<Routes>
						<Route path=":state/t/*" element={
						<>
							<div className={styles.leftPageCorner}>
								<DropSidedInfo
									message={page.task?.message || '...'}
									comment={page.task?.comment || '...'}
								/>
								<TaskInfoBlock provider={page.task} />
							</div>
							{page.currentTaskCompleted &&
								<Navigate to={page.task!.resultsLocation || '#'} replace={true} />}
						</>
						}/>
						

					</Routes>

					<div className={styles.spacer}></div>

					<FilterPanel className={styles.filter} />
				</div>

				<Routes>
					<Route path=":state/t/*" element={null} />
					<Route path=":state/:type/*" element={
						<ModalWindowBuilder
							provider={page}
							variant={process.variant}
							assessments={process.assessments} />}
					/>
				</Routes>

				<Suspense fallback={<div className={styles.diagram}></div>}>
					<Diagram
						diagram={controller.diagram}
						className={styles.diagram}
						zooming />
				</Suspense>
				
			</Provider>
		</div>
	);
});


export default ShootingPage;