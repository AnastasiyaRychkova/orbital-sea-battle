export type ID = number;
export type FieldId = string;
export type FormUrl = string;

export type FieldType = {
	id: FieldId,
	variants?: FieldId[],
};

export type FormType<FieldName extends string> = {
	url: FormUrl,
	fields: {[key in FieldName]?: FieldType}
};

export type FormStore<FormName extends string, FieldName extends string> = {
	[key in FormName]: FormType<FieldName>
};