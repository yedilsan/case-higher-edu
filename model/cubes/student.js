cube(`student`, {
	sql_table: `ektu.student`,

	data_source: `default`,

	joins: {},

	dimensions: {
		id: {
			sql: `id`,
			type: `number`,
			primary_key: true,
		},

		family_status: {
			sql: `family_status`,
			type: `string`,
		},

		study_language: {
			sql: `study_language`,
			type: `string`,
		},

		disability: {
			sql: `disability`,
			type: `string`,
		},

		specialty: {
			sql: `specialty`,
			type: `string`,
		},

		last_education_study_language: {
			sql: `last_education_study_language`,
			type: `string`,
		},

		finance_type: {
			sql: `finance_type`,
			type: `string`,
		},

		code: {
			sql: `code`,
			type: `string`,
		},

		nationality: {
			sql: `nationality`,
			type: `string`,
		},

		socially_vulnerable: {
			sql: `socially_vulnerable`,
			type: `string`,
		},

		last_education_type: {
			sql: `last_education_type`,
			type: `string`,
		},

		citizenship: {
			sql: `citizenship`,
			type: `string`,
		},

		admission_year: {
			sql: `admission_year`,
			type: `number`,
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
