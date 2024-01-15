import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { useEffect } from 'react';

interface DataItem {
	value: number;
	category: string;
}

interface PieChartProps {
	data: DataItem[];
	title: string;
}

const PieChart = ({ data, title }: PieChartProps) => {
	useEffect(() => {
		/* Chart code */
		const root = am5.Root.new(`PieChart_${title}`);
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
				text: `${title}`,
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
	}, [title, data]);

	return <div id={`PieChart_${title}`} className='chart'></div>;
};

export default PieChart;
