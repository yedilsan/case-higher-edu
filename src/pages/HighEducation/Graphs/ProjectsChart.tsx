import * as am5 from '@amcharts/amcharts5';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5xy from '@amcharts/amcharts5/xy';
import { useEffect } from 'react';
import { useCubeData } from '../hooks/useCubeData';

interface DataItem {
	value: number;
	source: string;
	year: number;
}

interface ProjectsChartProps {
	filters: {
		measures: string;
		dimension: string[];
		orderBy: string[];
	};
	title: string;
}

const ProjectsChart = ({
	filters: { measures, dimension, orderBy },
	title,
}: ProjectsChartProps) => {
	const { resultSet, isLoading, error } = useCubeData({
		measures,
		dimension,
		orderBy,
	});

	// const { resultSet, isLoading, error } = useCubeQuery(
	// 	{
	// 		measures: [`${measures}`],
	// 		dimensions: dimension,
	// 		order: {
	// 			[`${orderBy[0]}`]: orderBy[1],
	// 		} as TQueryOrderObject,
	// 	},
	// 	{ cubejsApi }
	// );

	useEffect(() => {
		if (error) {
			console.error('Error fetching data:', error);
		}

		if (isLoading || !resultSet) {
			return;
		}

		const data: DataItem[] = resultSet.tablePivot().map(row => ({
			value: Number(row[`${measures}`]),
			source: String(row[dimension[0]]),
			year: Number(row[dimension[1]]),
		}));

		const root = am5.Root.new('ProjectsChart');

		// Set themes
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
				marginBottom: 20,
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
		const uniqueSources = Array.from(new Set(data.map(item => item.source)));

		// Add series for each funding source
		uniqueSources.forEach(source => {
			const seriesList = chart.series.push(
				am5xy.LineSeries.new(root, {
					name: source,
					xAxis: xAxis,
					yAxis: yAxis,
					valueYField: 'value',
					categoryXField: 'year',
					tooltip: am5.Tooltip.new(root, {
						labelText: `{year}. {name}: {valueY}тг`,
					}),
				})
			);

			seriesList.strokes.template.setAll({
				strokeWidth: 2,
			});

			// Set data for each series
			seriesList.data.setAll(data.filter(item => item.source === source));
		});

		const legend = chart.children.push(
			am5.Legend.new(root, {
				x: am5.percent(50),
				y: am5.percent(100),
				centerX: am5.percent(50),
				layout: root.horizontalLayout,
			})
		);

		legend.labels.template.setAll({
			maxWidth: 150,
			oversizedBehavior: 'truncate',
		});

		legend.data.setAll(chart.series.values);

		chart.set(
			'scrollbarX',
			am5.Scrollbar.new(root, {
				orientation: 'horizontal',
			})
		);

		chart.appear(1000, 100);

		return () => {
			root.dispose();
		};
	}, [resultSet, isLoading, error, measures, dimension]);

	return (
		<div style={{ margin: '10px', display: 'flex', justifyContent: 'center' }}>
			<div>
				<h3>{title}</h3>
				<div id='ProjectsChart' className='chart_full'></div>
			</div>
		</div>
	);
};

export default ProjectsChart;
