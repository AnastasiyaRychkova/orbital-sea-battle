import React, {createContext, FC, useContext} from "react"
import {observer} from 'mobx-react'
import { action, computed, makeObservable, observable } from 'mobx';

class RouterStore
{
	pathChain: string[]

	constructor()
	{
		makeObservable( this, {
			pathChain: observable,
			setPath: action.bound,
			lastPart: computed,
		} );
		this.pathChain = [];
	}

	setPath( path: string[] ): void
	{
		this.pathChain = path;
	}

	get lastPart(): string
	{
		return this.pathChain.length > 0 ? this.pathChain[ this.pathChain.length - 1 ] : '';
	}
}

const context = new RouterStore();
const setPath = context.setPath;

type PathType = typeof context;


const RouterContext = createContext<RouterStore>( context );

function useAppPath()
{
	return useContext( RouterContext );
}


interface IRouterProps {
	children: React.ReactNode,
}

/**
 * Использовать внутреннюю систему отслеживания "пути" в приложении
 * ⚠️ Пока работает только в единственном экземпляре
 */
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

function checkPath( currPath: string[], sample: string[], exact: boolean = false ): boolean
{
	if( currPath.length < sample.length )
		return false;
	for (let i = 0; i < sample.length; i++) {
		if( currPath[i] !== sample[i] && sample[i] !== '*' )
			return false;
	}
	return exact ? currPath.length >= sample.length : true;
}

/**
 * Отображает вложенные в него компоненты, если совпадает путь
 */
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
	setPath,
}

export type {
	PathType,
}