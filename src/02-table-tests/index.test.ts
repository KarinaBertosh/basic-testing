import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 1, b: 2, action: Action.Subtract, expected: -1 },
  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 1, b: 2, action: Action.Divide, expected: 0.5 },
  { a: 1, b: 2, action: Action.Exponentiate, expected: 1 },
  { a: 1, b: 2, action: 'Delete', expected: null },
  { a: '1', b: 2, action: Action.Add, expected: null },
];

test.each(testCases)('inline table', ({ a, b, action, expected }) => {
  expect(simpleCalculator({ a, b, action })).toBe(expected);
});
