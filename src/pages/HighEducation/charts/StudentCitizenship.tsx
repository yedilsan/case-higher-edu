import ColumnChart from '../../../components/Graphs/ColumnChart';
import { useCubeData } from '../../../hooks/useCubeData';

interface DataItem {
	value: number;
	dimension: string;
}

const StudentCitizenship = () => {
	const { resultSet, isLoading, error } = useCubeData({
		measures: 'student.count',
		dimension: ['student.citizenship'],
		orderBy: ['student.count', 'desc'],
	});

	if (error) {
		console.error('Error fetching data:', error);
	}

	if (isLoading || !resultSet) {
		return;
	}

	const data: DataItem[] = resultSet.tablePivot().map(row => ({
		value: Number(row['student.count']),
		dimension: String(row['student.citizenship']),
	}));

	return <ColumnChart data={data} title={'Контингент студентов'} />;
};

export default StudentCitizenship;
