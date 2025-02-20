import { BreakpointConfiguration } from "@/config/breakpoints.config";
import { Breakpoint } from "@/types/responsive";
import { useEffect, useState } from "react";

export const useBreakpoint = () => {
  const actualWindow = window.frameWindow ?? window;
  const width =
    actualWindow.innerWidth ||
    actualWindow.document.documentElement.clientWidth ||
    actualWindow.document.body.clientWidth;

  const [calculatedBreakpoint, setCalculatedBreakpoint] = useState<Breakpoint>(
    () => {
      if (typeof actualWindow === "undefined") return Breakpoint.DESKTOP;

      if (
        width <
        BreakpointConfiguration.getBreakpoint(Breakpoint.TABLET).minWidth
      ) {
        return Breakpoint.MOBILE;
      } else if (
        width <
        BreakpointConfiguration.getBreakpoint(Breakpoint.DESKTOP).minWidth
      ) {
        return Breakpoint.TABLET;
      }

      return Breakpoint.DESKTOP;
    }
  );

  useEffect(() => {
    const handleResize = () => {
      if (
        width <
        BreakpointConfiguration.getBreakpoint(Breakpoint.TABLET).minWidth
      ) {
        setCalculatedBreakpoint(Breakpoint.MOBILE);
      } else if (
        width <
        BreakpointConfiguration.getBreakpoint(Breakpoint.DESKTOP).minWidth
      ) {
        setCalculatedBreakpoint(Breakpoint.TABLET);
      } else {
        setCalculatedBreakpoint(Breakpoint.DESKTOP);
      }
    };

    actualWindow.addEventListener("resize", handleResize);

    return () => {
      actualWindow.removeEventListener("resize", handleResize);
    };
  }, [actualWindow, width]);

  return calculatedBreakpoint;
};
