import { useEffect } from "react";
import { useCubeQuery } from "@cubejs-client/react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import cubejs from "@cubejs-client/core";

interface DataItem {
  count: number;
  admYear: string;
  studLang: string;
}

const cubejsApi = cubejs(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDMwNDI3MTAsImV4cCI6MTcwMzEyOTExMH0.nJF_t1sysATWagqMoo1Yvb4Igdtf7ltrpF51qLnMPB4",
  { apiUrl: "http://localhost:4000/cubejs-api/v1" }
);

const StudStackedColChart = () => {
  const { resultSet, isLoading, error } = useCubeQuery(
    {
      measures: ["student.count"],
      dimensions: ["student.admission_year", "student.study_language"],
      order: {
        "student.count": "asc",
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
    const root = am5.Root.new("StudStackedColChart");

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

    // const data: DataItem[] = resultSet.tablePivot().map((row) => ({
    //   count: Number(row["student.count"]),
    //   admYear: String(row["student.admission_year"]),
    //   studLang: String(row["student.study_language"]),
    // }));

    const data = [
      {
        year: "2021",
        europe: 1028,
        namerica: 780,
      },
      {
        year: "2022",
        europe: 719,
        namerica: 624,
      },
      {
        year: "2023",
        europe: 608,
        namerica: 546,
      },
    ];

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    const xRenderer = am5xy.AxisRendererX.new(root, {
      minorGridEnabled: true,
    });
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "year",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    xRenderer.grid.template.setAll({
      location: 1,
    });

    xAxis.data.setAll(data);

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 0.1,
        }),
      })
    );

    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
      })
    );

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    function makeSeries(name: string, fieldName: string) {
      const series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: name,
          stacked: true,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: fieldName,
          categoryXField: "year",
        })
      );

      series.columns.template.setAll({
        tooltipText: "{name}, {categoryX}: {valueY}",
        tooltipY: am5.percent(10),
      });
      series.data.setAll(data);

      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      series.appear();

      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          sprite: am5.Label.new(root, {
            text: "{valueY}",
            fill: root.interfaceColors.get("alternativeText"),
            centerY: am5.p50,
            centerX: am5.p50,
            populateText: true,
          }),
        });
      });

      legend.data.push(series);
    }

    makeSeries("Europe", "europe");
    makeSeries("North America", "namerica");
    makeSeries("Asia", "asia");
    makeSeries("Latin America", "lamerica");
    makeSeries("Middle East", "meast");
    makeSeries("Africa", "africa");

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100);
    return () => {
      root.dispose();
    };
  }, [resultSet, isLoading, error]);

  const rootId = `StudStackedColChart`;
  return <div id={rootId} className="chart"></div>;
};

export default StudStackedColChart;
