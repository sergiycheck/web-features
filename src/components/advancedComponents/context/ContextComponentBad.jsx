export const AppContextBad = () => {
  console.log("context bad");
  return (
    <div>
      <div>content</div>
      <ToolBar theme="dark"></ToolBar>
    </div>
  );
};

const ToolBar = (props) => {
  return (
    <div>
      <ThemeButton theme={props.theme}></ThemeButton>
    </div>
  );
};

const ThemeButton = ({ theme }) => {
  return <Button theme={theme}></Button>;
};

const Button = ({ theme }) => {
  return <button className={theme}>{theme}</button>;
};
