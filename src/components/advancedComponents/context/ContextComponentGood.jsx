import React, { useContext, useState, useMemo } from "react";

//control of current lang, ui theme, cache of data are good candidates for using context
//context using reference identity

const themes = {
  light: {
    name: "light",
    foreground: "#000000",
    background: "#eeeeee",
  },
  dark: {
    name: "dark",
    foreground: "#ffffff",
    background: "#222222",
  },
};

const ThemeContext = React.createContext(themes.light);

export const AppContextGood = () => {
  const [currentTheme, setCurrentTheme] = useState(themes.light);

  const inputChangeHandler = (e) => {
    if (currentTheme === themes.light) {
      setCurrentTheme(themes.dark);
    } else {
      setCurrentTheme(themes.light);
    }
  };
  return (
    <ThemeContext.Provider value={currentTheme}>
      <div>context good content</div>

      <div className="d-flex">
        <div className="form-check form-switch">
          <input
            onChange={inputChangeHandler}
            className="form-check-input"
            type="checkbox"
            id="flexSwitchCheckDefault"
            style={{ outline: "none" }}
          />

          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
            theme {currentTheme.name}
          </label>
        </div>
        <div>
          <button
            className="btn border rounded border-primary"
            onClick={() => console.clear()}
          >
            clear console
          </button>
        </div>
      </div>

      <ToolBar></ToolBar>
    </ThemeContext.Provider>
  );
};

const ToolBar = (props) => {
  return (
    <div>
      <div>tool bar component</div>
      <ThemeContext.Consumer>
        {(value) => <div>tool bar consumes context {value.name}</div>}
      </ThemeContext.Consumer>
      <ThemeButton></ThemeButton>
      <ThemeButtonWithUseMemo></ThemeButtonWithUseMemo>
    </div>
  );
};

const ThemeButton = () => {
  const theme = useContext(ThemeContext);
  console.log("ThemeButton is rendering with theme from useContext", theme);
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled from context
    </button>
  );
};

const ThemeButtonWithUseMemo = () => {
  const theme = useContext(ThemeContext);

  console.log(
    "ThemeButtonWithUseMemo is rendering with theme from useContext",
    theme
  );

  return useMemo(() => {
    return (
      <button style={{ background: theme.background, color: theme.foreground }}>
        I am styled from context with useMemo
      </button>
    );
  }, [theme]);
};
