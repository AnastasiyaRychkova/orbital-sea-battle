import React from 'react';
import Diagram from '../../components/Diagram/Diagram';
import GeneralBackground from '../../components/Background/GeneralBackground';
import ElementPreview from '../../components/ElementPreview/ElementPreview';
import ElemPreviewState from '../../components/ElementPreview/ElemPreviewState';
import ReturnToMain from '../../components/ReturnToMain/ReturnToMain';
import DiagramStatic from '../../lib/game/Diagram/Diagram';
import DiagramContainer from './DiagramContainer';
import style from './DiagramInfoPage.module.css';


const diagramState: DiagramStatic = new DiagramStatic( 1 );
const elementState: ElemPreviewState = new ElemPreviewState( 1,
	( number: number ) => {
		diagramState.setElementByNumber( number );
	} );

function DiagramInfoPage()
{
	return(
		<GeneralBackground>
			<DiagramContainer>
				<Diagram diagram={diagramState} className={style.diagram} zooming={true} />
				<ElementPreview className={style.switcher} state={elementState} />
				<ReturnToMain />
			</DiagramContainer>
		</GeneralBackground>
	);
}


export default DiagramInfoPage