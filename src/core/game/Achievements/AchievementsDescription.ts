export enum EAchievementType {
	singleton,
	counter,
	multiCounter,
}

export type AchievementDescription = {
	title: string,
	task: string,
	type: EAchievementType,
	goals: number[],
};

const achievements: {[key: string]: AchievementDescription} = {
	secretCode: {
		title: 'Секретный код',
		task: 'Какое-то описание задания: secretCode',
		type: EAchievementType.singleton,
		goals: [],
	},

	detailsAreImportant: {
		title: 'Дело в деталях',
		task: 'Какое-то описание задания: detailsAreImportant',
		type: EAchievementType.counter,
		goals: [20],
	},

	rematches: {
		title: 'Реванш',
		task: 'Какое-то описание задания: rematch',
		type: EAchievementType.multiCounter,
		goals: [1, 5, 10, 20],
	}
}

export default achievements;