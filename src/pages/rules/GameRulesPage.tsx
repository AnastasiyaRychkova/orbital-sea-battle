import React from 'react';
import styles from './GameRulesPage.module.scss';
import { Namespace, TFunction, useTranslation } from 'react-i18next';
import { RulesImage } from './rules-image/RulesImage';

export const GameRulesPage = () => {
	const { t, i18n } = useTranslation(undefined, { keyPrefix: 'pages.rules' });

	return (
		<div className={styles.page}>
			<article className={styles.article}>
				<h1 className="header-2 bold">Game Rules</h1>
				<div className={styles.content}>
					<div className={styles.part}>
						<p className="long-medium">
							{highlightParagraph(t, 0)}.
						</p>
						<RulesImage
							className={styles.image}
							src={`/img/landing/2${
								i18n.language !== 'ru' ? '_en' : ''
							}.png`}
							alt={imgCaption(t, 0)}
						/>
					</div>
					<div className={styles.part}>
						<p className="long-medium">
							{highlightParagraph(t, 1)}
						</p>
						<ol className={styles.list}>
							<li>
								<p className="long-medium">
									{highlightParagraph(t, 2)}
								</p>
								<p className={styles.mono + ' long-medium'}>
									{
										'1s < 2s < 2p < 3s < 3p < 4s < 3d < 4p < 5s ≈ 4d < 5p < 6s < 4f ≈ 5d < 6p < 7s < 5f ≈ 6d < 7p.'
									}
								</p>
							</li>
							<li className="long-medium">
								{highlightParagraph(t, 3)}
							</li>
						</ol>
					</div>
					<div className={styles.part}>
						<p className="long-medium">
							{highlightParagraph(t, 4)}
						</p>
					</div>
					<div className={styles.part}>
						<p className="long-medium">
							{highlightParagraph(t, 5)}
						</p>
						<dl className={styles.dl + ' long-medium'}>
							<div>
								<dt>n</dt>
								<dd>– {t('definitions.n')}</dd>
							</div>
							<div>
								<dt>l</dt>
								<dd>– {t('definitions.l')}</dd>
							</div>
							<div>
								<dt>
									m<sub>L</sub>
								</dt>
								<dd>– {t('definitions.m')}</dd>
							</div>
							<div>
								<dt>
									m<sub>S</sub>
								</dt>
								<dd>– с{t('definitions.s')}</dd>
							</div>
						</dl>
					</div>
					<p className="long-medium">{highlightParagraph(t, 6)}</p>
					<RulesImage
						className={styles.image}
						src={`/img/landing/5${
							i18n.language !== 'ru' ? '_en' : ''
						}.png`}
						alt={imgCaption(t, 1)}
					/>
					<div className={styles.part}>
						<p className="long-medium">
							{highlightParagraph(t, 7)}
						</p>
					</div>
				</div>
				<span className="text-big bold">{t('end')}</span>
			</article>
		</div>
	);
};

function highlightParagraph(
	t: TFunction<Namespace<string>, 'pages.rules'>,
	index: number
) {
	const p = t('paragraphs', { returnObjects: true })[index];
	let components = p
		.split('**')
		.reduce<(JSX.Element | string)[]>((res, text, i) => {
			res.push(
				i % 2
					? (
						<span
							className={styles.bold}
							key={text}
						>
							{text}
						</span>
					)
					: text
			);
			return res;
		}, []);
	return components;
}

function imgCaption(
	t: TFunction<Namespace<string>, 'pages.rules'>,
	index: number,
) {
	return t('caption', { returnObjects: true })[index];
}
