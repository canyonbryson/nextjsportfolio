// ============================================
// Tower Defense Game Data
// ============================================

export type TowerDef = {
  id: string;
  name: string;
  description: string;
  tooltip: string;
};

export type EnemyDef = {
  id: string;
  label: string;
  hitText: string;
  isBoss?: boolean;
};

// WaveDef is defined below with extended properties

// First-visit gate copy
export const firstVisitGateCopy = {
  name: "Canyon Bryson",
  loadingText: "Loading Resume... counting side projects... allocating RAM...",
  errorText: "ERROR: Candidate is too interesting. Launching games instead...",
  towerButton: "Resume Defense",
  jrpgButton: "Streetfight Interviewer",
  portfolioButton: "View Portfolio",
};


// Shared fallback copy
export const gameFallbackCopy = {
  missingWaveTitle: "Wave data missing",
  missingWaveBody: "No wave details available. Try reloading or play again.",
  missingEnemies: "No Resume items detected. Too perfect?",
  missingAttack: "The recruiter is thinking...",
  missingResponses: "No responses loaded. The candidate is speechless.",
  genericError: "Something glitched. Refresh and try again.",
};

// Intro screen copy
export const towerDefenseIntro = {
  title: "Canyon Bryson",
  subtitle: "AI Engineer • Full-Stack Developer",
  tagline: "QUALIFIED CANDIDATE DETECTED",
  startButton: "Start Defense",
};

// Placement tutorial copy
export const towerDefensePlacement = {
  wall: {
    name: "20 YOE REQUIRED WALL",
    instruction: "Click to place the 20 YOE REQUIRED wall",
    description: "Blocks entry-level talent",
  },
  gun: {
    name: "CULTURE FIT GUN",
    instruction: "Click to place the CULTURE FIT gun",
    subtext: "Fires interview questions",
    description: "Detects insufficient ping-pong enthusiasm",
  },
};

// Mission briefing copy
export const towerDefenseMission = {
  title: "MISSION BRIEFING",
  mission: "Defend your job position from the candidate's Resume",
  subtitle: "A highly qualified candidate is approaching with impressive credentials...",
  warning: "Do not let Resume items reach your defenses!",
  startButton: "BEGIN DEFENSE",
};

export const towerDefenseTowers: TowerDef[] = [
  {
    id: "wall",
    name: "20 YOE REQUIRED WALL",
    description: "Stops candidates who can ship immediately",
    tooltip: "Requires 20 years experience in a framework released in 2019.",
  },
  {
    id: "minigun",
    name: "LEETCODE MINIGUN",
    description: "Rapid-fire trivia questions",
    tooltip: "Fires: invert binary tree, reverse linked list, and explain Big-O while stressed.",
  },
  {
    id: "vaporizer",
    name: "CULTURE FIT VAPORIZER",
    description: "Auto-aims at vibe",
    tooltip: "Detects insufficient ping-pong enthusiasm and too much 'I like shipping.'",
  },
];


