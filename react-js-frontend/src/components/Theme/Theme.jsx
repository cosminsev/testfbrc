import { ThemeProvider } from 'styled-components'

export const theme = {
  colors: {
    primaryRed: '#E60100',
    primaryBlue: '#29578A',
    primaryBlack: '#121212',

    stateError: '#E94141',
    stateWarning: '#E9A641',
    stateSuccess: '#49C464',
    secondaryBlue: '#395264',
    secondaryBlueMedium: '#617B8E',
    secondaryMessyBlue: '#8CA6BA',
    secondaryLightBlue: '#B9D4E8',

    neutralGrey: '#6F7680',
    neutralDarkGrey: '#6D757D',
    neutralMediumGrey: '#D3D4D8',
    neutralRegularGrey: '#F0F1F3',
    neutralLightGrey: '#FAFAFA',
    neutralWhite: '#FFFFFF',

    gradientGreen: 'rgba(73, 196, 100, 0.15)',
    gradientOrange: 'rgba(235, 154, 62, 0.15)',
    gradientGray: 'rgba(187, 187, 187, 0.15)',
    gradientBlue: 'rgba(41, 87, 138, 0.15)',
    bgError: 'rgba(243, 31, 70, 0.15)',
    gradientRed: 'rgba(243, 31, 70, 0.15)',

    grey: '#888',
    black: '#000000',
    error: '#E94141',
    success: '#49C364',
    created: '#36C473',
    secure: '#22a16f',
    warning: '#E9A641',
  },
  borders: {
    normal: '1px solid #D3D4D8',
  },

  fontWeight: {
    bold: 600,
    normal: 400,
  },

  fontFamily: {
    openSans: 'Open Sans',
  },

  typography: {
    small: '0.75rem',
    p: '0.875rem', // 14px
    h1: '1.5em',
    h2: '1.25em',
    h3: '1.1em',
  },

  breakpoints: {
    xs: '0',
    sm: '37.5em', // 600px
    md: '56.25em', // 900px
    lg: '75em', // 1200px
    xl: '96em', // 1536px
  },

  shadows: {
    normal: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
    light: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
    intense: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
  },

  constants: {
    backButtonHeight: '50px',
    sidebarWidth: '326px',
    sidebarMobileWidth: '259px',
    sidebarHidden: '80px',
  },

  zIndex: {
    sidebar: 500,
  },
}

export const Theme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
