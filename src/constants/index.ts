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
