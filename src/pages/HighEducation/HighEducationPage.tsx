import Filter from '../../components/Filter';
import CollapseMenu from './components/CollapseMenu';

const HighEducationPage = () => {
	return (
		<div
			style={{
				display: 'flex',
				position: 'relative',
				flexDirection: 'column',
			}}
		>
			<div
				style={{
					marginLeft: 'auto',
				}}
			>
				<Filter />
			</div>
			<div>
				<CollapseMenu />
			</div>
		</div>
	);
};

export default HighEducationPage;
