cube(`specialties_count`, {
  sql_table: `ektu.specialties_count`,
  
  data_source: `default`,
  
  joins: {
    
  },
  
  dimensions: {
    parent_name: {
      sql: `parent_name`,
      type: `string`
    },
    
    spec_group: {
      sql: `spec_group`,
      type: `string`
    },
    
    spec_name: {
      sql: `spec_name`,
      type: `string`
    }
  },
  
  measures: {
    count: {
      type: `count`
    }
  },
  
  pre_aggregations: {
    // Pre-aggregation definitions go here.
    // Learn more in the documentation: https://cube.dev/docs/caching/pre-aggregations/getting-started
  }
});
