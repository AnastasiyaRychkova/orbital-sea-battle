import React from 'react'

import ElementFolder from '../../modules/ElementFolder/ElementFolder.jsx'
import Button from '../../modules/buttons/Button.jsx'
import styles from '../../modules/ElementSelectionWindow/ElementSelectionWindow.module.scss';

const ElementSelectionWindow = () => {
	const elements = {'C': {symbol:'C',number:6, name:'carboneum'},
	'Rh': {symbol:'Rh',number:45, name:'rhodium'},
	'Ds': {symbol:'Ds',number:110, name:'darmstadtium'}
	}
return(
	<div className={styles.selection}>
		<span className={styles.manual}>Выберите план для перевозки грузов</span>

		<div className={styles.folders}>
		<ElementFolder
			element={elements.C}
			key={elements.C.number}
		/>
		<ElementFolder
			element={elements.Rh}
			key={elements.Rh.number}
		/>
		<ElementFolder
			element={elements.Ds}
			key={elements.Ds.number}
		/>
		</div>
		<Button
		className='button-tertiary'
		>
		выбрать
		</Button>

	</div>
)
}

export default ElementSelectionWindow
