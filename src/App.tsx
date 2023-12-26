import "./App.css";
import CollapseMenu from "./components/CollapseMenu";
import Filter from "./components/Filter";

function App() {
  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          marginLeft: "auto",
        }}
      >
        <Filter />
      </div>
      <div>
        <CollapseMenu />
      </div>
    </div>
  );
}

export default App;
