import * as am5 from '@amcharts/amcharts5';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5xy from '@amcharts/amcharts5/xy';
import { useCubeQuery } from '@cubejs-client/react';
import { useEffect } from 'react';
import cubejsApi from '../cubejsConfig';

interface DataItem {
	value: number;
	dimension: string;
}

interface BarChartProps {
	measures: string;
	dimension: string;
}

const HorizontalBarChart = ({ measures, dimension }: BarChartProps) => {
	const { resultSet, isLoading, error } = useCubeQuery(
		{
			measures: [`${measures}`],
			dimensions: [`${dimension}`],
			order: {
				[`${measures}`]: 'asc',
			},
		},
		{ cubejsApi }
	);
	const rootId = `HorizontalBarChart_${dimension}`;
	useEffect(() => {
		if (error) {
			console.error('Error fetching data:', error);
		}

		if (isLoading || !resultSet) {
			return;
		}

		/* Chart code */
		// Create root element
		// https://www.amcharts.com/docs/v5/getting-started/#Root_element

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
				wheelX: 'panX',
				wheelY: 'zoomY',
				paddingLeft: 0,
				layout: root.verticalLayout,
			})
		);

		const data: DataItem[] = resultSet.tablePivot().map(row => ({
			value: Number(row[`${measures}`]),
			dimension: String(row[`${dimension}`]),
		}));

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
				name: `${dimension}`,
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
				text: `${
					dimension === 'pps.science_rank'
						? 'Количество ППС по ученому званию'
						: dimension === 'pps.science_degree'
						? 'Количество ППС по ученой степени '
						: dimension === 'student.finance_type'
						? 'Вид финансирования (по количеству студентов)'
						: dimension === 'student.specialty'
						? 'Количество обучающихя студентов по специальности'
						: ''
				}`,
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
	}, [resultSet, isLoading, error, dimension, rootId, measures]);

	return <div id={rootId} className='chart'></div>;
};

export default HorizontalBarChart;
