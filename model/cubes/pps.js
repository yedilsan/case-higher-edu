cube(`pps`, {
	sql_table: `ektu.pps`,

	data_source: `default`,

	joins: {},

	dimensions: {
		id: {
			sql: `id`,
			type: `number`,
			primary_key: true,
		},

		age: {
			sql: `age`,
			type: `number`,
		},

		science_rank: {
			sql: `science_rank`,
			type: `string`,
		},

		citizenship: {
			sql: `citizenship`,
			type: `string`,
		},

		hindex: {
			sql: `hindex`,
			type: `string`,
		},

		science_degree: {
			sql: `science_degree`,
			type: `string`,
		},

		code: {
			sql: `code`,
			type: `string`,
		},

		created_at: {
			sql: `created_at`,
			type: `time`,
		},

		modified_at: {
			sql: `modified_at`,
			type: `time`,
		},
	},

	measures: {
		count: {
			type: `count`,
		},
	},

	pre_aggregations: {
		// Pre-aggregation definitions go here.
		// Learn more in the documentation: https://cube.dev/docs/caching/pre-aggregations/getting-started
	},
});
