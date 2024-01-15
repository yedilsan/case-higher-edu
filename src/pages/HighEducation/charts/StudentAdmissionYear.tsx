import StackedColumnChart from '../../../components/Graphs/StackedColumnChart';
import { useCubeData } from '../../../hooks/useCubeData';

interface LanguageData {
	year: string;
	[language: string]: string | number;
}

const StudentAdmissionYear = () => {
	const { resultSet, isLoading, error } = useCubeData({
		measures: 'student.count',
		dimension: ['student.admission_year', 'student.study_language'],
		orderBy: ['student.admission_year', 'asc'],
	});

	if (error) {
		console.error('Error fetching data:', error);
	}

	if (isLoading || !resultSet) {
		return;
	}

	const pivotData = resultSet.tablePivot().map(row => ({
		year: String(row['student.admission_year']),
		lang: String(row['student.study_language']),
		count: Number(row['student.count']),
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

	return (
		<StackedColumnChart
			data={data}
			title='Количество обучающихся студентов по году поступления'
		/>
	);
};

export default StudentAdmissionYear;