// Enemy (Resume item) definitions
export const towerDefenseEnemies: EnemyDef[] = [
  // Wave 1: Candidate Strengths (true + specific)
  { id: "comp-math-cs", label: "Computational Math + CS Degree", hitText: "Math? We need 'vision'." },
  { id: "ai-ml", label: "AI/ML Builder", hitText: "So... a GPT wrapper?" },
  { id: "fullstack", label: "Full-Stack Engineer", hitText: "Jack of all trades... master of shipping." },
  { id: "organized", label: "Great Pattern Recognition", hitText: "Over-engineered" },
  { id: "fast-learner", label: "Fast Learner", hitText: "Everyone says that" },
  { id: "product-sense", label: "Product-First Engineering", hitText: "Move fast without planning." },
  { id: "detail-oriented", label: "Detail-Oriented", hitText: "Too picky" },

  // Wave 2: Work Experience
  { id: "lead-eng", label: "ORTHOATHLETE Lead Engineer", hitText: "Tiny startup" },
  { id: "senior-dev", label: "Road Rally Developer", hitText: "Contract Work" },
  { id: "startup-founder", label: "AIDIA Developer", hitText: "Only Small Projects" },
  { id: "intern", label: "USU Networking Developer", hitText: "First Software Job" },
  { id: "contractor", label: "7 years of experience", hitText: "Only 6?" },
  { id: "freelance", label: "Freelancer", hitText: "No real job" },
  
  // Wave 3: Projects
  { id: "injured-mobile", label: "INJURED Mobile App (in dev)", hitText: "In development? So… imaginary." },
  { id: "injured-connect", label: "INJURED CONNECT Website (in dev)", hitText: "Not launched? I choose to feel safe." },

  { id: "orthoagent", label: "OrthoAgent Website (AI testing)", hitText: "AI testing? We prefer vibes-based QA." },
  { id: "orthodata", label: "OrthoData Website (PT/Athlete testing)", hitText: "Too niche. Probably valuable. Stop." },

  { id: "orthohcp", label: "OrthoHCP App (AI interviewer/onboarding)", hitText: "AI interviewing? That’s OUR job." },
  { id: "orthoathlete", label: "OrthoAthlete App (v1 INJURED)", hitText: "Version 1?! We only hire version 10." },
  { id: "orthopatient", label: "OrthoPatient App (too similar)", hitText: "Duplicate app detected. Still impressive. Hate that." },

  { id: "gameface", label: "Gameface AI Automation (sales grading)", hitText: "Automating sales training… suspiciously useful." },

  { id: "boat", label: "Boat Project (event-driven task manager)", hitText: "Event-driven? Sir this is a spreadsheet." },
  { id: "worm", label: "Worm Project (image recognition)", hitText: "Computer vision? We wanted CRUD." },

  { id: "pocketmonsters", label: "Pocket Monsters (Nuxt + Vue exploration)", hitText: "Nuxt + Vue? That’s cute." },
  { id: "loan-origination", label: "Loan Orignator Service (Kotlin + Kafka exploration)", hitText: "Kotlin? Too new." },

  { id: "rec-center", label: "Rec Center (season scheduling)", hitText: "Scheduling apps are deceptively hard. Don’t say that." },
  { id: "food-storage", label: "Food Storage (planning/tracking)", hitText: "Wait… a practical app? Unacceptable." },

  { id: "askdb", label: "AskDB (AI wrapper + tooling)", hitText: "‘AI wrapper’… (sweating) but with tooling??" },
  { id: "road-rally", label: "Road Rally (puzzle/riddle mobile game)", hitText: "A game? Not productive. (It’s productive.)" },

  { id: "shakespeare", label: "Shakespeare AI Model (trained from scratch)", hitText: "From scratch?? That’s illegal." },
  { id: "dex-swap", label: "DEX Swap (crypto exchange website)", hitText: "Crypto? Red flag." },
  { id: "mood-tracker", label: "Mood Tracker (cow-themed mood and habit tracker)", hitText: "Cow-themed? That’s cute." },

  { id: "useswiftcode", label: "UseSwiftCode AI (personal assistant)", hitText: "Another assistant?" },

  { id: "blog", label: "Technical Blog (old)", hitText: "Blog is old. Therefore your brain is old." },
  { id: "portfolio", label: "Online Portfolio (this website)", hitText: "Portfolio detected. Deploying cringe filter." },

  { id: "blujay", label: "BluJay Social Media (failed app)", hitText: "A failed startup? That’s called ‘experience.’" },
  { id: "chesspuzzler", label: "ChessPuzzler (built in one day)", hitText: "Built in one day?? Please stop having initiative." },
  { id: "fantastic-sudoku", label: "Fantastic Sudoku (first mobile app)", hitText: "First app? Everyone starts somewhere… unfortunately well." },
  
  // Wave 4: Final Boss
  { id: "canyon", label: "Canyon Bryson", hitText: "Nice try.", isBoss: true },
];

// Wave definitions with spawn intervals
export type WaveDef = {
  id: string;
  name: string;
  theme: string;
  enemyIds: string[];
  spawnInterval: number; // ms between spawns
  enemySpeed: number; // multiplier
};

export const towerDefenseWaves: WaveDef[] = [
  {
    id: "wave1",
    name: "WAVE 1",
    theme: "CANDIDATE STRENGTHS",
    enemyIds: [
      "comp-math-cs",
      "ai-ml",
      "fullstack",
      "organized",
      "fast-learner",
      "product-sense",
      "detail-oriented",
    ],
    spawnInterval: 1200,
    enemySpeed: 0.7,
  },
  {
    id: "wave2",
    name: "WAVE 2",
    theme: "WORK EXPERIENCE",
    enemyIds: ["lead-eng", "senior-dev", "startup-founder", "intern", "contractor", "freelance"],
    spawnInterval: 1000,
    enemySpeed: 0.9,
  },
  {
    id: "wave3",
    name: "WAVE 3",
    theme: "PROJECT PORTFOLIO",
    enemyIds: [
      "injured-mobile",
      "injured-connect",
      "orthoagent",
      "orthodata",
      "orthohcp",
      "orthoathlete",
      "orthopatient",
      "gameface",
      "boat",
      "worm",
      "pocketmonsters",
      "loan-origination",
      "rec-center",
      "food-storage",
      "askdb",
      "road-rally",
      "shakespeare",
      "dex-swap",
      "mood-tracker",
      "useswiftcode",
      "blog",
      "portfolio",
      "blujay",
      "chesspuzzler",
      "fantastic-sudoku",
    ],
    spawnInterval: 400,
    enemySpeed: 1.2,
  },
  {
    id: "wave4",
    name: "FINAL WAVE",
    theme: "THE CANDIDATE",
    enemyIds: ["canyon"],
    spawnInterval: 0,
    enemySpeed: 0.8,
  },
];

