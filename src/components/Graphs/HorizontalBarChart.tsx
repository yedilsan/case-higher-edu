import * as am5 from '@amcharts/amcharts5';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5xy from '@amcharts/amcharts5/xy';
import { useEffect } from 'react';

interface DataItem {
	value: number;
	dimension: string;
}

interface BarChartProps {
	data: DataItem[];
	title: string;
}

const HorizontalBarChart = ({ data, title }: BarChartProps) => {
	useEffect(() => {
		/* Chart code */
		// Create root element
		// https://www.amcharts.com/docs/v5/getting-started/#Root_element
		//const rootId = `HorizontalBarChart`;
		const root = am5.Root.new(`HorizontalBarChart_${title}`);

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
				wheelY: 'panY',
				paddingLeft: 0,
				layout: root.verticalLayout,
			})
		);

		// Create axes
		// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
		const yRenderer = am5xy.AxisRendererY.new(root, {
			cellStartLocation: 0.1,
			cellEndLocation: 0.9,
			minorGridEnabled: true,
		});

		yRenderer.grid.template.set('location', 1);

		const yAxis = chart.yAxes.push(
			am5xy.CategoryAxis.new(root, {
				categoryField: 'dimension',
				renderer: yRenderer,
				tooltip: am5.Tooltip.new(root, {}),
			})
		);

		yAxis.data.setAll(data);

		const xAxis = chart.xAxes.push(
			am5xy.ValueAxis.new(root, {
				min: 0,
				renderer: am5xy.AxisRendererX.new(root, {
					strokeOpacity: 0.1,
					minGridDistance: 50,
				}),
			})
		);

		// Add series
		// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
		const series1 = chart.series.push(
			am5xy.ColumnSeries.new(root, {
				xAxis: xAxis,
				yAxis: yAxis,
				valueXField: 'value',
				categoryYField: 'dimension',
				sequencedInterpolation: true,
				tooltip: am5.Tooltip.new(root, {
					pointerOrientation: 'horizontal',
					labelText: '{categoryY}: {valueX}',
				}),
			})
		);

		series1.columns.template.setAll({
			height: am5.percent(50),
		});

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

		yAxis.get('renderer').labels.template.setAll({
			oversizedBehavior: 'truncate',
			maxWidth: 150,
		});

		chart.set(
			'scrollbarY',
			am5.Scrollbar.new(root, {
				orientation: 'vertical',
			})
		);

		// Add cursor
		// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
		const cursor = chart.set(
			'cursor',
			am5xy.XYCursor.new(root, {
				behavior: 'zoomY',
			})
		);
		cursor.lineX.set('visible', false);

		series1.data.setAll(data);

		// Make stuff animate on load
		// https://www.amcharts.com/docs/v5/concepts/animations/
		series1.appear();
		chart.appear(1000, 100);
		return () => {
			root.dispose();
		};
	}, [title, data]);

	return <div id={`HorizontalBarChart_${title}`} className='chart'></div>;
};

export default HorizontalBarChart;
