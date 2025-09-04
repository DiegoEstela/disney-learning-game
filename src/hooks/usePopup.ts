import { useContext } from "react";
import { PopupContext } from "../context/PopupProvider";

export function usePopup() {
  const context = useContext(PopupContext);
  if (!context) throw new Error("usePopup debe usarse dentro de PopupProvider");
  return context;
}
