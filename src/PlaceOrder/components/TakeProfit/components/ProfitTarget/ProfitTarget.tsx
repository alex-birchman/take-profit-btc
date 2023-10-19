import React from "react";
import cn from "classnames";

import { NumberInput, IconButton } from "components";
import { WarningIcon } from "icons/WarningIcon/WarningIcon";
import {
  setProfitTargetFn,
  updateProfitTargetFn,
} from "store/TakeProfitStore/interfaces";
import { QUOTE_CURRENCY } from "PlaceOrder/constants";

import styles from "./ProfitTarget.module.scss";

type ProfitTargetProps = {
  id: string;
  profit: number;
  price: number;
  amount: number;
  isError: boolean;
  onChange: setProfitTargetFn;
  onBlur: updateProfitTargetFn;
  onDelete(id: string): void;
};

const ProfitTarget = ({
  id,
  profit,
  price,
  amount,
  isError,
  onChange,
  onBlur,
  onDelete,
}: ProfitTargetProps) => {
  return (
    <div
      className={cn(styles.root, {
        [styles.error]: isError,
      })}
    >
      <div className={styles.profit}>
        <NumberInput
          variant="underlined"
          size="small"
          min={0}
          decimalScale={2}
          value={profit}
          onChange={(value) => onChange(id, "profit", Number(value))}
          onBlur={(value) => onBlur(id, "profit", Number(value))}
        />
        <span>%</span>
      </div>

      <div className={styles.price}>
        <NumberInput
          variant="underlined"
          size="small"
          min={0}
          decimalScale={1}
          value={price}
          onChange={(value) => onChange(id, "price", Number(value))}
        />
        <span>{QUOTE_CURRENCY}</span>
      </div>

      <div className={styles.amount}>
        <NumberInput
          variant="underlined"
          size="small"
          min={0}
          decimalScale={2}
          value={amount}
          onChange={(value) => onChange(id, "amount", Number(value))}
        />
        <span>%</span>
      </div>
      <IconButton onClick={() => onDelete(id)}>
        <WarningIcon />
      </IconButton>
    </div>
  );
};

export { ProfitTarget };
