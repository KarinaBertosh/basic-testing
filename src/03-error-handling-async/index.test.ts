import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const data = await resolveValue(1);
    expect(data).toBe(1);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', async () => {
    try {
      await throwError('Hello');
    } catch (error) {
      expect(error);
    }
  });

  test('should throw error with default message if message is not provided', async () => {
    try {
      await throwError();
    } catch (error) {
      expect(error);
    }
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', async () => {
    try {
      await throwCustomError();
    } catch (error) {
      expect(MyAwesomeError);
    }
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    return expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
