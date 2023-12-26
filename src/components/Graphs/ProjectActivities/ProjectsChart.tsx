import { useEffect } from "react";
import { useCubeQuery } from "@cubejs-client/react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import cubejsApi from "../../cubejsConfig";

interface DataItem {
  value: number;
  source: string;
  year: number;
}

const ProjectsChart = () => {
  const { resultSet, isLoading, error } = useCubeQuery(
    {
      measures: ["projects.funding_amount"],
      dimensions: ["projects.funding_source", "projects.year"],
      order: {
        "projects.year": "asc",
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

    const data: DataItem[] = resultSet.tablePivot().map((row) => ({
      value: Number(row["projects.funding_amount"]),
      source: String(row["projects.funding_source"]),
      year: Number(row["projects.year"]),
    }));

    const root = am5.Root.new("ProjectsChart");

    // Set themes
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
    // Get unique funding sources
    const uniqueSources = Array.from(new Set(data.map((item) => item.source)));

    // Add series for each funding source
    uniqueSources.forEach((source) => {
      const seriesList = chart.series.push(
        am5xy.LineSeries.new(root, {
          name: source,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "value",
          categoryXField: "year",
          tooltip: am5.Tooltip.new(root, {
            labelText: `{name}: {valueY}тг`,
          }),
        })
      );

      // Set data for each series
      seriesList.data.setAll(data.filter((item) => item.source === source));
    });

    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [resultSet, isLoading, error]);

  return <div id="ProjectsChart" className="chart_full"></div>;
};

export default ProjectsChart;
