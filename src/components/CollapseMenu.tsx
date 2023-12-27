import { CollapseProps, Collapse, Col, Row } from "antd";
import TreeData from "../components/TreeTable";
import PpsCitizenship from "../components/Graphs/PPS/PpsCitizenship";
import ScienceRank from "../components/Graphs/PPS/ScienceRank";
import AgeChart from "../components/Graphs/PPS/AgeChart";
import StudLineChart from "../components/Graphs/Students/StudLineChart";
import StudStackedColChart from "../components/Graphs/Students/StudStackedColChart";
import StudPieChart from "../components/Graphs/Students/StudPieChart";
import StudColumnChart from "../components/Graphs/Students/StudColumnChart";
import ProjectsChart from "../components/Graphs/ProjectActivities/ProjectsChart";
import StudentEmployment from "../components/Graphs/StudentEmployment/StudentEmployment";
import "./component.css";

const items: CollapseProps["items"] = [
  {
    key: "1",
    label: "Образовательные программы",
    children: (
      <div className="tree-wrapper">
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
    label: "ППС",
    children: (
      <Row className="charts">
        <Col className="chart_layout">
          <PpsCitizenship />
        </Col>
        <Col className="chart_layout">
          <ScienceRank dimension="science_rank" />
        </Col>
        <Col className="chart_layout">
          <ScienceRank dimension="science_degree" />
        </Col>
        <Col className="chart_layout">
          <AgeChart dimension="age" />
        </Col>
      </Row>
    ),
  },
  {
    key: "3",
    label: "Студенты",
    children: (
      <Row className="charts">
        <Col className="chart_layout">
          <StudLineChart dimension="finance_type" />
        </Col>
        <Col className="chart_layout">
          <StudLineChart dimension="specialty" />
        </Col>
        <Col className="chart_layout">
          <StudStackedColChart />
        </Col>
        <Col className="chart_layout">
          <StudColumnChart dimension="citizenship" />
        </Col>
        <Col className="chart_layout">
          <StudPieChart />
        </Col>
        <Col className="chart_layout">
          <StudColumnChart dimension="socially_vulnerable" />
        </Col>
      </Row>
    ),
  },
  {
    key: "4",
    label: "Проектная деятельность",
    children: (
      <div
        style={{ margin: "10px", display: "flex", justifyContent: "center" }}
      >
        <div>
          <h3>Объем финансирования проектов по источнику</h3>
          <ProjectsChart />
        </div>
      </div>
    ),
  },
  {
    key: "5",
    label: "Трудоустройство выпускников",
    children: (
      <div
        style={{ margin: "10px", display: "flex", justifyContent: "center" }}
      >
        <div>
          <h3>Показатели трудоустройства выпускников в процентах</h3>
          <StudentEmployment />
        </div>
      </div>
    ),
  },
  {
    key: "6",
    label: "Публикации",
    children: <p>Нет данных</p>,
  },
];

const CollapseMenu = () => {
  return (
    <>
      <div className="page__wrapper">
        <div className="page__collapse">
          <Collapse accordion items={items} size="large" />
        </div>
      </div>
    </>
  );
};

export default CollapseMenu;
