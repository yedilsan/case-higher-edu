import PieChart from '../../../components/Graphs/PieChart';
import { useCubeData } from '../../../hooks/useCubeData';

interface DataItem {
	value: number;
	category: string;
}

const StudentLastEducationType = () => {
	const { resultSet, isLoading, error } = useCubeData({
		measures: 'student.count',
		dimension: ['student.last_education_type'],
	});

	if (error) {
		console.error('Error fetching data:', error);
	}

	if (isLoading || !resultSet) {
		return;
	}

	const data: DataItem[] = resultSet.tablePivot().map(row => ({
		value: Number(row['student.count']),
		category: String(row['student.last_education_type']),
	}));

	return (
		<PieChart
			data={data}
			title={'Вид учебного заведения (предыдущее образование)'}
		/>
	);
};

export default StudentLastEducationType;