// Recruiter panic lines (shown as waves progress)
export const towerDefensePanicLines = [
  "This is fine.",
  "WAIT WAIT WAIT—why are there so many projects?",
  "We can be flexible on years of experience…",
  "Do you… like ping-pong? Please say yes.",
  "Let’s circle back (immediately).",
  "What salary were you thinking?",
  "Okay, okay—hybrid is an option!",
];

// Defeat screen copy
export const towerDefenseDefeat = {
  title: "DEFENSE FAILED",
  subtitle: "Candidate Too Powerful",
  ctas: [
    { id: "portfolio", label: "View Portfolio", href: "/" },
    { id: "jrpg", label: "Play JRPG", href: "/games/jrpg" },
    { id: "hire", label: "Hire Developer", href: "/" },
  ],
  hirePopup: {
    title: "Oops!",
    body: "You just hired me. No takebacks.",
    dismiss: "Worth it",
  },
};

// ============================================
// JRPG Boss Fight Game Data
// ============================================

// Scripted conversation type
export type JrpgConversation = {
  id: string;
  recruiterLine: string;
  candidateResponse: string;
  recruiterCounter: string;
  damageToCandidate: number;
};

// Intro screen copy
export const jrpgIntroScreen = {
  title: "INTERVIEW BOSS FIGHT",
  description: [
    "You are the recruiter.",
    "Your job is to reject this candidate using classic interview tactics.",
    "",
    "But beware... this candidate fights back.",
  ],
  startButton: "BEGIN INTERVIEW",
};

// Fighter stats
export const jrpgIntro = {
  recruiter: {
    name: "Recruiter",
    hp: 100,
  },
  candidate: {
    name: "Canyon Bryson",
    hp: 100,
    title: "AI Engineer • Full-Stack Dev",
  },
};

// Scripted conversations (5 rounds)
export const jrpgConversations: JrpgConversation[] = [
  {
    id: "tell-me",
    recruiterLine: "Tell me about yourself.",
    candidateResponse: "I'm really funny.",
    recruiterCounter: "Looks aren't everything.",
    damageToCandidate: 20,
  },
  {
    id: "salary",
    recruiterLine: "What are your salary expectations?",
    candidateResponse: "The top end of your range.",
    recruiterCounter: "Minimum wage it is.",
    damageToCandidate: 20,
  },
  {
    id: "processes",
    recruiterLine: "We have strong processes.",
    candidateResponse: "What's your workflow?",
    recruiterCounter: "Slack. Mostly panic.",
    damageToCandidate: 20,
  },
  {
    id: "family",
    recruiterLine: "We're like a family.",
    candidateResponse: "Awesome - healthy boundaries?",
    recruiterCounter: "No, like... the other kind.",
    damageToCandidate: 20,
  },
  {
    id: "fast-paced",
    recruiterLine: "We're fast-paced - can you handle that?",
    candidateResponse: "How do you prioritize?",
    recruiterCounter: "We don't - everything is urgent.",
    damageToCandidate: 19, // Total: 99 damage, leaving 1 HP
  },
];

// Final blow sequence
export const jrpgFinalBlow = {
  buttonText: "End the interview",
  recruiterLine: "Oh, looks like we just filled the position.",
  candidateResponse: "I hacked your software and hired myself.",
  damageToRecruiter: 50, // Instant KO
};

// Victory popup
export const jrpgVictory = {
  title: "YOU DIED",
  subtitle: "Cause of death:",
  reason: "Candidate too good at programming",
  ctas: [
    { id: "hire", label: "Hire Developer", href: "/" },
    { id: "retry", label: "Try Again", href: "/games/jrpg" },
    { id: "portfolio", label: "View Portfolio", href: "/" },
  ],
};
