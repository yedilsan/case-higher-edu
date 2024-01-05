import { Col, Collapse, CollapseProps, Row } from 'antd';
import TreeData from '../components/TreeTable';
import ColumnChart from './Graphs/ColumnChart';
import ColumnDateAxisChart from './Graphs/ColumnDateAxisChart';
import HorizontalBarChart from './Graphs/HorizontalBarChart';
import PieChart from './Graphs/PieChart';
import ProjectsChart from './Graphs/ProjectsChart';
import StackedColumnChart from './Graphs/StackedColumnChart';
import StudentEmployment from './Graphs/StudentEmploymentChart';
import './component.css';

const items: CollapseProps['items'] = [
	{
		key: '1',
		label: 'Образовательные программы',
		children: (
			<div className='tree-wrapper'>
				<div>
					<TreeData level='Бакалавриат' />
				</div>
				<div>
					<TreeData level='Магистратура' />
				</div>
				<div>
					<TreeData level='Докторантура' />
				</div>
			</div>
		),
	},
	{
		key: '2',
		label: 'ППС',
		children: (
			<Row className='charts'>
				<Col className='chart_layout'>
					<PieChart measures='pps.count' dimension='pps.citizenship' />
				</Col>
				<Col className='chart_layout'>
					<HorizontalBarChart
						measures='pps.count'
						dimension='pps.science_rank'
					/>
				</Col>
				<Col className='chart_layout'>
					<HorizontalBarChart
						measures='pps.count'
						dimension='pps.science_degree'
					/>
				</Col>
				<Col className='chart_layout'>
					<ColumnDateAxisChart measures='pps.count' dimension='pps.age' />
				</Col>
			</Row>
		),
	},
	{
		key: '3',
		label: 'Студенты',
		children: (
			<Row className='charts'>
				<Col className='chart_layout'>
					<HorizontalBarChart
						measures='student.count'
						dimension='student.finance_type'
					/>
				</Col>
				<Col className='chart_layout'>
					<HorizontalBarChart
						measures='student.count'
						dimension='student.specialty'
					/>
				</Col>
				<Col className='chart_layout'>
					<StackedColumnChart
						measures='student.count'
						dimension={['student.admission_year', 'student.study_language']}
					/>
				</Col>
				<Col className='chart_layout'>
					<ColumnChart
						measures='student.count'
						dimension='student.citizenship'
					/>
				</Col>
				<Col className='chart_layout'>
					<PieChart
						measures='student.count'
						dimension='student.last_education_type'
					/>
				</Col>
				<Col className='chart_layout'>
					<ColumnChart
						measures='student.count'
						dimension='student.socially_vulnerable'
					/>
				</Col>
			</Row>
		),
	},
	{
		key: '4',
		label: 'Проектная деятельность',
		children: <ProjectsChart />,
	},
	{
		key: '5',
		label: 'Трудоустройство выпускников',
		children: <StudentEmployment />,
	},
	{
		key: '6',
		label: 'Публикации',
		children: <p>Нет данных</p>,
	},
];

const CollapseMenu = () => {
	return (
		<>
			<div className='page__wrapper'>
				<div className='page__collapse'>
					<Collapse accordion items={items} size='large' />
				</div>
			</div>
		</>
	);
};

export default CollapseMenu;
