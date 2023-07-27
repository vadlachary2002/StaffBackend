const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    DEFAULT_PASSWORD: Joi.string().required().description("default password"),
    JWT_SECRECT_KEY: Joi.string().required().description("my jwt key"),
    TOKEN_EXPIRES_DAYS: Joi.number().required(),
    FRONTEND_URL: Joi.string().required()
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  port: envVars.PORT,
  defaultPassword:envVars.DEFAULT_PASSWORD,
  jwtkey: envVars.JWT_SECRECT_KEY,
  tokenExpiryDays: envVars.TOKEN_EXPIRES_DAYS,
  frontendUrl: envVars.FRONTEND_URL,
  mongoose: {
    url: envVars.MONGODB_URL,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};
