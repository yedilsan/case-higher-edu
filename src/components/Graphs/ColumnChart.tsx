import * as am5 from '@amcharts/amcharts5';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5xy from '@amcharts/amcharts5/xy';
import { useEffect } from 'react';

interface DataItem {
	value: number;
	dimension: string;
}

interface ColumnChartProps {
	data: DataItem[];
	title: string;
}

const ColumnChart = ({ data, title }: ColumnChartProps) => {
	useEffect(() => {
		/* Chart code */
		// Create root element
		// https://www.amcharts.com/docs/v5/getting-started/#Root_element

		const root = am5.Root.new(`ColumnChart_${title}`);
		// Set themes
		// https://www.amcharts.com/docs/v5/concepts/themes/
		root.setThemes([am5themes_Animated.new(root)]);

		// Create chart
		// https://www.amcharts.com/docs/v5/charts/xy-chart/
		const chart = root.container.children.push(
			am5xy.XYChart.new(root, {
				panX: false,
				panY: false,
				wheelX: 'panX',
				wheelY: 'zoomX',
				paddingLeft: 0,
				layout: root.verticalLayout,
			})
		);

		// Add scrollbar
		// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
		chart.set(
			'scrollbarX',
			am5.Scrollbar.new(root, {
				orientation: 'horizontal',
			})
		);

		// Create axes
		// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
		const xRenderer = am5xy.AxisRendererX.new(root, {
			minorGridEnabled: true,
			minGridDistance: 60,
		});
		const xAxis = chart.xAxes.push(
			am5xy.CategoryAxis.new(root, {
				categoryField: 'dimension',
				renderer: xRenderer,
				tooltip: am5.Tooltip.new(root, {}),
			})
		);
		xRenderer.grid.template.setAll({
			location: 1,
		});

		xAxis.data.setAll(data);

		xAxis.get('renderer').labels.template.setAll({
			oversizedBehavior: 'hide',
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
				xAxis: xAxis,
				yAxis: yAxis,
				valueYField: 'value',
				categoryXField: 'dimension',
				tooltip: am5.Tooltip.new(root, {
					pointerOrientation: 'horizontal',
					labelText: '{valueY} {info}',
				}),
			})
		);

		series1.columns.template.setAll({
			tooltipY: am5.percent(10),
			templateField: 'columnSettings',
		});

		series1.data.setAll(data);

		chart.set('cursor', am5xy.XYCursor.new(root, {}));

		// Add legend
		// https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/

		chart.children.unshift(
			am5.Label.new(root, {
				text: `${title}`,
				fontSize: 22,
				fontWeight: '400',
				textAlign: 'center',
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
	}, [title, data]);

	return <div id={`ColumnChart_${title}`} className='chart'></div>;
};

export default ColumnChart;
