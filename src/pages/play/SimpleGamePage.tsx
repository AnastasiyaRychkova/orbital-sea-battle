import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// import Route from '../../components/Router/Route';
import ChoosingTable from './preparing/ChoosingTable';
import FillingDiagram from './preparing/FillingDiagram';
import Instruction from '../../components/Instruction/Instruction';
// import Page404 from '../404/Page404';

import gameTesting from './gameTesting';
import { observer } from 'mobx-react-lite';
import { MemoRouter, Route } from '../../components/Router/Router';
import ResultsPage from './results/ResultsPage';
import Shooting from './shooting/Shooting';


gameTesting.loadGame();



const SimpleGame = observer(() =>
{
	const { t } = useTranslation();
	useEffect( () => {
		console.log( '🌟Start Game🌟' );
		gameTesting.start();
		return () => {
			console.log( '🚩Finish Game🚩' );
			gameTesting.exit();
		}
	}, [] );

	const controller = gameTesting.controller;
	const game = gameTesting.gameState;
	console.log( 'Render' );

	return controller ? (
		<MemoRouter>
			<Route path={['preparing','selecting','instruction']} >
				<Instruction
					message={ t( 'instructions.selecting' ) }
					onClick={ () => { controller?.completeOnBoarding()} }
					/>
			</Route>
			<Route path={['preparing','filling','instruction']}>
				<Instruction
					message={ t( 'instructions.filling' ) }
					onClick={ () => {controller?.completeOnBoarding()} }
					/>
			</Route>
			<Route path={['shooting','instruction']}>
				<Instruction
					message={ t( 'instructions.shooting' ) }
					onClick={ () => {controller?.completeOnBoarding()} }
					/>
			</Route>
			<Route path={['preparing','selecting']} >
				<ChoosingTable
					player={ game!.player.user }
					enemy={ game!.enemy.user }
					back={ controller!.giveIn }
					forward={ (n: number) => {
						controller?.selectElement( n );
					} }
				/>
			</Route>
			<Route path={['preparing','filling']} >
				<FillingDiagram
					game={game!}
					back={ controller!.giveIn }
					forward={ controller!.checkDiagram }
				/>
			</Route>
			<Route path={['shooting']} >
				<Shooting
					game={game!}
					guessElement={controller.nameElement}
					fireFn={controller.fire}
					back={controller.giveIn}
				/>
			</Route>
			<Route path={['results']} >
				<ResultsPage
					game={game!}
					rematch={ controller.requestRematch }
				/>
			</Route>
			{/* <Route states={statesObserver} path={["*"]}> <Page404/> </Route> */}
		</MemoRouter>
	) : null;
});

export default SimpleGame;