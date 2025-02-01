import axiosInstance from "../axios";
import { IncomeData } from "./types";



export const fetchIncome = async (): Promise<IncomeData> => {
  const response = await axiosInstance.get('/api/incomes');
  return response.data;
};


export const addIncome = async (income: { source: string; planned: number; actual: number }) => {
    const response = await axiosInstance.post('/api/incomes', income);
    return response.data;
  };
