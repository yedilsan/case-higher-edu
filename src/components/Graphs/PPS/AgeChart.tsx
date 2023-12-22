import { useEffect } from "react";
import { useCubeQuery } from "@cubejs-client/react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import cubejs from "@cubejs-client/core";

interface DataItem {
  value: number;
  age: number;
}

const cubejsApi = cubejs(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDMwNDI3MTAsImV4cCI6MTcwMzEyOTExMH0.nJF_t1sysATWagqMoo1Yvb4Igdtf7ltrpF51qLnMPB4",
  { apiUrl: "http://localhost:4000/cubejs-api/v1" }
);

interface TreeTableProps {
  dimension: string;
}

const AgeChart: React.FC<TreeTableProps> = ({ dimension }) => {
  const { resultSet, isLoading, error } = useCubeQuery(
    {
      measures: ["pps.count"],
      dimensions: [`pps.${dimension}`],
    },
    { cubejsApi }
  );

  useEffect(() => {
    if (error) {
      console.error("Error fetching data:", error);
    }

    if (isLoading || !resultSet) {
      return;
    }

    /* Chart code */
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element

    const rootId = `Pps_${dimension}`;
    const root = am5.Root.new(rootId);

    const myTheme = am5.Theme.new(root);

    myTheme.rule("AxisLabel", ["minor"]).setAll({
      dy: 1,
    });

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root),
      myTheme,
      am5themes_Responsive.new(root),
    ]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingLeft: 0,
      })
    );

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        behavior: "zoomX",
      })
    );
    cursor.lineY.set("visible", false);

    const data: DataItem[] = resultSet.tablePivot().map((row) => ({
      value: Number(row["pps.count"]),
      age: Number(row[`pps.${dimension}`]), // Assuming 'pps.age' is the field representing the age
    }));

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {
          minorGridEnabled: true,
          minorLabelsEnabled: true,
        }),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );
    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "age",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
        }),
      })
    );

    series.columns.template.setAll({ strokeOpacity: 1 });
    series.columns.template.set("strokeWidth", 5);
    series.columns.template.set("fillOpacity", 0.7);

    chart.children.unshift(
      am5.Label.new(root, {
        text: "Количество ППС по возрастной категории",
        fontSize: 22,
        fontWeight: "400",
        textAlign: "center",
        x: am5.percent(20),
        y: am5.percent(10),
        centerX: am5.percent(20),
        paddingTop: 0,
        paddingBottom: 20,
      })
    );

    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    chart.set(
      "scrollbarX",
      am5.Scrollbar.new(root, {
        orientation: "horizontal",
      })
    );

    //const data = generateDatas(30);
    series.data.setAll(data);

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    chart.appear(1000, 100);
    return () => {
      root.dispose();
    };
  }, [resultSet, isLoading, error, dimension]);

  const rootId = `Pps_${dimension}`;
  return <div id={rootId} className="chart"></div>;
};

export default AgeChart;
