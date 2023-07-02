import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const OneArg = [1];
  const TwoArgs = [1, 2];

  test('should generate linked list from values 1', () => {
    const resultList = generateLinkedList(OneArg);
    expect(resultList).toStrictEqual({
      value: 1,
      next: { value: null, next: null },
    });
  });

  test('should generate linked list from values 2', () => {
    const resultList = generateLinkedList(TwoArgs);
    expect(resultList).toMatchSnapshot({
      value: 1,
      next: { value: 2, next: { value: null, next: null } },
    });
  });
});
