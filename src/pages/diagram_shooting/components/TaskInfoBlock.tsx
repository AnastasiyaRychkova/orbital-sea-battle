import React from 'react';
import { inject, observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import MiniInfo from '../../../components/MiniInfo/MiniInfo';

type RouterParams = {
	state: 'qn'|'combinations'|'training'|'set',
}


const TaskInfoBlock = inject("controller")(observer(() => {
	const {state}: RouterParams = useParams();

	return (
		<>
		{(state === 'training' || state === 'set')
			&& <MiniInfo
					glyph='info'
					provider={{
						valueAsString: ()=>'02:57'
					}} />
		}
		{state !=='qn'
			&& <MiniInfo
					glyph='shot'
					provider={{
						valueAsString: ()=>'2/6'
					}} />
		}
		{state !=='qn'
			&& <MiniInfo
					glyph='info'
					provider={{
						valueAsString: ()=>'1'
					}} />
		}
		</>
	);
}));

export default TaskInfoBlock;