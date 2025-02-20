import React from 'react';

export const enum Breakpoint {
  MOBILE = 'mobile',
  // MOBILE_LANDSCAPE = 'mobile-landscape',
  TABLET = 'tablet',
  // TABLET_LANDSCAPE = 'tablet-landscape',
  // LAPTOP = 'laptop',
  DESKTOP = 'desktop',
  // WIDESCREEN = 'widescreen',
}

export type ResponsiveValue<T = string> = {
  [key in Breakpoint]?: T;
};

export type BreakpointConfig = {
  key: Breakpoint;
  label: string;
  icon: React.ReactNode;
  previewWidth: number;
  maxWidth: number;
  minWidth: number;
};
