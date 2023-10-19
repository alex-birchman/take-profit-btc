import React from "react";
import {
  IconButton as MUIIconButton,
  IconButtonProps as MUIIconButtonProps,
} from "@material-ui/core";

import styles from "./IconButton.module.scss";

type Props = MUIIconButtonProps & {
  children: React.ReactNode;
};

const IconButton = ({ children, ...rest }: Props) => {
  return (
    <MUIIconButton disableRipple className={styles.root} {...rest}>
      {children}
    </MUIIconButton>
  );
};

export { IconButton };
export type { Props as IconButtonProps };
