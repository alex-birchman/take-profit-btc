export const INITIAL_PROFIT_TARGET_NUMBER = 2;
export const INITIAL_PROFIT_TARGET_AMOUNT = 100;
export const NEXT_PROFIT_TARGET_AMOUNT = 20;

export const MAX_PROFIT_TARGETS = 5;

export const MAX_SUM_PROFIT_TARGETS_ERROR = "Maximum profit sum is 500%";
export const MIN_VALUE_PROFIT_TARGET_ERROR = "Minimum value is 0.01";
export const EACH_TARGET_PROFIT_GTE_ERROR =
  "Each target's profit should be greater than the previous one";
export const MIN_PROFIT_TARGET_PRICE_ERROR = "Price must be greater than 0";

export const SUM_PROFIT_TARGET_AMOUNT_GTE_ERROR = (
  currentAmount: string,
  amountToDecrease: string
) =>
  `${currentAmount} out of 100% selected. Please decrease by ${amountToDecrease}`;

export const SUM_PROFIT_TARGET_AMOUNT_LTE_ERROR = (
  currentAmount: string,
  amountToIncrease: string
) =>
  `${currentAmount} out of 100% selected. Please increase by ${amountToIncrease}`;
