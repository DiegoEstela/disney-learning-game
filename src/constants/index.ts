export const MODES = [
  { id: "practice", label: "📝 Práctica", path: "/practice" },
  { id: "story", label: "📚 Historia", path: "/story" },
  { id: "battle", label: "⚔️ Batalla", path: "/battle" },
  { id: "profile", label: "👤 Perfil", path: "/profile" },
] as const;

export const ROUTES = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  USER_SETUP: "/setup-user",
  HOME: "/home",
  PRACTICE: "/practice",
  STORY: "/story",
  BATTLE: "/battle",
  PROFILE: "/profile",
} as const;

export const ALL_RELATIONS = [
  "pareja",
  "amigos",
  "hermanos",
  "aliados",
  "enemigos",
  "mentor y aprendiz",
  "secuaces",
] as const;

export const COLORS = [
  "bg-orange-400",
  "bg-sky-400",
  "bg-violet-400",
  "bg-yellow-400",
];
