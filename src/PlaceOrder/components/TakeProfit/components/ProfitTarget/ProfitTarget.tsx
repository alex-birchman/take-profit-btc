import React from "react";
import { TableRow, TableCell } from "@material-ui/core";

import { NumberInput, IconButton } from "components";
import { WarningIcon } from "icons/WarningIcon/WarningIcon";
import { QUOTE_CURRENCY } from "PlaceOrder/constants";
import {
  setProfitTargetFn,
  updateProfitTargetFn,
} from "store/TakeProfitStore/interfaces";

import styles from "./ProfitTarget.module.scss";

const tableCellStyles = {
  color: "#A2A7B9",
  fontSize: "12px",
  fontWeight: 500,
  borderBottom: "1px solid rgba(162, 167, 185, 0.8)",
};

const tableCellErrorStyles = {
  color: "#f96c5a",
  borderBottom: "1px solid #f96c5a",
};

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
  const errorStyles = isError ? tableCellErrorStyles : {};

  return (
    <TableRow>
      <TableCell
        padding="none"
        style={{
          ...tableCellStyles,
          ...errorStyles,
          paddingRight: "16px",
        }}
      >
        <div className={styles.rowItem}>
          <NumberInput
            id={`profit-${id}`}
            variant="underlined"
            size="small"
            min={0}
            decimalScale={2}
            isError={isError}
            value={profit}
            onChange={(value) => onChange(id, "profit", Number(value))}
            onBlur={(value) => onBlur(id, "profit", Number(value))}
          />
          <label htmlFor={`profit-${id}`}>%</label>
        </div>
      </TableCell>
      <TableCell
        padding="none"
        style={{
          ...tableCellStyles,
          ...errorStyles,
          paddingRight: "20px",
        }}
      >
        <div className={styles.rowItem}>
          <NumberInput
            id={`price-${id}`}
            variant="underlined"
            size="small"
            min={0}
            decimalScale={1}
            isError={isError}
            value={price}
            onChange={(value) => onChange(id, "price", Number(value))}
          />
          <label htmlFor={`price-${id}`}>{QUOTE_CURRENCY}</label>
        </div>
      </TableCell>
      <TableCell
        padding="none"
        style={{
          ...tableCellStyles,
          ...errorStyles,
          paddingLeft: "30px",
          paddingRight: "25px",
        }}
      >
        <div className={styles.rowItem}>
          <NumberInput
            id={`amount-${id}`}
            variant="underlined"
            size="small"
            min={0}
            decimalScale={2}
            isError={isError}
            value={amount}
            onChange={(value) => onChange(id, "amount", Number(value))}
          />
          <label htmlFor={`amount-${id}`}>%</label>
        </div>
      </TableCell>
      <TableCell
        align="right"
        padding="none"
        style={{
          ...tableCellStyles,
          ...(isError ? errorStyles : {}),
          paddingRight: "1px",
        }}
      >
        <IconButton onClick={() => onDelete(id)}>
          <WarningIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export { ProfitTarget };
