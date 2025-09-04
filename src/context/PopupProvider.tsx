import {
  createContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import DisneyPopup from "../components/Popup/DisneyPopup";

type PopupContextType = {
  showPopup: (message: string) => void;
};

const PopupContext = createContext<PopupContextType | undefined>(undefined);

type Props = {
  readonly children: ReactNode;
};

export function PopupProvider({ children }: Props) {
  const [popupMessage, setPopupMessage] = useState<string | null>(null);

  // ✅ useCallback evita recrear la función en cada render
  const showPopup = useCallback((message: string) => {
    setPopupMessage(message);
    setTimeout(() => setPopupMessage(null), 3000);
  }, []);

  const value = useMemo(
    () => ({
      showPopup,
    }),
    [showPopup]
  );

  return (
    <PopupContext.Provider value={value}>
      {children}
      {popupMessage && <DisneyPopup message={popupMessage} />}
    </PopupContext.Provider>
  );
}

export { PopupContext };
