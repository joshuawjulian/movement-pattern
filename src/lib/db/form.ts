export type SubmitCallBackType = SubmitEvent & {
	currentTarget: EventTarget & HTMLFormElement;
};

export const processForm = (evt: SubmitCallBackType) => {
	const data: any = {};

	const submitter = (evt.submitter as HTMLFormElement).name;
	data['submitter'] = submitter;
	const formData = new FormData(evt.target as HTMLFormElement);

	formData.forEach((value, key) => {
		data[key] = value;
	});
	return data;
};
