import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  const rawInputAdd = { a: 1, b: 2, action: Action.Add };
  const rawInputSubtract = { a: 1, b: 2, action: Action.Subtract };
  const rawInputMultiply = { a: 1, b: 2, action: Action.Multiply };
  const rawInputDivide = { a: 1, b: 2, action: Action.Divide };
  const rawInputExponentiate = { a: 1, b: 2, action: Action.Exponentiate };
  const rawInputWrongAction = { a: 1, b: 2, action: 'Delete' };
  const rawInputWrongArg = { a: '1', b: 2, action: Action.Add };

  test('should add two numbers', () => {
    const result = simpleCalculator(rawInputAdd);
    expect(result).toBe(3);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator(rawInputSubtract);
    expect(result).toBe(-1);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator(rawInputMultiply);
    expect(result).toBe(2);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator(rawInputDivide);
    expect(result).toBe(0.5);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator(rawInputExponentiate);
    expect(result).toBe(1);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator(rawInputWrongAction);
    expect(result).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator(rawInputWrongArg);
    expect(result).toBe(null);
  });
});
