import type { ReactNode } from "react";

type Props = {
  readonly children: ReactNode;
};

function MobileContainer({ children }: Props) {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-300">
      {/* Marco del móvil */}
      <div className="relative w-[390px] h-[calc(100vh-40px)] bg-white rounded-[2.5rem] shadow-2xl border-8 border-black overflow-hidden flex flex-col">
        {/* Notch superior */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-black rounded-b-2xl z-20"></div>

        {/* Header */}
        <header className="bg-gradient-to-r from-sky-500 to-blue-600 text-white text-center pt-6 pb-4 shadow-md z-10">
          <h1 className="text-lg font-bold tracking-wide drop-shadow-sm">
            ✨ Disney Game <span className="font-light">by FarestLab</span>
          </h1>
        </header>

        {/* Contenido */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

export default MobileContainer;
