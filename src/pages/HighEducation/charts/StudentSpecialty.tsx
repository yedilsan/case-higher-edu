import HorizontalBarChart from '../../../components/Graphs/HorizontalBarChart';
import { useCubeData } from '../../../hooks/useCubeData';

interface DataItem {
	value: number;
	dimension: string;
}

const StudentSpecialty = () => {
	const { resultSet, isLoading, error } = useCubeData({
		measures: 'student.count',
		dimension: ['student.specialty'],
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
		dimension: String(row['student.specialty']),
	}));
	return (
		<HorizontalBarChart
			data={data}
			title={'Количество обучающихя студентов по специальности'}
		/>
	);
};

export default StudentSpecialty;
