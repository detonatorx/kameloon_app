import axios from 'axios';
import { api } from '../api';
// Мокаем axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getSites should fetch sites data', async () => {
    const mockSites = [{ id: '1', name: 'Test Site', url: 'https://test.com' }];
    mockedAxios.get.mockResolvedValueOnce({ data: mockSites });

    const result = await api.getSites();
    
    expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3100/sites');
    expect(result).toEqual(mockSites);
  });

  test('getTests should fetch tests with params', async () => {
    const mockTests = [{ id: '1', name: 'Test 1', type: 'A/B', status: 'ONLINE', siteId: '1' }];
    mockedAxios.get.mockResolvedValueOnce({ data: mockTests });
    
    const params = { name_like: 'Test' };
    const result = await api.getTests(params);
    
    expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3100/tests', { params });
    expect(result).toEqual(mockTests);
  });

  test('getTest should fetch a single test by id', async () => {
    const mockTest = { id: '1', name: 'Test 1', type: 'A/B', status: 'ONLINE', siteId: '1' };
    mockedAxios.get.mockResolvedValueOnce({ data: mockTest });
    
    const result = await api.getTest('1');
    
    expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3100/tests/1');
    expect(result).toEqual(mockTest);
  });
}); 
