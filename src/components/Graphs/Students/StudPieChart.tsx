import { useEffect } from "react";
import { useCubeQuery } from "@cubejs-client/react";
import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5percent from "@amcharts/amcharts5/percent";
import cubejsApi from "../../cubejsConfig";

interface DataItem {
  value: number;
  category: string;
}

const StudPieChart = () => {
  const { resultSet, isLoading, error } = useCubeQuery(
    {
      measures: ["student.count"],
      dimensions: ["student.last_education_type"],
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
      value: Number(row["student.count"]),
      category: String(row["student.last_education_type"]),
    }));

    /* Chart code */
    const root = am5.Root.new("StudPieChart");
    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
        innerRadius: am5.percent(50),
      })
    );

    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category",
      })
    );

    series.labels.template.setAll({
      textType: "circular",
      centerX: 0,
      centerY: 0,
      text: "{value}",
    });

    chart.children.unshift(
      am5.Label.new(root, {
        text: "Вид учебного заведения (предыдущее образование) ",
        fontSize: 22,
        fontWeight: "400",
        textAlign: "center",
        x: am5.percent(20),
        centerX: am5.percent(20),
        paddingTop: 15,
        paddingBottom: 0,
      })
    );

    series.data.setAll(data);

    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        marginTop: 15,
        marginBottom: 15,
      })
    );

    legend.data.setAll(series.dataItems);

    series.appear(1000, 100);

    // Cleanup on unmount
    return () => {
      root.dispose();
    };
  }, [resultSet, isLoading, error]);

  return <div id="StudPieChart" className="chart"></div>;
};

export default StudPieChart;
