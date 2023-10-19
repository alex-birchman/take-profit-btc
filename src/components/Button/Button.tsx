import React from "react";
import { Button as MUIButton, ButtonProps } from "@material-ui/core";
import cn from "classnames";

import styles from "./Button.module.scss";

type Props = Omit<ButtonProps, "color" | "size" | ""> & {
  color: "green" | "red";
  size?: "small" | "normal";
  inactive?: boolean;
};

const Button: React.FC<Props> = ({
  children,
  color,
  size = "normal",
  inactive = false,
  className,
  variant,
  disabled,
  ...rest
}) => (
  <MUIButton
    disableRipple
    className={cn(
      styles.root,
      styles[color],
      styles[size],
      className,
      variant && styles[variant],
      {
        [styles.inactive]: inactive,
        [styles.disabled]: disabled,
      }
    )}
    {...rest}
  >
    {children}
  </MUIButton>
);

export { Button };
