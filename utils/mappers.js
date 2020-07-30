exports.mapDbColTypesToSqlArgs = colTypes => {
  if (typeof colTypes !== "object" || Array.isArray(colTypes)) {
    return "";
  }

  const sqlArgs = [];
  const cols = Object.keys(colTypes);
  cols.forEach(col => sqlArgs.push(`${col} ${colTypes[col]}`));

  return sqlArgs.join(", ");
};
