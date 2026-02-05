"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { firstVisitGateCopy } from "@/constants/games";

const FIRST_VISIT_KEY = "hasVisited";

type Phase = "loading" | "error";

const FirstVisitGate = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);
  const [showGate, setShowGate] = useState(false);
  const [phase, setPhase] = useState<Phase>("loading");

  useEffect(() => {
    if (pathname !== "/") {
      setShowGate(false);
      setIsReady(true);
      return;
    }

    const hasVisited = (localStorage.getItem(FIRST_VISIT_KEY) === "true");
    setShowGate(!hasVisited);
    setIsReady(true);
  }, [pathname]);

  // Switch to error phase after 2 seconds
  useEffect(() => {
    if (!showGate) return;

    const timer = setTimeout(() => {
      setPhase("error");
    }, 2000);

    return () => clearTimeout(timer);
  }, [showGate]);

  const dismissGate = () => {
    localStorage.setItem(FIRST_VISIT_KEY, "true");
    setShowGate(false);
  };

  const handleRoute = (route: string) => {
    dismissGate();
    router.push(route);
  };

  if (!isReady || !showGate) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-gray-950 text-white">
      {phase === "loading" ? (
        // Loading phase: name + spinner + loading text
        <div className="flex flex-col items-center space-y-8">
          <h1 className="text-5xl font-bold sm:text-7xl">
            {firstVisitGateCopy.name}
          </h1>
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-600 border-t-white" />
          <p className="text-lg text-gray-400">
            {firstVisitGateCopy.loadingText}
          </p>
        </div>
      ) : (
        // Error phase: name + error text + game buttons
        <div className="flex flex-col items-center space-y-8 px-6">
          <h1 className="text-5xl font-bold sm:text-7xl">
            {firstVisitGateCopy.name}
          </h1>
          <p className="text-xl text-red-400 sm:text-2xl">
            {firstVisitGateCopy.errorText}
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <button
              className="btn-primary px-8 py-4 text-lg"
              onClick={() => handleRoute("/games/tower")}
            >
              {firstVisitGateCopy.towerButton}
            </button>
            <button
              className="btn-primary px-8 py-4 text-lg"
              onClick={() => handleRoute("/games/jrpg")}
            >
              {firstVisitGateCopy.jrpgButton}
            </button>
          </div>

          <button
            className="text-sm text-gray-400 underline-offset-4 transition hover:text-white hover:underline"
            onClick={dismissGate}
          >
            {firstVisitGateCopy.portfolioButton}
          </button>
        </div>
      )}
    </div>
  );
};

export default FirstVisitGate;
