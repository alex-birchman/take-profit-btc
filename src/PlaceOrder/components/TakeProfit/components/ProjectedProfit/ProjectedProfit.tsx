import React from "react";
import { observer } from "mobx-react";

import { QUOTE_CURRENCY } from "PlaceOrder/constants";

import styles from "./ProjectedProfit.module.scss";

type ProjectedProfitProps = {
  total: string;
};

const ProjectedProfit = observer(({ total }: ProjectedProfitProps) => {
  return (
    <div className={styles.root}>
      <span className={styles.label}>Projected profit</span>
      <hr className={styles.delimiter} />
      <div className={styles.sum}>
        <span className={styles.sumNumber}>{total}</span>
        <span>{QUOTE_CURRENCY}</span>
      </div>
    </div>
  );
});

export { ProjectedProfit };
