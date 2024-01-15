import PieChart from '../../../components/Graphs/PieChart';
import { useCubeData } from '../../../hooks/useCubeData';

interface DataItem {
	value: number;
	category: string;
}

const PpsCitizenship = () => {
	const { resultSet, isLoading, error } = useCubeData({
		measures: 'pps.count',
		dimension: ['pps.citizenship'],
	});

	if (error) {
		console.error('Error fetching data:', error);
	}

	if (isLoading || !resultSet) {
		return;
	}

	const data: DataItem[] = resultSet.tablePivot().map(row => ({
		value: Number(row['pps.count']),
		category: String(row['pps.citizenship']),
	}));

	return <PieChart data={data} title={'Гражданство преподавателей'} />;
};

export default PpsCitizenship;
