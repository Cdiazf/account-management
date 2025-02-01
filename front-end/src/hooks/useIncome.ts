import { useQuery } from '@tanstack/react-query';
import { fetchIncome } from '../api/income';
import { IncomeData } from '../api/types';

export const useIncome = () => {
  return useQuery<IncomeData, Error>({
    queryKey: ['income'],
    queryFn: fetchIncome,
  });
};
