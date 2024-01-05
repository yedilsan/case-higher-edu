cube(`specialties`, {
  sql_table: `ektu.specialties`,
  
  data_source: `default`,
  
  joins: {
    
  },
  
  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primary_key: true
    },
    
    direction: {
      sql: `direction`,
      type: `string`
    },
    
    level: {
      sql: `level`,
      type: `string`
    },
    
    name: {
      sql: `name`,
      type: `string`
    },
    
    direction_code: {
      sql: `direction_code`,
      type: `string`
    },
    
    group_code: {
      sql: `group_code`,
      type: `string`
    },
    
    group_name: {
      sql: `group_name`,
      type: `string`
    },
    
    code: {
      sql: `code`,
      type: `string`
    },
    
    created_at: {
      sql: `created_at`,
      type: `time`
    },
    
    modified_at: {
      sql: `modified_at`,
      type: `time`
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
