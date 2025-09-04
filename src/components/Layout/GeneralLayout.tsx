import type { ReactNode } from "react";
import MobileContainer from "./MobileContainer";
import RealMobileContainer from "./RealMobileContainer";
import { useDevice } from "../../hooks/useDevice";

type Props = {
  readonly children: ReactNode;
};

function GeneralLayout({ children }: Props) {
  const device = useDevice();

  if (device === "ios" || device === "android") {
    return <RealMobileContainer>{children}</RealMobileContainer>;
  }

  return <MobileContainer>{children}</MobileContainer>;
}

export default GeneralLayout;
