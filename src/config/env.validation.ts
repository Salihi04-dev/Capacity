import * as Joi from 'joi';

export const envSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'test', 'production').default('development'),
  PORT: Joi.number().port().default(3000),
  API_PREFIX: Joi.string().default('api'),
  API_VERSION: Joi.string().default('1'),
  DATABASE_URL: Joi.string().uri({ scheme: ['postgres', 'postgresql'] }).required(),
  CORS_ORIGINS: Joi.string().allow('').default(''),
  LOG_LEVEL: Joi.string().valid('fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent').default('info'),
  PAYMENT_ADAPTER: Joi.string().default('unconfigured'), SMS_ADAPTER: Joi.string().default('unconfigured'), EMAIL_ADAPTER: Joi.string().default('unconfigured'), PUSH_ADAPTER: Joi.string().default('unconfigured'), MAPS_ADAPTER: Joi.string().default('unconfigured'), FILE_STORAGE_ADAPTER: Joi.string().default('unconfigured'),
});

export function validateEnvironment(config: NodeJS.ProcessEnv): void {
  const { error } = envSchema.validate(config, { abortEarly: false, allowUnknown: true });
  if (error) throw new Error(`Invalid environment configuration: ${error.message}`);
  if (config.NODE_ENV === 'production') {
    const fakeKeys = ['PAYMENT_ADAPTER', 'SMS_ADAPTER', 'EMAIL_ADAPTER', 'PUSH_ADAPTER', 'MAPS_ADAPTER', 'FILE_STORAGE_ADAPTER'];
    const fake = fakeKeys.filter((key) => config[key]?.toLowerCase() === 'fake' || config[key]?.toLowerCase() === 'memory');
    if (fake.length) throw new Error(`Fake adapters are forbidden in production: ${fake.join(', ')}`);
  }
}
