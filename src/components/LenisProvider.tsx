"use client";

import Lenis from "@studio-freight/lenis";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const LenisContext = createContext<{
  lenis: Lenis | null;
}>({
  lenis: null,
});

export const useLenis = () => {
  const lenis = useContext(LenisContext);
  if (!lenis) {
    throw new Error("useLenis must be used within a LenisProvider");
  }
  return lenis;
};

export const LenisProvider = ({ children }: { children: ReactNode }) => {
  let [lenis, setLenis] = useState<Lenis | null>(null);
  useEffect(() => {
    const localLenis = new Lenis();
    setLenis(localLenis);
    function raf(time: DOMHighResTimeStamp) {
      localLenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);
  return (
    <LenisContext.Provider value={{ lenis }}>{children}</LenisContext.Provider>
  );
};
