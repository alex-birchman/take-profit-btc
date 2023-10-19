export interface ITakeProfitStore {
  isMoreTargetsAllowed: boolean;
  takeProfitEnabled: boolean;
  profitTargets: ProfitItem[];
  projectedProfit: string;
  toggleProfit: () => void;
  setProfitTarget: setProfitTargetFn;
  addProfitTarget: () => void;
  removeProfitTarget: (id: string) => void;
  updateProfitTarget: updateProfitTargetFn;
  validation: ITakeProfitValidation;
  currentValidationError: string | undefined;
  validateProfitTargets: () => void;
}

export interface ITakeProfitValidation {
  maxSumProfitTargetsError: string | null;
  minValueProfitTargetError: string | null;
  eachTargetProfitGteError: string | null;
  minProfitTargetPriceError: string | null;
  sumProfitTargetAmountGteError: string | null;
  sumProfitTargetAmountLteError: string | null;
}

export type ProfitItem = {
  id: string;
  profit: number;
  price: number;
  amount: number;
  isError: boolean;
};

export type setProfitTargetFn = <K extends keyof ProfitItem>(
  id: string,
  param: K,
  value: ProfitItem[K]
) => void;

export type updateProfitTargetFn = <
  K extends keyof Omit<ProfitItem, "id" | "amount" | "isError">
>(
  id: string,
  param: K,
  value: ProfitItem[K]
) => void;
