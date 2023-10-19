import {
  MAX_SUM_PROFIT_TARGETS_ERROR,
  MIN_VALUE_PROFIT_TARGET_ERROR,
  EACH_TARGET_PROFIT_GTE_ERROR,
  MIN_PROFIT_TARGET_PRICE_ERROR,
  SUM_PROFIT_TARGET_AMOUNT_GTE_ERROR,
  SUM_PROFIT_TARGET_AMOUNT_LTE_ERROR,
  INITIAL_PROFIT_TARGET_NUMBER,
  INITIAL_PROFIT_TARGET_AMOUNT,
  NEXT_PROFIT_TARGET_AMOUNT,
} from "./TakeProfitStore.const";

import { ProfitItem } from "./interfaces";

export function checkMaxSumProfitTargetsError(targets: ProfitItem[]) {
  const sumOfAmounts = targets.reduce((acc, target) => acc + target.profit, 0);
  return sumOfAmounts > 500 ? MAX_SUM_PROFIT_TARGETS_ERROR : null;
}

export function checkMinValueProfitTargetError(targets: ProfitItem[]) {
  const error = targets.some((target) => target.profit < 0.01)
    ? MIN_VALUE_PROFIT_TARGET_ERROR
    : null;

  const profitTargets = targets.map((target) => ({
    ...target,
    isError: target.profit < 0.01,
  }));

  return {
    error,
    profitTargets,
  };
}

export function checkEachTargetProfitGteError(targets: ProfitItem[]) {
  const targetsWhichEachSumGte = targets.filter((p, i) => {
    if (i === 0) {
      return false;
    }
    return p.profit <= targets[i - 1].profit;
  });

  return targetsWhichEachSumGte.length > 0
    ? EACH_TARGET_PROFIT_GTE_ERROR
    : null;
}

export function checkMinProfitTargetPriceError(targets: ProfitItem[]) {
  const error = targets.some((target) => target.price <= 0)
    ? MIN_PROFIT_TARGET_PRICE_ERROR
    : null;

  const profitTargets = targets.map((target) => ({
    ...target,
    isError: target.price <= 0,
  }));

  return {
    error,
    profitTargets,
  };
}

export function checkSumProfitTargetAmountGteError(targets: ProfitItem[]) {
  return targets.reduce((acc, _) => {
    if (acc !== null) {
      return acc;
    }

    const sumOfAmounts = targets.reduce(
      (acc, target) => acc + target.amount,
      0
    );

    if (sumOfAmounts >= 100) {
      return null;
    }

    return SUM_PROFIT_TARGET_AMOUNT_LTE_ERROR(
      sumOfAmounts.toFixed(2),
      (100 - sumOfAmounts).toFixed(2)
    );
  }, null as string | null);
}

export function checkSumProfitTargetAmountLteError(targets: ProfitItem[]) {
  return targets.reduce((acc, _) => {
    if (acc !== null) {
      return acc;
    }

    const sumOfAmounts = targets.reduce(
      (acc, target) => acc + target.amount,
      0
    );

    if (sumOfAmounts <= 100) {
      return null;
    }

    return SUM_PROFIT_TARGET_AMOUNT_GTE_ERROR(
      sumOfAmounts.toFixed(2),
      (sumOfAmounts - 100).toFixed(2)
    );
  }, null as string | null);
}

export function addNextProfitTarget({
  orderSide,
  orderPrice,
  targets,
  isInitital = false,
}: {
  orderSide: "buy" | "sell";
  orderPrice: number;
  targets: ProfitItem[];
  isInitital?: boolean;
}) {
  let profit = INITIAL_PROFIT_TARGET_NUMBER;
  let amount = NEXT_PROFIT_TARGET_AMOUNT;

  if (isInitital) {
    amount = INITIAL_PROFIT_TARGET_AMOUNT;
  } else {
    const sumOfAmounts = targets.reduce(
      (acc, target) => acc + target.amount,
      0
    );

    profit = targets[targets.length - 1].profit + 2;

    if (sumOfAmounts + amount > 100) {
      const adjustedAmount = 100 - sumOfAmounts;
      amount = adjustedAmount > 0 ? adjustedAmount : 0;
    }
  }

  const price =
    orderSide === "buy"
      ? orderPrice * (1 + profit / 100)
      : orderPrice * (1 - profit / 100);

  return {
    id: crypto.randomUUID(),
    profit,
    amount,
    price,
  };
}

export function calculateProjectedProfit({
  orderSide,
  orderPrice,
  orderAmount,
  targets,
}: {
  orderSide: "buy" | "sell";
  orderPrice: number;
  orderAmount: number;
  targets: ProfitItem[];
}) {
  return targets.reduce((acc, profitTarget) => {
    if (orderSide === "buy") {
      acc +=
        (profitTarget.amount / 100) *
        orderAmount *
        (profitTarget.price - orderPrice);
    } else {
      acc +=
        (profitTarget.amount / 100) *
        orderAmount *
        (orderPrice - profitTarget.price);
    }
    return acc;
  }, 0);
}
