import ColumnDateAxisChart from '../../../components/Graphs/ColumnDateAxisChart';
import { useCubeData } from '../../../hooks/useCubeData';

interface DataItem {
	value: number;
	age: number;
}

const PpsAge = () => {
	const { resultSet, isLoading, error } = useCubeData({
		measures: 'pps.count',
		dimension: ['pps.age'],
	});

	if (error) {
		console.error('Error fetching data:', error);
	}

	if (isLoading || !resultSet) {
		return;
	}

	const data: DataItem[] = resultSet.tablePivot().map(row => ({
		value: Number(row['pps.count']),
		age: Number(row['pps.age']),
	}));

	return (
		<ColumnDateAxisChart
			data={data}
			title={'Количество ППС по возрастной категории'}
		/>
	);
};

export default PpsAge;
