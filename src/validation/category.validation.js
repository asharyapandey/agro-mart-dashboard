import * as yup from "yup";

const categorySchema = yup.object().shape({
	image: yup.string().required(),
	slug: yup.string().required(),
	category: yup.string().required(),
});

export default categorySchema;
