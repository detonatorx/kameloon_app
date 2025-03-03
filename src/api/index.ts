import axios from 'axios';
import { Site, Test } from '../types';

const API_BASE_URL = 'http://localhost:3100';

export const api = {
  getSites: () => axios.get<Site[]>(`${API_BASE_URL}/sites`).then(res => res.data),
  getTests: () => axios.get<Test[]>(`${API_BASE_URL}/tests`).then(res => res.data),
  getTest: (id: string) => axios.get<Test>(`${API_BASE_URL}/tests/${id}`).then(res => res.data)
}; 
