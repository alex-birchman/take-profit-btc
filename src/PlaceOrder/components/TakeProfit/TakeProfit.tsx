import React from "react";
import cn from "classnames";
import { observer } from "mobx-react";

import { Switch, QuestionTooltip } from "components";
import { ProfitTargetList } from "./components/ProfitTargetList/ProfitTargetList";
import { useTakeProfitStore } from "store/context";

import styles from "./TakeProfit.module.scss";

const TakeProfit = observer(() => {
  const { takeProfitEnabled, toggleProfit } = useTakeProfitStore();

  return (
    <div className={styles.root}>
      <div className={styles.switch}>
        <div
          className={cn(styles.label, {
            [styles.labelActive]: takeProfitEnabled,
          })}
        >
          <QuestionTooltip message="Take profit description" /> Take Profit
        </div>
        <Switch checked={takeProfitEnabled} onChange={toggleProfit} />
      </div>
      {takeProfitEnabled && (
        <div className={styles.content}>
          <ProfitTargetList />
        </div>
      )}
    </div>
  );
});

export { TakeProfit };
