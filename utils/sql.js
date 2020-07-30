const { mapDbColTypesToSqlArgs } = require("./mappers");

exports.CREATE_TABLE = (name, colTypes) =>
  `CREATE TABLE IF NOT EXISTS ${name} (${mapDbColTypesToSqlArgs(colTypes)});`;
