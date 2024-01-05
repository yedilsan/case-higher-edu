cube(`projects`, {
	sql_table: `ektu.projects`,

	data_source: `default`,

	joins: {},

	dimensions: {
		id: {
			sql: `id`,
			type: `number`,
			primary_key: true,
		},

		funding_source: {
			sql: `funding_source`,
			type: `string`,
		},

		year: {
			sql: `year`,
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

		funding_amount: {
			sql: `funding_amount`,
			type: `sum`,
		},
	},

	pre_aggregations: {
		// Pre-aggregation definitions go here.
		// Learn more in the documentation: https://cube.dev/docs/caching/pre-aggregations/getting-started
	},
});
