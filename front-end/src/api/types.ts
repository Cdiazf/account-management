export type BudgetItem = {
    category: string;
    planned: number;
    actual: number;
    difference: number;
};

export type BudgetData = {
    planned: number;
    actual: number;
    details: BudgetItem[];
};

export type IncomeItem = {
    source: string;
    planned: number;
    actual: number;
    difference: number;
  };
  
  export type IncomeData = {
    planned: number;
    actual: number;
    details: IncomeItem[];
  };
