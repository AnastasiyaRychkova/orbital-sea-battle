import { observer } from 'mobx-react';
import React from 'react';
import ModalWindowBuilder from '../../../components/ModalWindow/ModalWindowBuilder';
import page from '../ExpPage';
import progress from '../ExpProcess';

const newSessionClick = () => {
	progress.newSession();
}


const EndPage = observer( () => {
	return (
		<div className="page">
			<ModalWindowBuilder
				provider={page}
				variant={progress.variant}
				assessments={progress.assessments}
				buttons={{
					secondary: {
						onClick: newSessionClick,
					}
				}} />
		</div>
	);
} );

export default EndPage;