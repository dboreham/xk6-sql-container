import sql from 'k6/x/sql';

const db = sql.open("postgres", "postgresql://md:md@host.docker.internal:5432/md?sslmode=disable");

export function setup() {
	  db.exec(`CREATE TABLE IF NOT EXISTS testtable
		  (
			      field1 text
		  )
		  WITH (
			      OIDS = FALSE
		  );`);
}

export function teardown() {
	  db.close();
}

export default function () {
  var fieldValue = Date.now();	
  db.exec('INSERT INTO testtable VALUES (\'' + fieldValue + '\')');
}
