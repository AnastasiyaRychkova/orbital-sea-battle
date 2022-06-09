import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Route from '../../components/Router/Route';
import ChoosingTable from './preparing/ChoosingTable';
import FillingDiagram from './preparing/FillingDiagram';
import Instruction from '../../components/Instruction/Instruction';
// import Page404 from '../404/Page404';

import gameTesting from './gameTesting';
import { observer } from 'mobx-react-lite';


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

	const statesObserver = gameTesting.states!;
	const controller = gameTesting.controller;
	const game = gameTesting.gameState;

	return controller ? (
		<>
			<Route states={statesObserver} path={['preparing','selecting','instruction']} >
				<Instruction
					message={ t( 'instructions.selecting' ) }
					onClick={ () => { controller?.completeOnBoarding()} }
					/>
			</Route>
			<Route states={statesObserver} path={['preparing','filling','instruction']}>
				<Instruction
					message={ t( 'instructions.filling' ) }
					onClick={ () => {controller?.completeOnBoarding()} }
					/>
			</Route>
			<Route states={statesObserver} path={['preparing','selecting']} >
				<ChoosingTable
					player = { game!.player.user }
					enemy = { game!.enemy.user }
					back = { controller!.giveIn }
					forward = { (n: number) => {
						controller?.selectElement( n );
					} }
				/>
			</Route>
			<Route states={statesObserver} path={['preparing','filling']} >
				<FillingDiagram
					player = { game!.player }
					enemy = { game!.enemy }
					back = { controller!.giveIn }
					forward = { controller!.checkDiagram }
				/>
			</Route>
			{/* <Route states={statesObserver} path={["*"]}> <Page404/> </Route> */}
		</>
	) : null;
});

export default SimpleGame;