import * as yup from "yup";

const productSchema = yup.object().shape({
	productName: yup.string().required(),
	slug: yup.string().required(),
	kalimatiPrice: yup.string().required(),
	unit: yup.string().required(),
	category: yup.string().required(),
});

export default productSchema;
