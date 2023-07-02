import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const resultList = generateLinkedList([1]);
    expect(resultList).toStrictEqual({
      value: 1,
      next: { value: null, next: null },
    });
  });

  test('should generate linked list from values 2', () => {
    const resultList = generateLinkedList([2]);
    expect(resultList).toMatchSnapshot({
      value: 2,
      next: { value: null, next: null },
    });
  });
});
