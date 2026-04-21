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
};

const primary = {
  dark: "#004186ff",
  main: "#007bff",
  light: "#75b8ffff",
  text: "#ffffff",
};

const secondary = {
  dark: "#8c0000ff",
  main: "#d30000ff",
  light: "#ffa1a1ff",
  text: "#ffffff",
};

const tertiary = {
  dark: "#00720aff",
  main: "#00ff15ff",
  light: "#9affa2ff",
  text: "#ffffff",
};

const palette = {
  blue: {
    main: "#d1ecf1",
    light: "#bee5eb",
    dark: "#0c5460",
    text: "#0c5460",
    border: "#bee5eb",
  },
  green: {
    main: "#d4edda",
    light: "#c3e6cb",
    dark: "#155724",
    text: "#155724",
    border: "#c3e6cb",
  },
  orange: {
    main: "#fff3cd",
    light: "#ffeeba",
    dark: "#856404",
    text: "#856404",
    border: "#ffeeba",
  },
  red: {
    main: "#f8d7da",
    light: "#f5c6cb",
    dark: "#721c24",
    text: "#721c24",
    border: "#f5c6cb",
  },
};

export const lightTheme = {
  primary,
  secondary,
  tertiary,
  palette,
  sizes,
  spacing: (rem) => `${rem * 12}px`,
  colors: {
    primary: {
      50: "#eef2ff",
      100: "#e0e7ff",
      200: "#c7d2fe",
      300: "#a5b4fc",
      400: "#818cf8",
      500: "#6366f1",
      600: "#4f46e5",
      700: "#4338ca",
      800: "#3730a3",
      900: "#312e81",
    },
    secondary: {
      50: "#ecfdf5",
      100: "#d1fae5",
      200: "#a7f3d0",
      300: "#6ee7b7",
      400: "#34d399",
      500: "#10b981",
      600: "#059669",
      700: "#047857",
      800: "#065f46",
      900: "#064e3b",
    },
    neutral: {
      0: "#ffffff",
      100: "#f5f5f5",
      300: "#d4d4d4",
      500: "#737373",
      700: "#404040",
      900: "#171717",
    },
    semantic: {
      success: "#22c55e",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#3b82f6",
    },
    background: {
      default: "#ffffff",
      subtle: "#f9fafb",
      inverse: "#111827",
    },
    text: {
      primary: "#111827",
      secondary: "#6b7280",
      inverse: "#ffffff",
    },
  },
  typography: {
    fontFamily: {
      base: `'Inter', sans-serif`,
      heading: `'Inter', sans-serif`,
      mono: `'Fira Code', monospace`,
    },
    fontSize: {
      xs: "12px",
      sm: "14px",
      md: "16px",
      lg: "18px",
      xl: "20px",
      "2xl": "24px",
      "3xl": "30px",
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
    lineHeight: {
      normal: 1.5,
      heading: 1.2,
    },
  },

  borderRadius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    full: "9999px",
  },

  shadows: {
    sm: "0 1px 2px rgba(0,0,0,0.1)",
    md: "0 4px 6px rgba(0,0,0,0.15)",
    lg: "0 10px 15px rgba(0,0,0,0.2)",
  },

  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },

  zIndex: {
    dropdown: 1000,
    modal: 1100,
    tooltip: 1200,
  },
};

// -----------------------------------------------------

const primaryDark = {
  dark: "#005bb5",
  main: "#00ccff", // El dark del light pasa a ser el main aquí
  light: "#33d6ff",
  text: "#ffffff",
};

const secondaryDark = {
  dark: "#5a0000",
  main: "#ff4d4d",
  light: "#ff8080",
  text: "#ffffff",
};

const tertiaryDark = {
  dark: "#004d07",
  main: "#00ff15",
  light: "#66ff73",
  text: "#000000", // El verde neón suele leerse mejor con texto oscuro
};

const paletteDark = {
  blue: {
    main: "#072c33",
    light: "#0c5460",
    dark: "#d1ecf1",
    text: "#bee5eb",
    border: "#0c5460",
  },
  green: {
    main: "#0b2d13",
    light: "#155724",
    dark: "#d4edda",
    text: "#c3e6cb",
    border: "#155724",
  },
  orange: {
    main: "#3d2e02",
    light: "#856404",
    dark: "#fff3cd",
    text: "#ffeeba",
    border: "#856404",
  },
  red: {
    main: "#3b0f13",
    light: "#721c24",
    dark: "#f8d7da",
    text: "#f5c6cb",
    border: "#721c24",
  },
};

export const darkTheme = {
  primary: primaryDark,
  secondary: secondaryDark,
  tertiary: tertiaryDark,
  palette: paletteDark,
  sizes, // Se mantienen iguales
  spacing: (rem) => `${rem * 12}px`, // Se mantiene igual
};
