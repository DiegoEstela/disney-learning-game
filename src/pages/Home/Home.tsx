import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, type User } from "firebase/auth";

import { ROUTES } from "../../constants";
import { auth } from "../../services/firebase";
import { getUserProfile } from "../../services/userService";

import practiceIcon from "../../assets/icons/practice.png";
import storyIcon from "../../assets/icons/story.png";
import battleIcon from "../../assets/icons/battle.png";
import type { UserProfile } from "../../types";

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);

        const userProfile = await getUserProfile(firebaseUser.uid);

        if (!userProfile) {
          navigate("/setup-user");
        } else {
          setProfile(userProfile);
        }
      } else {
        navigate(ROUTES.LOGIN);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (!user) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-600">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 bg-background relative">
      {/* Perfil arriba a la derecha */}
      <div className="absolute top-4 right-4">
        <Link to={ROUTES.PROFILE}>
          {profile?.avatar ? (
            <img
              src={profile.avatar}
              alt="Perfil"
              className="w-14 h-14 rounded-full border-2 border-primary object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full border-2 border-primary bg-gray-200" />
          )}
        </Link>
      </div>

      {/* Botones modos de juego */}
      <div className="flex flex-col items-center space-y-8 mt-16">
        {/* Práctica */}
        <Link to={ROUTES.PRACTICE} className="flex flex-col items-center group">
          <div className="w-32 h-32 rounded-full border-4 border-primary overflow-hidden shadow-lg group-hover:scale-105 transition">
            <img
              src={practiceIcon}
              alt="Práctica"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="mt-2 font-semibold text-primary text-lg">
            Práctica
          </span>
        </Link>

        {/* Historia (deshabilitado) */}
        <div className="flex flex-col items-center opacity-50 cursor-not-allowed">
          <div className="w-32 h-32 rounded-full border-4 border-gray-400 overflow-hidden shadow-lg">
            <img
              src={storyIcon}
              alt="Historia"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="mt-2 font-semibold text-gray-500 text-lg">
            Historia <span className="text-sm italic">(Próximamente)</span>
          </span>
        </div>

        {/* Batalla (deshabilitado) */}
        <div className="flex flex-col items-center opacity-50 cursor-not-allowed">
          <div className="w-32 h-32 rounded-full border-4 border-gray-400 overflow-hidden shadow-lg">
            <img
              src={battleIcon}
              alt="Batalla"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="mt-2 font-semibold text-gray-500 text-lg">
            Batalla <span className="text-sm italic">(Próximamente)</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Home;
