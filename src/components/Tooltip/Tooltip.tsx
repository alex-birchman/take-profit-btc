import React from "react";
import { Tooltip as MUITooltip, TooltipProps } from "@material-ui/core";

import styles from "./Tooltip.module.scss";

type Props = {
  message: React.ReactNode;
  children: TooltipProps["children"];
  open?: boolean;
  placement?: TooltipProps["placement"];
  interactive?: boolean;
  disableHoverListener?: boolean;
  disableTouchListener?: boolean;
  onClose?(): void;
};

function Tooltip({
  children,
  message,
  placement = "bottom",
  open,
  interactive,
  disableHoverListener,
  disableTouchListener,
  onClose
}: Props) {
  return (
    <MUITooltip
      title={<>{message}</>}
      classes={{
        tooltip: styles.root,
        arrow: styles.arrow,
        popper: styles.popper
      }}
      placement={placement}
      open={open}
      arrow
      disableFocusListener // onFocus and onBlur do not work if using a Tooltip with TextField https://github.com/mui-org/material-ui/issues/19883#issuecomment-592980194
      interactive={interactive}
      disableHoverListener={disableHoverListener}
      disableTouchListener={disableTouchListener}
      onClose={onClose}
    >
      {children}
    </MUITooltip>
  );
}

export { Tooltip };
