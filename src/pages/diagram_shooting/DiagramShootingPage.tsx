import { Provider, observer } from 'mobx-react';
import React, { useEffect } from 'react';
import Diagram from '../../components/Diagram/Diagram';
import Panel from '../../components/QnInputPanel/Panel';
import PanelWithSwitchers from '../../components/QnInputPanel/PanelWithSwitchers';
import Filter from '../../lib/game/Diagram/Filter/Filter';
import DiagramState from '../../lib/game/Diagram/Diagram';
import periodicTable from '../../lib/game/ChemicalElement/PeriodicTable';
import GameFieldController from './GameFieldController';
import TaskManager from './TaskManager';
import Metrics from './Metrics';
import { default as Experiment, State } from './Experiment';
import InstructionWindow from './InstructionWindow';
import WelcomeWindow from './WelcomeWindow';
import FirstInterfaceEvaluating from './I_InterfaceEvaluating';
import SecondInterfaceEvaluating from './II_InterfaceEvaluating';
import ThanksWindow from './ThanksWindow';
import TaskCounter from './TaskCounter';

import styles from './style.module.css';
import TaskResult from './TaskResult';
import Clock from './Clock';



const filter = new Filter( periodicTable.converter, {type: 'radio'} );
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

	useEffect( () => {
		switch( experiment.state ) {
			case 'interface1':
				filter.setType( 'checkbox' );
				break;
			case 'interface2':
				filter.setType( 'radio' );
				break;
			default:
				break;
		}
		
	} );

	const isInterfaceTesting = experiment.state.indexOf( 'interface' ) >= 0;

	return (
		<div className={styles.page}>
			<Provider controller={ diagramController }>
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
					zooming={false} />
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

				{
				experiment.state === 'interface1'
				? <Panel />
				:
				experiment.state === 'interface2'
					? <PanelWithSwitchers />
					: ''
				}
			</Provider>
			
		</div>
	);
} );

export default DiagramShootingPage;
