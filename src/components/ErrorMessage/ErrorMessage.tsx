import React from "react";
import cn from "classnames";

import styles from "./ErrorMessage.module.scss";

type ErrorMessageProps = {
  children: string;
  className?: string;
};

const ErrorMessage = ({ children, className }: ErrorMessageProps) => {
  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.message}>{children}</div>
    </div>
  );
};

export { ErrorMessage };
