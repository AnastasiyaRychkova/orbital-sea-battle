import { makeAutoObservable } from "mobx";

type StoreKey = 'n'|'l'|'m'|'s';


class PanelController
{
	open: boolean;
	openTab: StoreKey|null;

	constructor()
	{
		makeAutoObservable( this );
		this.open = false;
		this.openTab = null;
	}

	setOpen( isOpen: boolean ): void
	{
		this.open = isOpen;
	}

	openTabHandle = ( key: StoreKey ) => {
		this.open = true;
		this.openTab = key;
	}

	closeTabHandler = () => {
		this.open = false;
		this.openTab = null;
	}
}



export default PanelController;