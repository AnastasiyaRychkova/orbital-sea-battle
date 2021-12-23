import React from 'react';
import { Provider, observer } from 'mobx-react';

import Filter from '../../lib/game/Diagram/Filter/Filter';
import DiagramState from '../../lib/game/Diagram/Diagram';
import periodicTable from '../../lib/game/ChemicalElement/PeriodicTable';
import GameFieldController from './GameFieldController';
import uiStore from '../../client/UIStore';
import TaskManager from './TaskManager';
import Metrics from './Metrics';
import { default as Experiment, State } from './Experiment';


import Diagram from '../../components/Diagram/Diagram';
import FilterPanel from '../../components/QnInputPanel/Filter';

import InstructionWindow from './InstructionWindow';
import WelcomeWindow from './WelcomeWindow';
import FirstInterfaceEvaluating from './I_InterfaceEvaluating';
import SecondInterfaceEvaluating from './II_InterfaceEvaluating';
import ThanksWindow from './ThanksWindow';
import TaskCounter from './TaskCounter';
import TaskResult from './TaskResult';
import Clock from './Clock';

import styles from './style.module.css';




const filter = new Filter( periodicTable.converter );
const diagram = new DiagramState( periodicTable );
const taskManager = new TaskManager( diagram, filter );
const metrics = new Metrics();
const experiment = new Experiment( taskManager, metrics );


const diagramController = new GameFieldController( {
	diagram,
	filter,
	experiment,
	taskManager,
	metrics,
} );

type Windows<State extends string> = {
	[key in State]?: JSX.Element;
};

function next(): void
{
	console.log('click');
	experiment.nextState();
	console.log( experiment.state );
};

const windows: Windows<State> = {
	welcome: (
		<WelcomeWindow nextFunc={() => {
			console.log('click');
			experiment.start();
			console.log( experiment.state );
		} } />
	),
	
	evaluating1: (
		<FirstInterfaceEvaluating nextFunc={next} />
	),
	
	evaluating2: (
		<SecondInterfaceEvaluating nextFunc={next} />
	),
	
	final: (
		<ThanksWindow />
	),
}

const DiagramShootingPage = observer( () => {
	const window = windows[ experiment.state ];

	const isInterfaceTesting = experiment.state.indexOf( 'interface' ) >= 0;

	return (
		<div className={styles.page}>
			<Provider controller={ diagramController } ui={uiStore}>
				{
				window !== undefined
					?
					<InstructionWindow>
						{window}
					</InstructionWindow>
					:
					''
				}
				<Diagram
					className={styles.diagram}
					zooming />
				<div className={styles.processInfo}>
					{
						isInterfaceTesting
						&&
						( experiment.totalTasks - experiment.completeTasks <= 5 )
						?
						<Clock
							timeStamp={experiment.startTestingTime}
							className={styles.clock} />
						:
						''
					}
					
					<TaskCounter
						complete={experiment.completeTasks}
						total={experiment.totalTasks}
						className={styles.taskCounter} />
				</div>
				
				{
				isInterfaceTesting
				&& experiment.lastTaskCorrectness !== undefined
				? <TaskResult
					correct={experiment.lastTaskCorrectness} />
				: ''
				}
				
				<FilterPanel className={styles.filter} />
				

			</Provider>
			
		</div>
	);
} );

export default DiagramShootingPage;
