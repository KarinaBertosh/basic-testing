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
      expect((error as Error).message).toBe('Hello');
    }
  });

  test('should throw error with default message if message is not provided', async () => {
    try {
      await throwError();
    } catch (error) {
      expect((error as Error).message).toBe('Oops!');
    }
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', async () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
