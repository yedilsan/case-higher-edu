import * as am5 from '@amcharts/amcharts5';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5xy from '@amcharts/amcharts5/xy';
import { useEffect } from 'react';

interface DataItem {
	value: number;
	year: number;
}

interface StudentEmploymentChartProps {
	data: DataItem[];
	title: string;
}

const StudentEmploymentChart = ({
	data,
	title,
}: StudentEmploymentChartProps) => {
	useEffect(() => {
		/* Chart code */
		// Create root element
		// https://www.amcharts.com/docs/v5/getting-started/#Root_element
		const root = am5.Root.new(`StudentEmploymentChart_${title}`);

		// Set themes
		// https://www.amcharts.com/docs/v5/concepts/themes/
		root.setThemes([am5themes_Animated.new(root)]);

		// Create chart
		const chart = root.container.children.push(
			am5xy.XYChart.new(root, {
				panX: true,
				panY: true,
				wheelX: 'panX',
				wheelY: 'zoomX',
				pinchZoomX: true,
			})
		);

		chart?.get('colors')?.set('step', 3);

		// Add cursor
		const cursor = chart.set('cursor', am5xy.XYCursor.new(root, {}));
		cursor.lineY.set('visible', false);

		const xAxis = chart.xAxes.push(
			am5xy.CategoryAxis.new(root, {
				categoryField: 'year',
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
				name: 'Series',
				xAxis: xAxis,
				yAxis: yAxis,
				valueYField: 'value',
				categoryXField: 'year',
				tooltip: am5.Tooltip.new(root, {
					labelText: `{value}%`,
				}),
			})
		);

		series.strokes.template.setAll({
			strokeWidth: 2,
		});

		series.data.setAll(data);

		// Add scrollbar
		chart.set(
			'scrollbarX',
			am5.Scrollbar.new(root, {
				orientation: 'horizontal',
			})
		);

		// Make stuff animate on load
		// https://www.amcharts.com/docs/v5/concepts/animations/
		series.appear(1000);
		chart.appear(1000, 100);

		return () => {
			root.dispose();
		};
	}, [title, data]);

	return (
		<div style={{ margin: '10px', display: 'flex', justifyContent: 'center' }}>
			<div>
				<h3>{title}</h3>
				<div
					id={`StudentEmploymentChart_${title}`}
					className='chart_full'
				></div>
			</div>
		</div>
	);
};

export default StudentEmploymentChart;
