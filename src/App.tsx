import { CollapseProps, Collapse } from "antd";
import "./App.css";
import TreeData from "./components/TreeTable";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const items: CollapseProps["items"] = [
  {
    key: "1",
    label: "Graph Panel 1",
    children: (
      <div
        style={{
          display: "flex",
          gap: "10vw",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        <div>
          <TreeData level="Бакалавриат" />
        </div>
        <div>
          <TreeData level="Магистратура" />
        </div>
        <div>
          <TreeData level="Докторантура" />
        </div>
      </div>
    ),
  },
  {
    key: "2",
    label: "This is panel header 2",
    children: <p>{text}</p>,
  },
  {
    key: "3",
    label: "This is panel header 3",
    children: <p>{text}</p>,
  },
  {
    key: "4",
    label: "This is panel header 4",
    children: <p>{text}</p>,
  },
  {
    key: "5",
    label: "This is panel header 5",
    children: <p>{text}</p>,
  },
  {
    key: "6",
    label: "This is panel header 6",
    children: <p>{text}</p>,
  },
];

function App() {
  return (
    <>
      <div className="page__wrapper">
        <div className="page__collapse">
          <Collapse accordion items={items} size="large" />
        </div>
      </div>
    </>
  );
}

export default App;
