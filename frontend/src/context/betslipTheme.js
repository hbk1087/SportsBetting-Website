import React, { createContext, useContext } from 'react'

const BetslipThemeContext = createContext();

export const useTheme = () => useContext(BetslipThemeContext);

const theme = {
    colors: {
      background: '#ffffff',
      text: '#000000'
    }
};

export const ThemeProvider = ({ children }) => {
    return (
        <BetslipThemeContext.Provider value={theme}>
            {children}
        </BetslipThemeContext.Provider>
    )
}