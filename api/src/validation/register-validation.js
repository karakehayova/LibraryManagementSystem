import Joi from 'joi';
import { JoiPasswordComplexity } from "joi-password";

const schema = Joi.object({
    username: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    password: JoiPasswordComplexity.string()
        .minOfSpecialCharacters(2)
        .minOfLowercase(2)
        .minOfUppercase(2)
        .minOfNumeric(2)
        .required(),
    email: Joi.string().email().required(),
    admin: Joi.bool().required(),
});

export default schema;

// const schemaName = 'REGISTRATION_VALIDATION';
// export { schema, schemaName };
