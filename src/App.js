// 1: Import
import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from "styled-components";
import WebFont from 'webfontloader';
import { GlobalStyles } from './theme/GlobalStyles';
import { useTheme } from './theme/useTheme';
import ThemeSelector from './ThemeSelector';
// below are modules for implementing theme cutomization
import Dialog from './Dialog';
import CreateThemeContent from './CreateThemeContent';


// 2: Create a cotainer
const Container = styled.div`
  margin: 5px auto 5px auto;
`;

function App() {
  // 3: Get the selected theme, font list, etc.
  const {theme, themeLoaded, getFonts} = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);
  const [showDialog, setShowDialog] = useState(false);
  const [newTheme, setNewTheme] = useState();

  useEffect(() => {
    setSelectedTheme(theme);
   }, [themeLoaded]);

  // 4: Load all the fonts
  useEffect(() => {
    WebFont.load({
      google: {
        families: getFonts()
      }
    });
  });

  const manageDialog = () => {
    setShowDialog(!showDialog);
  }

  const createTheme = newTheme => {
    console.log(newTheme);
    setShowDialog(false);
    setNewTheme(newTheme);
  }

  // 5: Render if the theme is loaded.
  return (
    <>
    {
      themeLoaded && <ThemeProvider theme={ selectedTheme }>
        <GlobalStyles/>
        <Container style={{fontFamily: selectedTheme.font}}>
          <h1>Theme Builder</h1>
          <p>
            This is a theming system with a Theme Switcher and Theme Builder.
            Do you want to see the source code? <a href="https://github.com/atapas/theme-builder" target="_blank">Click here.</a>
          </p>
          <button className="btn" onClick={ manageDialog }>Create a Theme</button>
          <Dialog 
            header="Create a Theme"
            body={ <CreateThemeContent create={ createTheme }/> }
            open={ showDialog } 
            callback = { manageDialog }/>
          <ThemeSelector setter={ setSelectedTheme } />
        </Container>
      </ThemeProvider>
    }
    </>
  );
}

export default App;