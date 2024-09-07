import { SidebarLink } from "@/types";

export const themes = [
  { value: "light", label: "Light", icon: "/assets/icons/sun.svg" },
  { value: "dark", label: "Dark", icon: "/assets/icons/moon.svg" },
  { value: "system", label: "System", icon: "/assets/icons/computer.svg" },
];

export const sidebarLinks: SidebarLink[] = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/assets/icons/projects.svg",
    route: "/projects",
    label: "Projects",
    width: 25,
    height: 25,
  },
  {
    imgURL: "/assets/icons/suitcase.svg",
    route: "/experience",
    label: "Experience",
  },
  {
    imgURL: "/assets/icons/tag.svg",
    route: "/skills",
    label: "Skills",
  },
  {
    imgURL: "/assets/icons/education.svg",
    route: "/education",
    label: "Education",
    width: 20,
    height: 20,
  },
  {
    imgURL: "/assets/icons/user.svg",
    route: "/about",
    label: "About",
    width: 20,
    height: 20,
  },
  {
    imgURL: "/assets/icons/message.svg",
    route: "/contact",
    label: "Message Me",
    width: 20,
    height: 20,
  },
];

export const BADGE_CRITERIA = {
  QUESTION_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  QUESTION_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  TOTAL_VIEWS: {
    BRONZE: 1000,
    SILVER: 10000,
    GOLD: 100000,
  },
};
