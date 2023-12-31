import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { useCubeQuery } from '@cubejs-client/react';
import { useEffect } from 'react';
import cubejsApi from '../cubejsConfig';

interface DataItem {
	value: number;
	category: string;
}

interface PieChartProps {
	measures: string;
	dimension: string;
}

const PieChart = ({ measures, dimension }: PieChartProps) => {
	const { resultSet, isLoading, error } = useCubeQuery(
		{
			measures: [`${measures}`],
			dimensions: [`${dimension}`],
		},
		{ cubejsApi }
	);

	const rootId = `PieChart_${dimension}`;
	useEffect(() => {
		if (error) {
			console.error('Error fetching data:', error);
		}

		if (isLoading || !resultSet) {
			return;
		}

		const data: DataItem[] = resultSet.tablePivot().map(row => ({
			value: Number(row[`${measures}`]),
			category: String(row[`${dimension}`]),
		}));

		/* Chart code */
		const root = am5.Root.new(rootId);
		root.setThemes([am5themes_Animated.new(root)]);

		const chart = root.container.children.push(
			am5percent.PieChart.new(root, {
				layout: root.verticalLayout,
				innerRadius: am5.percent(50),
			})
		);

		const series = chart.series.push(
			am5percent.PieSeries.new(root, {
				valueField: 'value',
				categoryField: 'category',
			})
		);

		series.labels.template.setAll({
			textType: 'circular',
			centerX: 0,
			centerY: 0,
			text: '{category}: {value}',
		});

		series.labels.template.setAll({
			maxWidth: 150,
			oversizedBehavior: 'truncate',
		});

		chart.children.unshift(
			am5.Label.new(root, {
				text: `${
					dimension == 'pps.citizenship'
						? 'Гражданство преподавателей '
						: dimension == 'student.last_education_type'
						? 'Вид учебного заведения (предыдущее образование) '
						: ''
				}`,
				fontSize: 22,
				fontWeight: '400',
				textAlign: 'center',
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
				layout: am5.GridLayout.new(root, {
					maxColumns: 2,
					fixedWidthGrid: true,
				}),
			})
		);

		legend.labels.template.setAll({
			maxWidth: 150,
			oversizedBehavior: 'wrap',
		});

		legend.data.setAll(series.dataItems);

		series.appear(1000, 100);

		// Cleanup on unmount
		return () => {
			root.dispose();
		};
	}, [resultSet, isLoading, error, dimension, measures, rootId]);

	return <div id={rootId} className='chart'></div>;
};

export default PieChart;
