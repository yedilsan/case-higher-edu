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
					<PieChart
						filters={{
							measures: 'pps.count',
							dimension: 'pps.citizenship',
						}}
						title='Гражданство преподавателей'
					/>
				</Col>
				<Col className='chart_layout'>
					<HorizontalBarChart
						filters={{
							measures: 'pps.count',
							dimension: 'pps.science_rank',
						}}
						title='Количество ППС по ученому званию'
					/>
				</Col>
				<Col className='chart_layout'>
					<HorizontalBarChart
						filters={{
							measures: 'pps.count',
							dimension: 'pps.science_degree',
						}}
						title='Количество ППС по ученой степени'
					/>
				</Col>
				<Col className='chart_layout'>
					<ColumnDateAxisChart
						filters={{
							measures: 'pps.count',
							dimension: 'pps.age',
						}}
						title='Количество ППС по возрастной категории'
					/>
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
						filters={{
							measures: 'student.count',
							dimension: 'student.finance_type',
						}}
						title='Вид финансирования (по количеству студентов'
					/>
				</Col>
				<Col className='chart_layout'>
					<HorizontalBarChart
						filters={{
							measures: 'student.count',
							dimension: 'student.specialty',
						}}
						title='Количество обучающихя студентов по специальности'
					/>
				</Col>
				<Col className='chart_layout'>
					<StackedColumnChart
						filters={{
							measures: 'student.count',
							dimension: ['student.admission_year', 'student.study_language'],
							orderBy: ['student.admission_year', 'asc'],
						}}
						title='Количество обучающихся студентов по году поступления'
					/>
				</Col>
				<Col className='chart_layout'>
					<ColumnChart
						filters={{
							measures: 'student.count',
							dimension: 'student.citizenship',
						}}
						title='Контингент студентов'
					/>
				</Col>
				<Col className='chart_layout'>
					<PieChart
						filters={{
							measures: 'student.count',
							dimension: 'student.last_education_type',
						}}
						title='Вид учебного заведения (предыдущее образование)'
					/>
				</Col>
				<Col className='chart_layout'>
					<ColumnChart
						filters={{
							measures: 'student.count',
							dimension: 'student.socially_vulnerable',
						}}
						title='Принадлежность к социально-уязвимым слоям'
					/>
				</Col>
			</Row>
		),
	},
	{
		key: '4',
		label: 'Проектная деятельность',
		children: (
			<ProjectsChart
				filters={{
					measures: 'projects.funding_amount',
					dimension: ['projects.funding_source', 'projects.year'],
					orderBy: ['projects.year', 'asc'],
				}}
				title='Объем финансирования проектов по источнику'
			/>
		),
	},
	{
		key: '5',
		label: 'Трудоустройство выпускников',
		children: (
			<StudentEmployment
				filters={{
					dimension: [
						'students_employment.year',
						'students_employment.percent',
						'students_employment.specialty',
					],
					orderBy: ['students_employment.year', 'asc'],
				}}
				title='Показатели трудоустройства выпускников в процентах'
			/>
		),
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
