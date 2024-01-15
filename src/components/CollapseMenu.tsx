import { Col, Collapse, CollapseProps, Row } from 'antd';
import FundingAmountBySource from '../pages/HighEducation/charts/FundingAmountBySource';
import PpsAge from '../pages/HighEducation/charts/PpsAge';
import PpsCitizenship from '../pages/HighEducation/charts/PpsCitizenship';
import PpsScienceDegree from '../pages/HighEducation/charts/PpsScienceDegree';
import PpsScienceRank from '../pages/HighEducation/charts/PpsScienceRank';
import StudentAdmissionYear from '../pages/HighEducation/charts/StudentAdmissionYear';
import StudentCitizenship from '../pages/HighEducation/charts/StudentCitizenship';
import StudentFinanceType from '../pages/HighEducation/charts/StudentFinanceType';
import StudentLastEducationType from '../pages/HighEducation/charts/StudentLastEducationType';
import StudentSociallyVulnerable from '../pages/HighEducation/charts/StudentSociallyVulnerable';
import StudentSpecialty from '../pages/HighEducation/charts/StudentSpecialty';
import StudentEmployment from '../pages/HighEducation/charts/StudentsEmployment';
import TreeData from './TreeTable';
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
					<PpsCitizenship />
				</Col>
				<Col className='chart_layout'>
					<PpsScienceRank />
				</Col>
				<Col className='chart_layout'>
					<PpsScienceDegree />
				</Col>
				<Col className='chart_layout'>
					<PpsAge />
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
					<StudentFinanceType />
				</Col>
				<Col className='chart_layout'>
					<StudentSpecialty />
				</Col>
				<Col className='chart_layout'>
					<StudentAdmissionYear />
				</Col>
				<Col className='chart_layout'>
					<StudentCitizenship />
				</Col>
				<Col className='chart_layout'>
					<StudentLastEducationType />
				</Col>
				<Col className='chart_layout'>
					<StudentSociallyVulnerable />
				</Col>
			</Row>
		),
	},
	{
		key: '4',
		label: 'Проектная деятельность',
		children: <FundingAmountBySource />,
	},
	{
		key: '5',
		label: 'Трудоустройство выпускников',
		children: (
			// <StudentEmploymentChart
			// 	filters={{
			// 		dimension: [
			// 			'students_employment.year',
			// 			'students_employment.percent',
			// 			'students_employment.specialty',
			// 		],
			// 		orderBy: ['students_employment.year', 'asc'],
			// 	}}
			// 	title='Показатели трудоустройства выпускников в процентах'
			// />
			<StudentEmployment />
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
