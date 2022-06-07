import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ChoosingTable from '../../components/GamePages/ChoosingTable';
import FillingDiagram from '../../components/GamePages/FillingDiagram';
import Instruction from '../../components/Instruction/Instruction';


import Profile from '../../core/game/GameplayEntities/Profile';
import User from '../../core/game/GameplayEntities/User';
import Game from '../../core/game/OrbitalBattleship/OB_Game';
import GameState from '../../core/game/OrbitalBattleship/entities/OB_GameState';
import { ChemicalElement } from '../../core/game/ChemicalElement/ChemicalElement';
import { SState } from '../../core/game/OrbitalBattleship/types';


const machine = new User(
	new Profile( {
		name: "Дроид",
		aliasId: "_ai",	
	} ) 
)

const player = new User(
	new Profile( {
		name: "Игрок",
		aliasId: "mdl",
	} )
)

const game = new Game( {
	name: "simple",
	path: "simple",
	ai: machine,
} );




function useStateChain():
[ SState[], (s: string) => void]
{
	const gs = ( game.gameState as GameState );
	const [chain, setElement] = useState( gs.statesChain );

	function send( s: string )
	{
		gs.send( s );
		setElement( gs.statesChain );
	}

	return [chain, send];
}

export default function SimpleGame()
{
	const { t } = useTranslation();

	game.start( player );
	const gs = ( game.gameState as GameState );

	const [ states, send ] = useStateChain();

	
	const selecting = (
		<ChoosingTable
			player = { gs.player.user }
			enemy = { gs.enemy.user }
			back = { () => {} }
			forward = { (n: number) => {
				gs.player.selectElement(n);
				send("select");
			} }
		/>
	);

	const filling = (
		<FillingDiagram
			player = { gs.player.user }
			enemy = { gs.enemy.user }
			element = { gs.player.selectedElement as ChemicalElement }
			back = { ()=>{} }
			forward = { ()=>{} }
		/>
	);

	// const filling = (
	// 	<Instruction
	// 		message = { t( "instructions.filling" ) }
	// 		onClick = { () => { send("start"); } }
	// 	>
	// 		{/* <FillingDiagram
	// 			player = { gs.player.user }
	// 			enemy = { gs.enemy.user }
	// 			element = { gs.player.selectedElement as ChemicalElement }
	// 			back = { ()=>{} }
	// 			forward = { ()=>{} }
	// 		/> */}
	// 	</Instruction>
	// )

	switch( states[0] )
	{
		case "preparing":

			switch( states[1] )
			{
				case "selecting":

					switch( states[2] )
					{
						case "instruction":
							return ( 
								<Instruction
									message = { t( "instructions.selecting" ) }
									onClick = { () => { send("start"); } }
								>
									{ selecting }
								</Instruction>
							);
							
						default:
							return ( selecting );
					};
					

				case "filling":
					switch( states[2] )
					{
						case "instruction":
							return ( 
								<Instruction
									message = { t( "instructions.filling" ) }
									onClick = { () => { send("start"); } }
								>
									{ filling }
								</Instruction>
							);
							
						default:
							return ( filling );
					};
			};
	}

	return <></>
}

