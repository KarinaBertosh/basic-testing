import {
  readFileAsynchronously,
  doStuffByTimeout,
  doStuffByInterval,
} from './index';
import fs from 'fs';
import path from 'path';

beforeAll(() => {
  jest.useFakeTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

describe('doStuffByTimeout', () => {
  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    doStuffByTimeout(callback, 2000);
    expect(setTimeout).toBeCalled();
    expect(setTimeout).toHaveBeenCalledTimes(1);
  });

  test('should call callback only after timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    doStuffByTimeout(callback, 2000);
    jest.runAllTimers();
    expect(setTimeout).toBeCalled();
    expect(setTimeout).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    doStuffByInterval(callback, 2000);
    expect(setInterval).toBeCalled();
    expect(setInterval).toBeTruthy();
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    doStuffByInterval(callback, 2000);
    jest.runOnlyPendingTimers();
    expect(setInterval).toBeCalled();
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const mockPathJoin = jest.spyOn(path, 'join');
    await readFileAsynchronously('test.txt');
    expect(mockPathJoin).toBeCalled();
    expect(mockPathJoin).toHaveBeenCalledWith(__dirname, 'test.txt');
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    const fileContent = await readFileAsynchronously('test.txt');
    expect(fileContent).toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs.promises, 'readFile').mockResolvedValue('Hello from file!');
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    const fileContent = await readFileAsynchronously('test.txt');
    expect(fileContent).toBe('Hello from file!');
  });
});
