import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
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
    palette: {
      primary: object;
      secondary: object;
      tertiary: object;
      neutral: object;
      semantic: object;
      background: object;
      text: object;
    };
  }
}
