import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  return {
    __esModule: true,
    ...originalModule,
    mockOne: () => 'foo',
    mockTwo: () => 'bar',
    mockThree: () => 'baz',
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockTwo should not log into console', () => {
    const mockFunctions = jest.spyOn(console, 'log');
    mockOne();
    mockTwo();
    mockThree();
    expect(mockFunctions).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    const mockFunctions = jest.spyOn(console, 'log');
    unmockedFunction();
    expect(mockFunctions).toHaveBeenCalled();
  });
});
