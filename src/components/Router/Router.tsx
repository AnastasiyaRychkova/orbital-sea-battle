import React, {createContext, FC, useContext} from "react"
import {observer} from 'mobx-react'
import { makeAutoObservable } from 'mobx';

class RouterStore
{
	pathChain: string[]

	constructor()
	{
		makeAutoObservable( this );
		this.pathChain = [];
	}
}


const context = new RouterStore();

const RouterContext = createContext<RouterStore>( context );

function useAppPath()
{
	return useContext( RouterContext );
}


interface IRouterProps {
	children: React.ReactNode,
}


const MemoRouter: FC<IRouterProps> = observer((props) => {
	return (
		<RouterContext.Provider value={context}>
			{ props.children }
		</RouterContext.Provider>
	)
});




interface IRouteProps {
	path: string[],
	exact?: boolean,
	children: React.ReactNode,
}

function checkPath( expect: string[], sample: string[], exact: boolean = false ): boolean
{
	for (let i = 0; i < sample.length; i++) {
		if( expect[i] !== sample[i] && sample[i] !== '*' )
			return false;
	}
	return exact ? expect.length <= sample.length : true;
}

const Route: FC<IRouteProps> = observer( ( props ) => {
	const path = useAppPath();
	return checkPath( path.pathChain, props.path, props.exact )
	?(
		<>
			{props.children}
		</>
	)
	: null;
} );


export {
	MemoRouter,
	Route,
	useAppPath,
}