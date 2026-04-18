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

const palette = {
  blue: {
    main: '#d1ecf1',
    light: '#bee5eb',
    dark: '#0c5460',
    text: '#0c5460',
    border: '#bee5eb',
  },
  green: {
    main: '#d4edda',
    light: '#c3e6cb',
    dark: '#155724',
    text: '#155724',
    border: '#c3e6cb',
  },
  orange: {
    main: '#fff3cd',
    light: '#ffeeba',
    dark: '#856404',
    text: '#856404',
    border: '#ffeeba',
  },
  red: {
    main: '#f8d7da',
    light: '#f5c6cb',
    dark: '#721c24',
    text: '#721c24',
    border: '#f5c6cb',
  },
}

export const lightTheme = {
  primary,
  secondary,
  tertiary,
  palette,
  sizes,
  spacing: (rem) => `${rem * 12}px`,
};

export const darkTheme = {
  primary,
  secondary,
  tertiary,
  palette,
  sizes,
  spacing: (rem) => `${rem * 12}px`,
};
