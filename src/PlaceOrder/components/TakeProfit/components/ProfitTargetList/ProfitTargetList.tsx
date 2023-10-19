import React from "react";
import { observer } from "mobx-react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";

import { ErrorMessage } from "components";

import { ProfitTarget } from "../ProfitTarget/ProfitTarget";
import { AddProfitButton } from "../AddProfitButton/AddProfitButton";
import { ProjectedProfit } from "../ProjectedProfit/ProjectedProfit";

import { useTakeProfitStore } from "store/context";
import { MAX_PROFIT_TARGETS } from "store/TakeProfitStore/TakeProfitStore.const";

import styles from "./ProfitTargetList.module.scss";

const tableHeaderStyles = {
  borderBottom: "none",
  color: "#A2A7B9",
  fontSize: "12px",
  fontWeight: 500,
};

const ProfitTargetList = observer(() => {
  const {
    isMoreTargetsAllowed,
    profitTargets,
    addProfitTarget,
    removeProfitTarget,
    setProfitTarget,
    updateProfitTarget,
    currentValidationError,
    projectedProfit,
  } = useTakeProfitStore();

  return (
    <>
      <TableContainer>
        <Table
          style={{
            borderCollapse: "separate",
            borderSpacing: "0px 4px",
          }}
        >
          <TableHead>
            <TableRow className={styles.tableHead}>
              <TableCell
                padding="none"
                style={{ ...tableHeaderStyles, width: "20%" }}
              >
                Profit
              </TableCell>
              <TableCell
                padding="none"
                style={{ ...tableHeaderStyles, width: "40%" }}
              >
                Target price
              </TableCell>
              <TableCell
                padding="none"
                align="right"
                colSpan={2}
                style={{ ...tableHeaderStyles, width: "40%" }}
              >
                Amount to sell
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {profitTargets.map((target) => (
              <ProfitTarget
                key={target.id}
                onChange={setProfitTarget}
                onBlur={updateProfitTarget}
                onDelete={removeProfitTarget}
                {...target}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {currentValidationError && (
        <ErrorMessage className={styles.error}>
          {currentValidationError}
        </ErrorMessage>
      )}
      {isMoreTargetsAllowed && (
        <AddProfitButton
          settedProfitNumber={profitTargets.length}
          maxProfitTargets={MAX_PROFIT_TARGETS}
          onClick={addProfitTarget}
          className={styles.addProfitButton}
        />
      )}
      <div className={styles.projectedProfit}>
        <ProjectedProfit total={projectedProfit} />
      </div>
    </>
  );
});

export { ProfitTargetList };
