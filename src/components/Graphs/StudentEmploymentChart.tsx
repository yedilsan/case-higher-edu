import * as am5 from '@amcharts/amcharts5';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5xy from '@amcharts/amcharts5/xy';
import { useCubeQuery } from '@cubejs-client/react';
import { useEffect } from 'react';
import cubejsApi from '../cubejsConfig';

interface DataItem {
	value: number;
	year: number;
}

interface StudentEmploymentChartProps {
	filters: {
		measures?: string;
		dimension: string[];
		orderBy: string;
		title: string;
	};
}

const StudentEmploymentChart = ({
	filters: { dimension, orderBy, title },
}: StudentEmploymentChartProps) => {
	const { resultSet, isLoading, error } = useCubeQuery(
		{
			dimensions: dimension,
			order: {
				[`${orderBy}`]: 'asc',
			},
		},
		{ cubejsApi }
	);

	useEffect(() => {
		if (error) {
			console.error('Error fetching data:', error);
		}

		if (isLoading || !resultSet) {
			return;
		}

		const rawData: DataItem[] = resultSet.tablePivot().map(row => ({
			value: Number(row[dimension[1]]),
			year: Number(row[dimension[0]]),
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
		const root = am5.Root.new('StudentEmploymentChart');

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
	}, [resultSet, isLoading, error, dimension]);

	return (
		<div style={{ margin: '10px', display: 'flex', justifyContent: 'center' }}>
			<div>
				<h3>{title}</h3>
				<div id='StudentEmploymentChart' className='chart_full'></div>
			</div>
		</div>
	);
};

export default StudentEmploymentChart;
