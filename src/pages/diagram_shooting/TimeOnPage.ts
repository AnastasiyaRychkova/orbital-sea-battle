type ms = number;
type Timestamp = number;

class TimeOnPage
{
	/** Время на странице */
	#timeOnPage: ms = 0;

	/** Время за пределами страницы, пока она открыта */
	#timeOutOfPage: ms = 0;

	/** Время начала сессии */
	readonly sessionStartTime: Date = new Date();

	/** Количество отлучек */
	absences: number = 0;

	/** Время прихода на страницу, в.т.ч. после отлучек */
	#subsessionStartTime: Timestamp = Date.now();

	/** Время ухода со страницы */
	#absenceStartTime: Timestamp = Date.now();


	constructor()
	{
		window.addEventListener(
			'blur',
			() => {
				this.absences++;
				this.#absenceStartTime = Date.now();
				this.#timeOnPage += this.#absenceStartTime - this.#subsessionStartTime;
			}
		);

		window.addEventListener(
			'focus',
			() => {
				this.#subsessionStartTime = Date.now();
				this.#timeOutOfPage += this.#subsessionStartTime - this.#absenceStartTime;
			}
		);
	}

	get timeOnPage(): number
	{
		return this.#timeOnPage + ( Date.now() - this.#subsessionStartTime );
	}

	get timeOutOfPage(): number
	{
		return this.#timeOutOfPage + ( Date.now() - this.#absenceStartTime );
	}
}


export default TimeOnPage;