import React from "react";

import { Button } from "components";
import { OrderSide } from "../../model";

import styles from "./PlaceOrderTypeSwitch.module.scss";

type Props = {
  activeOrderSide: OrderSide;
  onChange(orderSide: OrderSide): void;
};

const PlaceOrderTypeSwitch = ({ activeOrderSide, onChange }: Props) => {
  const handleToggle = (orderType: OrderSide) => {
    onChange(orderType);
  };

  return (
    <div className={styles.root}>
      <Button
        color="green"
        fullWidth
        size="small"
        inactive={activeOrderSide !== "buy"}
        onClick={() => handleToggle("buy")}
      >
        Long
      </Button>
      <Button
        color="red"
        size="small"
        fullWidth
        inactive={activeOrderSide === "buy"}
        onClick={() => handleToggle("sell")}
      >
        Short
      </Button>
    </div>
  );
};

export { PlaceOrderTypeSwitch };
