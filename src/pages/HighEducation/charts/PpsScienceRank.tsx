import HorizontalBarChart from '../../../components/Graphs/HorizontalBarChart';
import { useCubeData } from '../../../hooks/useCubeData';

interface DataItem {
	value: number;
	dimension: string;
}

const PpsScienceRank = () => {
	const { resultSet, isLoading, error } = useCubeData({
		measures: 'pps.count',
		dimension: ['pps.science_rank'],
		orderBy: ['pps.count', 'asc'],
	});
	if (error) {
		console.error('Error fetching data:', error);
	}

	if (isLoading || !resultSet) {
		return;
	}
	const data: DataItem[] = resultSet.tablePivot().map(row => ({
		value: Number(row['pps.count']),
		dimension: String(row['pps.science_rank']),
	}));
	return (
		<HorizontalBarChart
			data={data}
			title={'Количество ППС по ученому званию'}
		/>
	);
};

export default PpsScienceRank;
