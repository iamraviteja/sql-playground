export const DATA_TYPES: string[] = ["integer", "float", "char", "text"];

function createColumns(schema: any) {
  return schema.map((o: { colName: any; colType: any; }) => `${o.colName} ${o.colType}`).join(", ");
}

const createValueByType: any = {
  integer: (v: any) => `${parseInt(v)}`,
  char: (v: any) => `'${v.replace("'", "_")}'`,
  text: (v: any) => `'${v.replace("'", "_")}'`,
  float: (v: any) => `${parseFloat(v)}`,
};

function createValues(el: any, schema: any) {
  let val: any = [];

  schema.forEach((s: any) => {
    if (el[s.colName]) {
      val.push(createValueByType[s.colType](el[s.colName]));
    } else {
      val.push("NULL");
    }
  });

  return val.join(", ");
}

export function createTable(
  db: any,
  tableName: string,
  data: any,
  schema: any
) {
  let sqlstr = `DROP TABLE IF EXISTS ${tableName};\n`;
  sqlstr += `CREATE TABLE ${tableName} (${createColumns(schema)});`;
  data = data.slice(0,10);
  data.forEach((el: any) => {
    sqlstr += `INSERT INTO ${tableName} VALUES (${createValues(el, schema)});`;
  });
  db.exec(sqlstr);
}