import React from 'react';
import Button from '../../components/Button/Default/Button';
import ButtonWithIcon from '../../components/Button/WithIcon/Button';
import IconButton from '../../components/Button/IconButton/Button';
import DropSidedInfo from '../../components/DropSidedInfo/DropSidedInfo';
import GameProgress from '../../components/GameProgress/GameProgress';
import MiniInfo from '../../components/MiniInfo/MiniInfo';

import './components.css';
import '../../style/colors.css';
import '../../style/reset.css';

const miniInfoProvider = {
	valueAsString: () => '2/5'
}

const progress = {
	level: 2,
	name: 'Лейтенант',
	score: 14,
	goal: 20,
}



const Test = () => {
	return (
		<div className='test'>
			<section className="tasks">
				<div className="row">
					<div className="column tasks">
						<DropSidedInfo message='Выберете 2 ряд диаграммы' comment='Используйте панель внизу экрана' />
					</div>
					<div className="column mini-infos">
						<MiniInfo provider={miniInfoProvider} caption='выстрелов' glyph='shot' />
					</div>
				</div>
			</section>
			<section className="progress">
				<div className="row">
					<div className="column">
						<GameProgress progress={progress} />
						<GameProgress progress={progress} withScore />
						<GameProgress progress={progress} withLevel />
						<GameProgress progress={progress} withName />
						<GameProgress progress={progress} withLevel withScore />
						<GameProgress progress={progress} withLevel withName />
						<GameProgress progress={progress} withScore withName />
					</div>
				</div>
			</section>
			<section className="buttons">
				<div className="row">
					<div className="column">
						<Button value='Button' priority='primary' />
						<Button value='Button' priority='secondary' />
					</div>
					<div className="column">
						<ButtonWithIcon value='Приоритетное действие' priority='primary' theme='muted' glyph='info' />
						<ButtonWithIcon value='Альтернативное действие' priority='secondary' theme='muted' glyph='info' />
						<ButtonWithIcon value='Альтернативное действие' priority='secondary' theme='bright' glyph='info' />
						<ButtonWithIcon value='Альтернативное действие' priority='secondary' theme='dark' glyph='info' />
					</div>
					<div className="column">
						<IconButton type='cross' className='icon-button' />
					</div>
				</div>
			</section>
		</div>
	);
};

export default Test;