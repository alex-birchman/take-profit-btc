import React from "react";
import { observer } from "mobx-react";

import { ErrorMessage } from "components/ErrorMessage/ErrorMessage";

import { ProfitTarget } from "../ProfitTarget/ProfitTarget";
import { AddProfitButton } from "../AddProfitButton/AddProfitButton";
import { ProjectedProfit } from "../ProjectedProfit/ProjectedProfit";

import { useTakeProfitStore } from "store/context";
import { MAX_PROFIT_TARGETS } from "store/TakeProfitStore/TakeProfitStore.const";

import styles from "./ProfitTargetList.module.scss";

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
    <div className={styles.root}>
      <div className={styles.header}>
        <span className={styles.headerProfit}>Profit</span>
        <span className={styles.headerPrice}>Target price</span>
        <span className={styles.headerAmount}>Amount to sell</span>
      </div>
      <div className={styles.body}>
        {profitTargets.map((target) => (
          <ProfitTarget
            key={target.id}
            onChange={setProfitTarget}
            onBlur={updateProfitTarget}
            onDelete={removeProfitTarget}
            {...target}
          />
        ))}
      </div>
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
    </div>
  );
});

export { ProfitTargetList };
