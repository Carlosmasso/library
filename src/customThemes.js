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
  dark: '#004186ff',
  main: '#007bff',
  light: '#75b8ffff',
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

// -----------------------------------------------------

const primaryDark = {
  dark: '#005bb5',
  main: '#00ccff', // El dark del light pasa a ser el main aquí
  light: '#33d6ff',
  text: '#ffffff',
}

const secondaryDark = {
  dark: '#5a0000',
  main: '#ff4d4d',
  light: '#ff8080',
  text: '#ffffff',
}

const tertiaryDark = {
  dark: '#004d07',
  main: '#00ff15',
  light: '#66ff73',
  text: '#000000', // El verde neón suele leerse mejor con texto oscuro
}

const paletteDark = {
  blue: {
    main: '#072c33',
    light: '#0c5460',
    dark: '#d1ecf1',
    text: '#bee5eb',
    border: '#0c5460',
  },
  green: {
    main: '#0b2d13',
    light: '#155724',
    dark: '#d4edda',
    text: '#c3e6cb',
    border: '#155724',
  },
  orange: {
    main: '#3d2e02',
    light: '#856404',
    dark: '#fff3cd',
    text: '#ffeeba',
    border: '#856404',
  },
  red: {
    main: '#3b0f13',
    light: '#721c24',
    dark: '#f8d7da',
    text: '#f5c6cb',
    border: '#721c24',
  },
}

export const darkTheme = {
  primary: primaryDark,
  secondary: secondaryDark,
  tertiary: tertiaryDark,
  palette: paletteDark,
  sizes, // Se mantienen iguales
  spacing: (rem) => `${rem * 12}px`, // Se mantiene igual
};
