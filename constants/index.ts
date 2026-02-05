import { SidebarLink } from "@/types";

export const themes = [
  { value: "light", label: "Light", icon: "/assets/icons/sun.svg" },
  { value: "dark", label: "Dark", icon: "/assets/icons/moon.svg" },
  { value: "system", label: "System", icon: "/assets/icons/computer.svg" },
];

export const primaryLinks: SidebarLink[] = [
  {
    route: "/",
    label: "Home",
  },
  {
    route: "/projects",
    label: "Projects",
  },
  {
    route: "/about",
    label: "About",
  },
  {
    route: "/resume",
    label: "Resume",
  },
];

export const gameLinks: SidebarLink[] = [
  {
    route: "/games/tower",
    label: "Tower Defense",
  },
  {
    route: "/games/jrpg",
    label: "JRPG Boss Fight",
  },
];

export const sidebarLinks: SidebarLink[] = [...primaryLinks, ...gameLinks];

export const proofChips = [
  "7 years experience",
  "Computational math + CS degree",
  "Lead Engineer at ORTHOATHLETE",
  "OrthoHCP shipped in 30 days",
];

export const socialLinks = {
  github: "https://github.com/canyonbryson",
  linkedin: "https://www.linkedin.com/in/canyon-bryson-025815250/",
  email: "mailto:canyonbryson@gmail.com",
};

// Legacy - kept for any remaining imports
export const BADGE_CRITERIA = {};
