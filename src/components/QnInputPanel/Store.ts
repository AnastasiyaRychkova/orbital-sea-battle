import { makeObservable, observable, action } from "mobx";



type Orbital = 's' | 'p' | 'd' | 'f';

type StoreType = {
	n: { value?: string, disable: boolean },
	l: { value?: Orbital, disable: boolean },
	m: { value?: string, disable: boolean },
	s: { value?: string, disable: boolean },
};

export type QN = keyof StoreType;

class QN_Store {

	store: StoreType;

	constructor()
	{
		makeObservable( this, {
			store: observable,

			setValue: action,
			setDisable: action,
		});

		this.store = {
			n: { value: '1', disable: true },
			l: { value: 's', disable: true },
			m: { value: '0', disable: true },
			s: { value: '1', disable: true },
		};
	}

	getValue = ( key: QN ) => this.store[ key ].value;

	setValue = ( key: QN, value?: string ) => {
		this.store[ key ].value = value;
		return this;
	};

	isDisable = ( key: QN ) => this.store[ key ].disable;

	setDisable = ( key: QN, value: boolean ) => {
		this.store[ key ].disable = value;
		return this;
	};
}

const state = new QN_Store()

export default state;