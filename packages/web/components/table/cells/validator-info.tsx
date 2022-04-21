import { FunctionComponent } from "react";
import { ValidatorInfo } from "./types";

export const ValidatorInfoCell: FunctionComponent<ValidatorInfo> = ({
  value,
  imgSrc,
}) => (
  <div className="flex items-center gap-2 md:gap-3">
    <div className="rounded-full border border-enabledGold w-9 h-9 p-1 flex shrink-0">
      <img // don't use next/image because we may not know what origin the image is on, next.config.js requires listed origins
        className="rounded-full"
        alt="validator image"
        src={imgSrc ?? "/icons/profile.svg"}
      />
    </div>
    <span>{value ?? ""}</span>
  </div>
);
