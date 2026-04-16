// src/themes.js

const sizes = {
  small: {
      padding: "10px 16px",
      fontSize: "12px",
  },
  medium: {
      padding: "12px 20px",
      fontSize: "14px",
  },
  large: {
      padding: "14px 24px",
      fontSize: "16px",
  },
}

const primary = {
  dark: '#00ccff',
  main: '#007bff',
  light: '#007bff',
  text: '#ffffff',
}

const secondary = {
  dark: '#8c0000ff',
  main: '#d30000ff',
  light: '#ffa1a1ff',
  text: '#ffffff',
}

const tertiary = {
  dark: '#00720aff',
  main: '#00ff15ff',
  light: '#9affa2ff',
  text: '#ffffff',
}
export const lightTheme = {
  primary,
  secondary,
  tertiary,
  sizes,
  spacing: (rem) => `${rem * 12}px`,
};

export const darkTheme = {
  primary,
  secondary,
  tertiary,
  sizes,
  spacing: (rem) => `${rem * 12}px`,
};
