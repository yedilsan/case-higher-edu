cube(`students_employment`, {
	sql_table: `ektu.students_employment`,

	data_source: `default`,

	joins: {},

	dimensions: {
		id: {
			sql: `id`,
			type: `number`,
			primary_key: true,
		},

		year: {
			sql: `year`,
			type: `number`,
		},

		percent: {
			sql: `percent`,
			type: `number`,
		},

		specialty: {
			sql: `specialty`,
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

		total: {
			sql: `total`,
			type: `sum`,
		},
	},

	pre_aggregations: {
		// Pre-aggregation definitions go here.
		// Learn more in the documentation: https://cube.dev/docs/caching/pre-aggregations/getting-started
	},
});
