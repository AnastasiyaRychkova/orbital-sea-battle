import React from 'react'
import styles from './ElementFolder.module.scss';
import FolderImg from '../../img/folders/FolderImg'
import textStyle from '../../style/text.scss'
import cx from 'classnames'

const ElementFolder = ({ element }) => (
	<button className={styles.folder} >
	
		<FolderImg/>
		<div className={cx(styles.element, textStyle['long-small'] )}>
			<span>{element.name}</span>
			<span className={textStyle['text-xl']}>{element.symbol}</span>
			<span className={styles.elementNumber}>{element.number}</span>
		</div>
	</button>
)

export default ElementFolder