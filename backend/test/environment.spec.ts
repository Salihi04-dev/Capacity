import { validateEnvironment } from '../src/config/env.validation';

describe('environment validation', () => {
  it('rejects fake adapters in production', () => {
    expect(() => validateEnvironment({
      NODE_ENV: 'production',
      DATABASE_URL: 'postgresql://user:pass@localhost:5432/capacity',
      PAYMENT_ADAPTER: 'fake',
    })).toThrow(/Fake adapters are forbidden in production/);
  });

  it('accepts a valid infrastructure configuration', () => {
    expect(() => validateEnvironment({
      NODE_ENV: 'test',
      DATABASE_URL: 'postgresql://user:pass@localhost:5432/capacity',
    })).not.toThrow();
  });
});
