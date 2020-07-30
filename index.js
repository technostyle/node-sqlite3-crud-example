const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(`blog.sqlite3`);

const logIfError = err => err && console.error(err);
const logErrorOr = something => (err, data) => console.log(err || {[something]: data});

db.serialize(async () => {
  db.run(`CREATE TABLE IF NOT EXISTS post (
    id INTEGER PRIMARY KEY,
    text varchar(255), 
    date varchar(255)
  );`, logIfError);

  db.run(`INSERT INTO post(text, date) VALUES(?, ?)`, ['first post',Date.now().toString()], logIfError);
  db.run(`INSERT INTO post(text, date) VALUES(?, ?)`, ['second post',Date.now().toString()], logIfError);
  db.run(`INSERT INTO post(text, date) VALUES(?, ?)`, ['third post',Date.now().toString()], logIfError);
  db.run(`INSERT INTO post(text, date) VALUES(?, ?)`, ['fourth post',Date.now().toString()], logIfError);

  db.all(`SELECT * FROM post`, (err, rows) => console.log(err || {rows}));

  db.each(
    `UPDATE post SET text = ? WHERE text = ?;`, 
    ['coitus', 'sex'], 
    (err, rows) => console.log(err || rows)
  );

  db.run(`INSERT INTO post(text, date) VALUES("fivth post", ${Date.now().toString()})`, logIfError);
  db.all(`SELECT * FROM post WHERE text = "first post"`, logErrorOr('first post'));
  db.run(`UPDATE post SET text = "first post updated" where id = 1`, logIfError);
  db.run(`DELETE FROM post WHERE text = "second post"`, logIfError);
});


db.close();
