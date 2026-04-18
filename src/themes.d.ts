import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    primary: object;
    secondary: object;
    tertiary: object;
    sizes: {
      small: {
        padding: string;
        fontSize: string;
      };
      medium: {
        padding: string;
        fontSize: string;
      };
      large: {
        padding: string;
        fontSize: string;
      };
    };
    spacing: (rem: number) => string;
    palette: object;
  }
}
