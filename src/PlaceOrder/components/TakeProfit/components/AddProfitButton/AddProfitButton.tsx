import React from "react";

import { TextButton } from "components";
import { PlusCircleIcon } from "icons/PlusCircleIcon/PlusCircleIcon";

type Props = {
  onClick?: () => void;
  className?: string;
  settedProfitNumber: number;
  maxProfitTargets: number;
};

const AddProfitButton = ({
  onClick,
  className,
  settedProfitNumber,
  maxProfitTargets,
}: Props) => {
  return (
    <TextButton
      disableRipple
      startIcon={<PlusCircleIcon />}
      onClick={onClick}
      className={className}
    >
      Add profit target {settedProfitNumber}/{maxProfitTargets}
    </TextButton>
  );
};

export { AddProfitButton };
