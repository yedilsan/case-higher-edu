import StudentEmploymentChart from '../../../components/Graphs/StudentEmploymentChart';
import { useCubeData } from '../../../hooks/useCubeData';

interface DataItem {
	value: number;
	year: number;
}

const StudentEmployment = () => {
	const { resultSet, isLoading, error } = useCubeData({
		dimension: [
			'students_employment.year',
			'students_employment.percent',
			'students_employment.specialty',
		],
		orderBy: ['students_employment.year', 'asc'],
	});

	if (error) {
		console.error('Error fetching data:', error);
	}

	if (isLoading || !resultSet) {
		return;
	}

	const rawData: DataItem[] = resultSet.tablePivot().map(row => ({
		value: Number(row['students_employment.percent']),
		year: Number(row['students_employment.year']),
	}));

	const yearToDataMap = new Map<number, number[]>();
	rawData.forEach(({ year, value }) => {
		if (!yearToDataMap.has(year)) {
			yearToDataMap.set(year, []);
		}
		yearToDataMap.get(year)?.push(value);
	});

	const data: DataItem[] = Array.from(yearToDataMap.entries()).map(
		([year, values]) => ({
			year,
			value: values.reduce((sum, val) => sum + val, 0) / values.length,
		})
	);

	return (
		<StudentEmploymentChart
			data={data}
			title={'Показатели трудоустройства выпускников в процентах'}
		/>
	);
};

export default StudentEmployment;
