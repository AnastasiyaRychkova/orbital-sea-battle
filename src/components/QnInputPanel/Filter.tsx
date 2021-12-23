import React, {FC} from 'react';
import { observer, inject } from "mobx-react";
import PanelMobile from './mobile/Panel';
import PanelDesktop from './Panel';

type UiStore = {
	mobile: boolean,
}


interface IProps {
	ui?: UiStore,
	className?: string,
}

const Filter: FC<IProps> = inject( "ui" )(observer(({
	ui,
	className
}) => {
	return ui && ui.mobile
		? ( <PanelMobile className={className} /> )
		: ( <PanelDesktop className={className} /> );
}));

export default Filter;