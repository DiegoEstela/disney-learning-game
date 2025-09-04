import { useEffect, useState } from "react";

type DeviceType = "web" | "ios" | "android";

export function useDevice() {
  const [device, setDevice] = useState<DeviceType>("web");

  useEffect(() => {
    const ua = navigator.userAgent;

    if (/android/i.test(ua)) {
      setDevice("android");
    } else if (/iPad|iPhone|iPod/.test(ua)) {
      setDevice("ios");
    } else {
      setDevice("web");
    }
  }, []);

  return device;
}
