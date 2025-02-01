import { useQuery } from '@tanstack/react-query';
import { fetchBudget } from '../api/budget';
import { BudgetData } from '../api/types';

export const useBudget = () => {
  return useQuery<BudgetData, Error>({
    queryKey: ['budget'], 
    queryFn: fetchBudget,
  });
};
