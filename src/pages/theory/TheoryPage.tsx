import React from 'react';
import styles from './TheoryPage.module.css';
import Accordion from '../../components/Accordion/Accordion'
import ReturnToMain from '../../components/ReturnToMain/ReturnToMain'

export default function TheoryPage() {
	return (
	<div className={ styles.background }>
		<div className={ styles.content }>
			<h1>ТЕОРИЯ</h1>
			<span>
				<p>The Orbital Battleship is&nbsp;designed to&nbsp;reinforce the knowledge of&nbsp;atomic structure. Some of&nbsp;the main principles and ideas that are used in&nbsp;the game process are explained below.</p>
				<p>It&nbsp;is&nbsp;worth noting that the game had been designed as&nbsp;an&nbsp;assessment and reinforcement tool of&nbsp;the existing knowledge.</p>
			</span>

			<Accordion title="Atomic orbitals" open>
				<p>Orbitals are the regions of&nbsp;space in&nbsp;which electrons are most likely to&nbsp;be&nbsp;found. Each orbital is&nbsp;denoted by&nbsp;a&nbsp;number and a&nbsp;letter. The number denotes the energy level of&nbsp;the electron in&nbsp;the orbital. Thus 1 refers to&nbsp;the energy level closest to&nbsp;the nucleus; 2 refers to&nbsp;the next energy level further out, etc.<br />
				The letter refers to&nbsp;the shape of&nbsp;the orbital. The letters go&nbsp;in&nbsp;the order s, p, d, f, g, h, i, j, etc. The letters s, p, d, and f&nbsp;were assigned for historical reasons that should not be&nbsp;taken into consideration.</p>
			</Accordion>
			
			<Accordion title="Quantum numbers">
				<p>Every electron in&nbsp;an&nbsp;atom can be&nbsp;defined completely by&nbsp;a&nbsp;set of&nbsp;four quantum numbers n,l,m<sub>l</sub> and m<sub>s</sub>, the stand for the principal quantum number, the orbital angular momentum quantum number, the magnetic quantum number and the spin quantum number respectively.</p>
				<p>The quantum numbers belong to&nbsp;the set of&nbsp;real numbers, three of&nbsp;them can take the value of&nbsp;simple integers and one can take a&nbsp;value of&nbsp;a&nbsp;fraction.<br />
				The first three quantum numbers arise from the wave function, &#936;, obtained by&nbsp;solving the Schr&#246;dinger equation.<br />
				The fourth quantum number, electron spin, arises from the discovery that electrons have two possible orientations.</p>
			</Accordion>

			<Accordion title="Madelung’s Rule">
				<p>The Madelung rule tries to&nbsp;establish the order in&nbsp;which electrons fill energy sublevels of&nbsp;atoms. The aufbau principle says that in&nbsp;the ground state of&nbsp;an&nbsp;atom, electrons always occupy the lowest available energy sublevel.</p>
				<p>This order of&nbsp;occupation roughly represents the increasing energy level of&nbsp;the orbitals. Hence, electrons occupy the orbitals in&nbsp;such a&nbsp;way that the energy is&nbsp;kept at&nbsp;a&nbsp;minimum. That is, the 7s, 5f, 6d, 7p subshells will not be&nbsp;filled with electrons unless the lower energy orbitals, 1s to&nbsp;6p, are already fully occupied. Also, it&nbsp;is&nbsp;important to&nbsp;note that although the energy of&nbsp;the 3d orbital has been mathematically shown to&nbsp;be&nbsp;lower than that of&nbsp;the 4s orbital, electrons occupy the 4s orbital first before the 3d orbital. This observation can be&nbsp;ascribed to&nbsp;the fact that 3d electrons are more likely to&nbsp;be&nbsp;found closer to&nbsp;the nucleus; hence, they repel each other more strongly. Nonetheless, remembering the order of&nbsp;orbital energies, and hence assigning electrons to&nbsp;orbitals, can become rather easy when related to&nbsp;the periodic table.</p>
			</Accordion>

			<Accordion title="Hund’s rule">
				<p>Hund’s&nbsp;rule states that:</p>
				<p>First, every orbital in&nbsp;a&nbsp;sublevel is&nbsp;singly occupied before any orbital is&nbsp;doubly occupied. According to&nbsp;this statement, electrons always enter an&nbsp;empty orbital before they pair up. Electrons are negatively charged and, as&nbsp;a&nbsp;result, they repel each other. They tend to&nbsp;minimize repulsion by&nbsp;occupying their own orbitals, rather than sharing an&nbsp;orbital with another electron. Furthermore, quantum-mechanical calculations have shown that the electrons in&nbsp;singly occupied orbitals are less effectively screened or&nbsp;shielded from the nucleus.</p>
				<p>Secondly, all of&nbsp;the electrons in&nbsp;singly occupied orbitals have the same spin (to&nbsp;maximize total spin). Technically speaking, the first electron in&nbsp;a&nbsp;sublevel could be&nbsp;either &laquo;spin-up&raquo; or&nbsp;&laquo;spin-down&raquo;. Once the spin of&nbsp;the first electron in&nbsp;a&nbsp;sublevel is&nbsp;chosen, however, the spins of&nbsp;all of&nbsp;the other electrons in&nbsp;that sublevel depend on&nbsp;that first spin. To&nbsp;avoid confusion, scientists typically draw the first electron, and any other unpaired electron, in&nbsp;an&nbsp;orbital as&nbsp;&laquo;spin-up&raquo;.</p>
				<p>The letter refers to&nbsp;the shape of&nbsp;the orbital. The letters go&nbsp;in&nbsp;the order s, p, d, f, g, h, i, j, etc. The letters s, p, d, and f&nbsp;were assigned for historical reasons that should not be&nbsp;taken into consideration.</p>
			</Accordion>

			<Accordion title="Pauli's Exclusion Principle">
				<p>The Pauli exclusion principle says that every electron must be&nbsp;in&nbsp;its own unique state. In&nbsp;other words, no&nbsp;electrons in&nbsp;an&nbsp;atom are permitted to&nbsp;have an&nbsp;identical set of&nbsp;quantum numbers.</p>
			</Accordion>

			<ReturnToMain />
		</div>
	</div>	
	);
}