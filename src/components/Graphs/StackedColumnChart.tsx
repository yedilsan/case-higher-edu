import * as am5 from '@amcharts/amcharts5';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5xy from '@amcharts/amcharts5/xy';
import { useCubeQuery } from '@cubejs-client/react';
import { useEffect } from 'react';
import cubejsApi from '../cubejsConfig';

interface LanguageData {
	year: string;
	[language: string]: string | number;
}

interface StackedColumnChart {
	measures: string;
	dimension: string[];
}

const StackedColumnChart = ({ measures, dimension }: StackedColumnChart) => {
	const { resultSet, isLoading, error } = useCubeQuery(
		{
			measures: [`${measures}`],
			dimensions: dimension,
			order: {
				'student.admission_year': 'asc',
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

		/* Chart code */

		// Create root element
		// https://www.amcharts.com/docs/v5/getting-started/#Root_element
		const root = am5.Root.new('StackedColumnChart');

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

		const pivotData = resultSet.tablePivot().map(row => ({
			year: String(row[dimension[0]]),
			lang: String(row[dimension[1]]),
			count: Number(row[`${measures}`]),
		}));

		const data: LanguageData[] = pivotData.reduce(
			(result: LanguageData[], row) => {
				const existingYear = result.find(item => item.year === row.year);

				if (existingYear) {
					existingYear[row.lang.toLowerCase()] = row.count;
				} else {
					result.push({
						year: row.year,
						[row.lang.toLowerCase()]: row.count,
					});
				}

				return result;
			},
			[]
		);

		// Create axes
		// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
		const xRenderer = am5xy.AxisRendererX.new(root, {
			minorGridEnabled: true,
		});
		const xAxis = chart.xAxes.push(
			am5xy.CategoryAxis.new(root, {
				categoryField: 'year',
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
					categoryXField: 'year',
				})
			);

			series.columns.template.setAll({
				tooltipText: '{name}, {categoryX}: {valueY}',
				tooltipY: am5.percent(10),
			});
			series.data.setAll(data);

			// Make stuff animate on load
			// https://www.amcharts.com/docs/v5/concepts/animations/
			series.appear();

			series.bullets.push(function () {
				return am5.Bullet.new(root, {
					sprite: am5.Label.new(root, {
						text: '{valueY}',
						fill: root.interfaceColors.get('alternativeText'),
						centerY: am5.p50,
						centerX: am5.p50,
						populateText: true,
					}),
				});
			});

			legend.data.push(series);
		}
		chart.children.unshift(
			am5.Label.new(root, {
				text: 'Количество обучающихся студентов по году поступления',
				fontSize: 22,
				fontWeight: '400',
				textAlign: 'center',
				x: am5.percent(20),
				centerX: am5.percent(20),
				paddingTop: 0,
				paddingBottom: 20,
			})
		);

		makeSeries('Kazakh', 'казахский');
		makeSeries('Russian', 'русский');
		makeSeries('English', 'английский');

		// Make stuff animate on load
		// https://www.amcharts.com/docs/v5/concepts/animations/
		chart.appear(1000, 100);
		return () => {
			root.dispose();
		};
	}, [resultSet, isLoading, error, measures, dimension]);

	const rootId = `StackedColumnChart`;
	return <div id={rootId} className='chart'></div>;
};

export default StackedColumnChart;
