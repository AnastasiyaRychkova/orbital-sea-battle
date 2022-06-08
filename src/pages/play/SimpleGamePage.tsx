import React from 'react';
import {
	// MemoryRouter,
	Routes,
	Route,
	Navigate,
	useLocation,
} from "react-router-dom";
import { useTranslation } from 'react-i18next';
import ChoosingTable from './preparing/ChoosingTable';
import FillingDiagram from './preparing/FillingDiagram';
import Instruction from '../../components/Instruction/Instruction';

import gameTesting from './gameTesting';
import StatesChainObserver from './StatesChainObserver';
import { observer } from 'mobx-react-lite';


gameTesting.loadGame();
const game = gameTesting.start();
const controller = gameTesting.controller;
const statesObserver = new StatesChainObserver();
statesObserver.listen( game );


const SimpleGame = observer(() =>
{
	console.log( useLocation().pathname );
	const { t } = useTranslation();
	return (
		<>
			{
				useLocation().pathname !== '/play/'+ statesObserver.asPath
					&& <Navigate to={statesObserver.asPath} replace={true} />
			}
			<Routes>
				<Route path='/preparing/selecting/instruction' element={
					<Instruction
						message={ t( 'instructions.selecting' ) }
						onClick={ () => { controller?.completeOnBoarding()} }
						/>
				} />
				<Route path='/preparing/filling/instruction' element={
					<Instruction
						message={ t( 'instructions.filling' ) }
						onClick={ () => {controller?.completeOnBoarding()} }
						/>
				} />
			</Routes>
			<Routes>
				<Route path='/preparing/selecting/*' element={
					<ChoosingTable
						player = { game.player.user }
						enemy = { game.enemy.user }
						back = { () => {} }
						forward = { (n: number) => {
							console.log('Select');
							controller?.selectElement( n );
						} }
					/>
				} />
				<Route path='/preparing/filling/*' element={
					<FillingDiagram
						player = { game.player.user }
						enemy = { game.enemy.user }
						element = { game.player.selectedElement! }
						back = { ()=>{} }
						forward = { ()=>{} }
					/>
				} />
				
			</Routes>
		</>
	);
});

export default SimpleGame;