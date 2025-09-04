import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import type { UserProfile } from "../types";

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    const docRef = doc(db, "users", uid);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      const data = snapshot.data();

      return {
        name: data.name ?? "",
        favoriteMovie: data.favoriteMovie ?? "",
        avatar: typeof data.avatar === "string" ? data.avatar : null,
      };
    }
    return null;
  } catch (error) {
    console.error("Error obteniendo perfil:", error);
    return null;
  }
}
