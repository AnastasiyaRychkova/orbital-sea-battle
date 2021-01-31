import React from 'react';
import Diagram from '../../client/components/Diagram/Diagram';
import GeneralBackground from '../../components/Background/GeneralBackground';
import ReturnToMain from '../../components/ReturnToMain/ReturnToMain';
import DiagramStatic from '../../lib/game/Diagram/Diagram';
import DiagramContainer from './DiagramContainer';
import './DiagramInfoPage.css';

const diagramState: DiagramStatic = new DiagramStatic( 48 );

function DiagramInfoPage()
{
	return(
		<GeneralBackground>
			<DiagramContainer>
				<Diagram diagram={diagramState} />
				<ReturnToMain />
			</DiagramContainer>
		</GeneralBackground>
	);
}


export default DiagramInfoPage