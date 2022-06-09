import React, { FC } from 'react';
import { observer } from 'mobx-react';

type StatesChainObserverType = {
	states: string[]
}

interface IProps {
	states: StatesChainObserverType,
	path: string[],
	exact?: boolean,
	children: React.ReactNode,
}

function checkPath( states: string[], path: string[], exact: boolean = false ): boolean
{
	for (let i = 0; i < path.length; i++) {
		if( states[i] !== path[i] && path[i] !== '*' )
			return false;
	}
	return exact ? states.length <= path.length : true;
}

const Route: FC<IProps> = observer( ( props ) => {
	return checkPath( props.states.states, props.path, props.exact )
	?(
		<>
			{props.children}
		</>
	)
	: null;
} );

export default Route;