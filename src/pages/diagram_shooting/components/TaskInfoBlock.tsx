import React, {FC} from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import MiniInfo from '../../../components/MiniInfo/MiniInfo';
import type { TaskExecutionProcess, TaskType } from '../ExpPage.d';

type RouterParams = {
	state: 'qn'|'combinations'|'training'|'set',
}

interface IProps {
	provider: TaskType | null,
}


const TaskInfoBlock: FC<IProps> = observer(( props ) => {
	const {state}: RouterParams = useParams() as RouterParams;
	const process: TaskExecutionProcess = props.provider
							? props.provider.process
							: {
								total: 0,
								right: 0,
								completed: 0,
							};
	return (
		<>
		{state !=='qn'
			&& <MiniInfo
					glyph='shot'
					provider={`${process.completed}/${process.total}`} />
		}
		{state !=='qn'
			&& <MiniInfo
					glyph='hit'
					provider={process.right} />
		}
		</>
	);
});

export default TaskInfoBlock;