import { useEffect } from "react";
import { useCubeQuery } from "@cubejs-client/react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import cubejsApi from "../../cubejsConfig";

interface DataItem {
  value: number;
  dimension: string;
}

interface TreeTableProps {
  dimension: string;
}

const StudColumnChart: React.FC<TreeTableProps> = ({ dimension }) => {
  const { resultSet, isLoading, error } = useCubeQuery(
    {
      measures: ["student.count"],
      dimensions: [`student.${dimension}`],
      order: {
        "student.count": "desc",
      },
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
    const rootId = `StudColumnChart_${dimension}`;
    const root = am5.Root.new(rootId);

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingLeft: 0,
        layout: root.verticalLayout,
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

    const data: DataItem[] = resultSet.tablePivot().map((row) => ({
      value: Number(row["student.count"]),
      dimension: String(row[`student.${dimension}`]),
    }));

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    const xRenderer = am5xy.AxisRendererX.new(root, {
      minorGridEnabled: true,
      minGridDistance: 60,
    });
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "dimension",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      })
    );
    xRenderer.grid.template.setAll({
      location: 1,
    });

    xAxis.data.setAll(data);

    xAxis.get("renderer").labels.template.setAll({
      oversizedBehavior: "truncate",
      maxWidth: 150,
    });

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        extraMax: 0.1,
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 0.1,
        }),
      })
    );

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/

    const series1 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: `${dimension}`,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        categoryXField: "dimension",
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "horizontal",
          labelText: "{valueY} {info}",
        }),
      })
    );

    series1.columns.template.setAll({
      tooltipY: am5.percent(10),
      templateField: "columnSettings",
    });

    series1.data.setAll(data);

    chart.set("cursor", am5xy.XYCursor.new(root, {}));

    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/

    chart.children.unshift(
      am5.Label.new(root, {
        text: `${
          dimension === "citizenship"
            ? "Контингент студентов"
            : dimension === "socially_vulnerable"
            ? "Принадлежность к социально-уязвимым слоям"
            : ""
        }`,
        fontSize: 22,
        fontWeight: "400",
        textAlign: "center",
        x: am5.percent(20),
        centerX: am5.percent(20),
        paddingTop: 0,
        paddingBottom: 20,
      })
    );

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100);
    series1.appear();
    return () => {
      root.dispose();
    };
  }, [resultSet, isLoading, error, dimension]);

  const rootId = `StudColumnChart_${dimension}`;
  return <div id={rootId} className="chart"></div>;
};

export default StudColumnChart;
