import React, { ReactNode } from "react";
import { TooltipProps } from "@material-ui/core";

import { Tooltip } from "../Tooltip/Tooltip";
import { InfoIcon } from "../../icons/InfoIcon/InfoIcon";
import styles from "./QuestionTooltip.module.scss";

type Props = {
  message: ReactNode;
  dataTest?: string;
  placement?: TooltipProps["placement"];
  title?: ReactNode;
  wide?: boolean;
};

function QuestionTooltip({ dataTest, message, placement, title }: Props) {
  return (
    <Tooltip message={message} placement={placement}>
      <div className={styles.tooltipIconWrapper}>
        <InfoIcon />
      </div>
    </Tooltip>
  );
}

export { QuestionTooltip };
export type { Props as QuestionTooltipProps };
