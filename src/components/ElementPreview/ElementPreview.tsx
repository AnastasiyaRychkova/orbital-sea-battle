import React from 'react';
import { observer } from 'mobx-react';
import ElemButton from './ElemButton';
import ElemIcon from './ElemIcon';
import style from './ElementPreview.module.css';
import ElemPreviewState from './ElemPreviewState';

type ElemPreviewProps = {
	state: ElemPreviewState,
	className?: string,
}

const ElementPreview = observer(( props: ElemPreviewProps ) =>
{
	const { state } = props;
	return (
		<div className={(props.className ? props.className+' ' : '')+style.preview}>
			<ElemButton
				direction="left"
				element={state.prevElement?.symbol||''}
				action={state.prev}
			/>
			<ElemIcon
				element={state.currentElement}
				blurFn={state.setElement}
				changeFn={state.inputElement}
			/>
			<ElemButton
				direction="right"
				element={state.nextElement?.symbol||''}
				action={state.next}
			/>
		</div>
	);
});

export default ElementPreview;