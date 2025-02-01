import axiosInstance from "../axios";
import { BudgetData } from "./types";


export const fetchBudget = async (): Promise<BudgetData> => {
  const token = sessionStorage.getItem("access_token");
  const response = await axiosInstance.get('/api/expenses',{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};



