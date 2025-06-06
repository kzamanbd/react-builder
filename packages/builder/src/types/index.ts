export * from './block'
export * from './responsive'
export * from './style'
export * from './theme'

export type AnyObject = Record<string, unknown>;

export type OptionalKeys<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

export type RequiredKeys<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;

export const enum Position {
  TOP = "top",
  RIGHT = "right",
  BOTTOM = "bottom",
  LEFT = "left",
  START = "start",
  END = "end",
  CENTER = "center",
}

export const enum Direction {
  HORIZONTAL = "horizontal",
  VERTICAL = "vertical",
}

export type SelectOption = {
  label: string;
  value: string;
};

export type LinkType = {
  url?: string;
  newWindow?: boolean;
  nofollow?: boolean;
  attributers?: string;
};

export type IconType = {
  iconSet: string;
  iconName: string;
};

export const enum SettingsType {
  BLOCK = "block",
  ADVANCED = "advanced",
  THEME = "theme",
}

export const enum ThemeSettingsType {
  GLOBAL = "global",
  LAYOUT = "layout",
  COLOR = "color",
  TYPOGRAPHY = "typography",
  BUTTON = "button",
  LINK = "link",
  CUSTOM_CSS = "custom-css",
}

export enum BuilderResourceType {
  PAGE = "page",
  TEMPLATE = "template",
  TEMPLATE_PART = "template-part",
}

export type BuilderResource = {
  id: string;
  name: string;
  type: BuilderResourceType;
};

export type LocalizedValue<T = string> = {
  [key: string]: T;
};
