import ElemConfig from './ElemConfig.js';
// import { MainQN, OrbitalQN, MagneticQN } from "./QuantumNumbers";

/** Химический элемент */
type ChemicalElement = {
	/** Порядковый номер элемента */
	number: number;

	/** Название элемента */
	name: string;

	/** Символ обозначения */
	symbol: string;

	/** Электронная конфигурация */
	config: ElemConfig;

	/** Является ли исключением */
	exception: boolean;

};

export type {
	ChemicalElement
}