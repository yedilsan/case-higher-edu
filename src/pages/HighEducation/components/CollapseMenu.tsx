import { Col, Collapse, CollapseProps, Row } from 'antd';
import FundingAmountBySource from '../charts/FundingAmountBySource';
import PpsAge from '../charts/PpsAge';
import PpsCitizenship from '../charts/PpsCitizenship';
import PpsScienceDegree from '../charts/PpsScienceDegree';
import PpsScienceRank from '../charts/PpsScienceRank';
import Specialties from '../charts/Specialties';
import StudentAdmissionYear from '../charts/StudentAdmissionYear';
import StudentCitizenship from '../charts/StudentCitizenship';
import StudentFinanceType from '../charts/StudentFinanceType';
import StudentLastEducationType from '../charts/StudentLastEducationType';
import StudentSociallyVulnerable from '../charts/StudentSociallyVulnerable';
import StudentSpecialty from '../charts/StudentSpecialty';
import StudentEmployment from '../charts/StudentsEmployment';
import './component.css';

const items: CollapseProps['items'] = [
	{
		key: '1',
		label: 'Образовательные программы',
		children: (
			<div className='tree-wrapper'>
				<div>
					<Specialties level='Бакалавриат' />
				</div>
				<div>
					<Specialties level='Магистратура' />
				</div>
				<div>
					<Specialties level='Докторантура' />
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
