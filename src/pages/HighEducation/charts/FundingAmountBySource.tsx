import ProjectsChart from '../../../components/Graphs/ProjectsChart';
import { useCubeData } from '../../../hooks/useCubeData';

interface DataItem {
	value: number;
	source: string;
	year: number;
}

const FundingAmountBySource = () => {
	const { resultSet, isLoading, error } = useCubeData({
		measures: 'projects.funding_amount',
		dimension: ['projects.funding_source', 'projects.year'],
		orderBy: ['projects.year', 'asc'],
	});
	if (error) {
		console.error('Error fetching data:', error);
	}

	if (isLoading || !resultSet) {
		return;
	}

	const data: DataItem[] = resultSet.tablePivot().map(row => ({
		value: Number(row['projects.funding_amount']),
		source: String(row['projects.funding_source']),
		year: Number(row['projects.year']),
	}));

	return (
		<ProjectsChart
			data={data}
			title={'Объем финансирования проектов по источнику'}
		/>
	);
};

export default FundingAmountBySource;
