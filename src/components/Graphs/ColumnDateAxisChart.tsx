import * as am5 from '@amcharts/amcharts5';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am5themes_Responsive from '@amcharts/amcharts5/themes/Responsive';
import * as am5xy from '@amcharts/amcharts5/xy';
import { useEffect } from 'react';

interface DataItem {
	value: number;
	age: number;
}

interface ColumnDateAxisChartProps {
	data: DataItem[];
	title: string;
}

const ColumnDateAxisChart = ({ data, title }: ColumnDateAxisChartProps) => {
	useEffect(() => {
		/* Chart code */
		const root = am5.Root.new(`Pps_${title}`);

		const myTheme = am5.Theme.new(root);

		myTheme.rule('AxisLabel', ['minor']).setAll({
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
				wheelX: 'panX',
				wheelY: 'zoomX',
				paddingLeft: 0,
			})
		);

		// Add cursor
		// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
		const cursor = chart.set(
			'cursor',
			am5xy.XYCursor.new(root, {
				behavior: 'zoomX',
			})
		);
		cursor.lineY.set('visible', false);

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
				name: 'Series',
				xAxis: xAxis,
				yAxis: yAxis,
				valueYField: 'value',
				valueXField: 'age',
				tooltip: am5.Tooltip.new(root, {
					labelText: '{valueY}',
				}),
			})
		);

		series.columns.template.setAll({ strokeOpacity: 1 });
		series.columns.template.set('strokeWidth', 5);
		series.columns.template.set('fillOpacity', 0.7);

		chart.children.unshift(
			am5.Label.new(root, {
				text: `${title}`,
				fontSize: 22,
				fontWeight: '400',
				textAlign: 'center',
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
			'scrollbarX',
			am5.Scrollbar.new(root, {
				orientation: 'horizontal',
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
	}, [title, data]);

	return <div id={`Pps_${title}`} className='chart'></div>;
};

export default ColumnDateAxisChart;
