import { computed, makeObservable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ModalWindowBuilder from '../../../components/ModalWindow/ModalWindowBuilder';
import page from '../ExpPage';
import progress from '../ExpProcess';

const assessments = progress.assessments;

class NextButton
{
	constructor()
	{
		makeObservable( this, {
			satisfactionDisabled: computed,
			difficultyDisabled: computed,
		});
	}

	get satisfactionDisabled(): boolean
	{
		return assessments.get( 'satisfaction' ) === 0
	}

	get difficultyDisabled(): boolean
	{
		return assessments.get( 'difficulty' ) === 0
	}
}

const nextButtons = new NextButton();



const FeedbackPage = observer( () => {
	return (
		<div className="page">
			<Routes>
				<Route path='w/assessment' element={
					<ModalWindowBuilder
						provider={page}
						variant={progress.variant}
						assessments={progress.assessments}
						buttons={{
							primary: {
								disabled: nextButtons.satisfactionDisabled,
							}
						}} />
					}/>
				<Route path='w/difficulty' element={
					<ModalWindowBuilder
						provider={page}
						variant={progress.variant}
						assessments={progress.assessments}
						buttons={{
							primary: {
								disabled: nextButtons.difficultyDisabled,
								onClick: progress.finish,
							}
						}} />
					} />
			</Routes>
		</div>
	);
} );

export default FeedbackPage;