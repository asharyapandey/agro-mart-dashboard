import * as yup from "yup";

const unitSchema = yup.object().shape({
	displayName: yup.string().required(),
	unit: yup.string().required(),
});

export default unitSchema;
