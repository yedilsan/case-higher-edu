import Table, { ColumnType } from 'antd/es/table';
import './component.css';

interface DataType {
	key: React.ReactNode;
	name: string;
	count: number;
	children?: DataType[];
}

interface TreeTableProps {
	columns: ColumnType<DataType>[];
	data: DataType[];
}

const TreeTable = ({ columns, data }: TreeTableProps) => {
	return (
		<>
			<Table
				columns={columns}
				dataSource={data}
				showHeader={false}
				pagination={false}
				className='edu-table'
			/>
		</>
	);
};

export default TreeTable;
