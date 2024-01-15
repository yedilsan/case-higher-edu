import HorizontalBarChart from '../../../components/Graphs/HorizontalBarChart';
import { useCubeData } from '../../../hooks/useCubeData';

interface DataItem {
	value: number;
	dimension: string;
}

const StudentFinanceType = () => {
	const { resultSet, isLoading, error } = useCubeData({
		measures: 'student.count',
		dimension: ['student.finance_type'],
		orderBy: ['student.count', 'asc'],
	});
	if (error) {
		console.error('Error fetching data:', error);
	}

	if (isLoading || !resultSet) {
		return;
	}
	const data: DataItem[] = resultSet.tablePivot().map(row => ({
		value: Number(row['student.count']),
		dimension: String(row['student.finance_type']),
	}));
	return (
		<HorizontalBarChart
			data={data}
			title={'Вид финансирования (по количеству студентов)'}
		/>
	);
};

export default StudentFinanceType;
