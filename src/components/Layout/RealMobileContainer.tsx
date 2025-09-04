import type { ReactNode } from "react";
import { useDevice } from "../../hooks/useDevice";

type Props = {
  readonly children: ReactNode;
};

function RealMobileContainer({ children }: Props) {
  const device = useDevice();

  return (
    <div
      className="min-h-screen w-screen flex flex-col bg-gray-100 text-black overflow-hidden"
      style={{
        height: "100dvh",
      }}
    >
      {/* Header */}
      <header
        className={`bg-gradient-to-r from-sky-500 to-blue-600 text-white text-center pt-6 pb-4 shadow-md z-10
          ${device === "ios" ? "pt-10" : "pt-6"} 
        `}
      >
        <h1 className="text-lg font-bold tracking-wide drop-shadow-sm">
          ✨ Disney Game{" "}
          <span className="font-light">
            by FarestLab {device !== "web" && `(${device})`}
          </span>
        </h1>
      </header>

      {/* Contenido */}
      <main className="flex-1 overflow-y-auto px-4">{children}</main>
    </div>
  );
}

export default RealMobileContainer;
