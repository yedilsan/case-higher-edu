import { useEffect } from "react";
import { useCubeQuery } from "@cubejs-client/react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import cubejsApi from "../../cubejsConfig";

interface DataItem {
  value: number;
  year: number;
}

const StudentEmployment = () => {
  const { resultSet, isLoading, error } = useCubeQuery(
    {
      dimensions: ["students_employment.year", "students_employment.percent"],
      order: {
        "students_employment.year": "asc",
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

    const rawData: DataItem[] = resultSet.tablePivot().map((row) => ({
      value: Number(row["students_employment.percent"]),
      year: Number(row["students_employment.year"]),
    }));

    const yearToDataMap = new Map<number, number[]>();
    rawData.forEach(({ year, value }) => {
      if (!yearToDataMap.has(year)) {
        yearToDataMap.set(year, []);
      }
      yearToDataMap.get(year)?.push(value);
    });

    const data: DataItem[] = Array.from(yearToDataMap.entries()).map(
      ([year, values]) => ({
        year,
        value: values.reduce((sum, val) => sum + val, 0) / values.length,
      })
    );

    /* Chart code */
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    const root = am5.Root.new("StudentEmployment");

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
      })
    );

    chart?.get("colors")?.set("step", 3);

    // Add cursor
    const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "year",
        renderer: am5xy.AxisRendererX.new(root, {}),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    xAxis.data.setAll(data);
    yAxis.data.setAll(data);

    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        categoryXField: "year",
        tooltip: am5.Tooltip.new(root, {
          labelText: `{value}%`,
        }),
      })
    );

    series.data.setAll(data);

    // Add scrollbar
    chart.set(
      "scrollbarX",
      am5.Scrollbar.new(root, {
        orientation: "horizontal",
      })
    );

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [resultSet, isLoading, error]);

  return <div id="StudentEmployment" className="chart_full"></div>;
};

export default StudentEmployment;
