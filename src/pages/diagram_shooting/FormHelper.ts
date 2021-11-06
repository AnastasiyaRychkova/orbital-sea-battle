import type {ID, FieldId, FormUrl, FormStore, FormType } from './FormHelperTypes';
import type { MetricsData } from './MetricsInterface';

type AdditionalDataType = {
	variant: number,
	results: boolean[],
}

type FieldName = | 'clientId'
				 | 'variant'
				 | 'metrics';

export type FormName =  | 'general'
						| 'firstInterface'
						| 'secondInterface';

class FormHelper
{
	private _metrics?: MetricsData;
	private _results?: boolean[];
	private readonly _clientID: ID;
	private readonly _variant: number;
	private _additionalData?: AdditionalDataType;
	
	private _idField: FieldId = 'answer_short_text_10101118';

	private readonly _forms: FormStore<FormName, FieldName> = {
		general: {
			url: 'https://forms.yandex.ru/u/6149019fbefa31fa01c8e734/?iframe=1',
			fields: {
				clientId: {id: 'answer_short_text_10101118'},
			},
		},
		firstInterface: {
			url: 'https://forms.yandex.ru/u/615382e02f32d9ac52ac829d/?iframe=1',
			fields: {
				clientId: { id: 'answer_short_text_10126023' },
				variant: { id: 'answer_number_10126040' },
				metrics: { id: 'answer_long_text_10126047' },
			}
		},
		secondInterface: {
			url: 'https://forms.yandex.ru/u/6153a3e2faeae69ffbfb5439/?iframe=1',
			fields: {
				clientId: { id: 'answer_short_text_10126122' },
				variant: { id: 'answer_number_10126123' },
				metrics: { id: 'answer_long_text_10126124' },
			}
		},
	}

	constructor( variant: number )
	{
		this._clientID = this._generateId();
		this._variant = variant;
	}

	private _generateId(): ID
	{
		return Math.trunc( Math.random() * 10000000000 )
	}

	setMetrics( metrics: MetricsData ): FormHelper
	{
		this._metrics = metrics;
		return this;
	}

	setTestResults( results: boolean[] ): FormHelper
	{
		this._results = results;
		return this;
	}

	getURL( form: FormName ): FormUrl
	{
		switch( form ) {
			case 'general':
				return this._makeGeneralFormUrl();
			case 'firstInterface':
				return this._makeFIFormUrl();
			case 'secondInterface':
				return this._makeSIFormUrl();
		}
	}

	private _makeGeneralFormUrl(): FormUrl
	{
		const form: FormType<FieldName> = this._forms.general;
		return `${form.url}&${form.fields.clientId?.id}=${this._clientID}`;
	}

	private _makeFIFormUrl(): FormUrl
	{
		const form: FormType<FieldName> = this._forms.firstInterface;
		return `${form.url}&${form.fields.clientId?.id}=${this._clientID}&${form.fields.variant?.id}=${this._variant}&${form.fields.metrics?.id}=${this._makeMetricsAttribute()}`;
	}

	private _makeSIFormUrl(): FormUrl
	{
		const form: FormType<FieldName> = this._forms.secondInterface;
		return `${form.url}&${form.fields.clientId?.id}=${this._clientID}&${form.fields.variant?.id}=${this._variant}&${form.fields.metrics?.id}=${this._makeMetricsAttribute()}`;
	}

	private _makeMetricsAttribute(): string
	{
		if( !this._results || !this._metrics )
			return 'error';

		const res = {
			result: '',
			duration: '',
			clicks: '',
		};
		for( let i = 0; i < this._results.length; i++ )
		{
			res.result += Number( this._results[i] ) + '+';
			res.duration += this._metrics[i].duration + '+';
			res.clicks += this._metrics[i].clicks.length + '+';
		}
		return res.result + res.duration + res.clicks + 0;
	}
}



export default FormHelper;