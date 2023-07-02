import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockResolvedValue({ data: 'Hello from Api!' });
    const dataFromApi = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi('/api/lib');

    expect(dataFromApi).toBeCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockData = jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockResolvedValue({ data: 'Hello from Api!' });
    await throttledGetDataFromApi('/api/lib');

    jest.runAllTimers();

    expect(mockData).toBeCalledWith('/api/lib');
  });

  test('should return response data', async () => {
    jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockResolvedValue({ data: 'Hello from Api!' });
    const respFromApi = await throttledGetDataFromApi('/api/lib');

    expect(respFromApi).toBe('Hello from Api!');
  });
});
