import { useCubeQuery } from '@cubejs-client/react';
import { ConfigProvider, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import cubejsApi from '../service/cubejsConfig';
import './component.css';

interface DataType {
	key: React.ReactNode;
	name: string;
	count: number;
	children?: DataType[];
}

interface TreeTableProps {
	level: string;
}

interface SpecialtyData {
	'specialties.level': string;
	'specialties.group_name': string;
	'specialties.direction': string;
	'specialties.name': string;
	'specialties.count': number;
}

const columns: ColumnsType<DataType> = [
	{
		dataIndex: 'name',
		key: 'name',
	},
	{
		dataIndex: 'count',
		key: 'count',
		width: '12%',
	},
];

const TreeTable = ({ level }: TreeTableProps) => {
	const [data, setData] = useState<DataType[]>([]);

	const buildTree = (rows: SpecialtyData[]): DataType[] => {
		const tree: DataType[] = [];

		rows.forEach((row, index) => {
			const level = String(row['specialties.level']);
			const groupName = String(row['specialties.group_name']);
			const direction = String(row['specialties.direction']);
			const name = String(row['specialties.name']);
			const count = Number(row['specialties.count']);

			const key = `${level}-${groupName}-${direction}-${name}-${index}`;

			let levelNode = tree.find(node => node.name === level);

			if (!levelNode) {
				levelNode = {
					key: `${key}-level`,
					name: level,
					count: 0,
					children: [],
				};
				tree.push(levelNode);
			}

			let groupNode = levelNode.children?.find(node => node.name === groupName);

			if (!groupNode) {
				groupNode = {
					key: `${key}-group`,
					name: groupName,
					count: 0,
					children: [],
				};
				levelNode.children?.push(groupNode);
			}

			let directionNode = groupNode.children?.find(
				node => node.name === direction
			);

			if (!directionNode) {
				directionNode = {
					key: `${key}-direction`,
					name: direction,
					count: 0,
					children: [],
				};
				groupNode.children?.push(directionNode);
			}

			const nameNode: DataType = {
				key: `${key}-name`,
				name: name,
				count: count,
			};

			// Increment count for the corresponding node
			levelNode.count += count;
			groupNode.count += count;
			directionNode.count += count;

			directionNode.children?.push(nameNode);
		});

		return tree;
	};

	const { resultSet, isLoading, error } = useCubeQuery(
		{
			measures: ['specialties.count'],
			dimensions: [
				'specialties.level',
				'specialties.direction',
				'specialties.group_name',
				'specialties.name',
			],
			filters: [
				{
					dimension: 'specialties.level',
					operator: 'contains',
					values: [level],
				},
			],
		},
		{ cubejsApi }
	);

	useEffect(() => {
		if (resultSet) {
			const pivotData: unknown = resultSet.tablePivot();
			const treeData = buildTree(pivotData as SpecialtyData[]);
			setData(treeData);
		}
	}, [resultSet, level]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error.toString()}</div>;
	}

	if (!resultSet) {
		return null;
	}

	return (
		<>
			<ConfigProvider
				theme={{
					token: {
						// colorBgContainer: "#19375b",
					},
					components: {
						Table: {
							cellFontSize: 12,
							headerBorderRadius: 0,
						},
					},
				}}
			>
				<Table
					columns={columns}
					dataSource={data}
					showHeader={false}
					pagination={false}
					className='edu-table'
				/>
			</ConfigProvider>
		</>
	);
};

export default TreeTable;
