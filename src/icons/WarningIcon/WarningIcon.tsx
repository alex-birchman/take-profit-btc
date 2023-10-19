import React from "react";
import { SvgIcon } from "@material-ui/core";
import cn from "classnames";

import styles from "./WarningIcon.module.scss";

type Props = {
  className?: string;
};

function WarningIcon({ className }: Props) {
  return (
    <SvgIcon
      width={16}
      height={16}
      className={cn(className, styles.root)}
      viewBox="0 0 16 16"
    >
      <path
        opacity="0.3"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z"
        className={styles.circle}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.19947 5.19947C4.93351 5.46543 4.93351 5.89664 5.19947 6.16259L7.12581 8.08894L5.19954 10.0152C4.93358 10.2812 4.93358 10.7124 5.19954 10.9783C5.4655 11.2443 5.89671 11.2443 6.16267 10.9783L8.08894 9.05206L10.0151 10.9782C10.2811 11.2442 10.7123 11.2442 10.9782 10.9782C11.2442 10.7123 11.2442 10.2811 10.9782 10.0151L9.05206 8.08894L10.9783 6.16271C11.2443 5.89675 11.2443 5.46554 10.9783 5.19958C10.7123 4.93362 10.2811 4.93362 10.0152 5.19958L8.08894 7.12581L6.16259 5.19947C5.89663 4.93351 5.46543 4.93351 5.19947 5.19947Z"
        className={styles.char}
      />
    </SvgIcon>
  );
}

export { WarningIcon };
