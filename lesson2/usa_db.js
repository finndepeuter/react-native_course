import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('usa.db');
const version = 1;

export default class UsaDB {

  static create_config_table(db) {
    return new Promise((resolve) => {
      db.transaction((tx) => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS config_table (c_key text primary key, c_value integer);",
          [],
          (tx, results) => resolve(true)
        );
      });
    });
  }

  static insert_version(db) {
    return new Promise((resolve) => {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT OR IGNORE INTO config_table (c_key, c_value) VALUES ('version', 0);",
          [],
          (tx, results) => resolve(true)
        );
      });
    });
  }

  static update_version(db) {
    return new Promise((resolve) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT c_value FROM config_table where c_key = 'version'",
          [],
          async (tx, { rows }) => {
            if (rows._array[0].c_value != version) {
              tx.executeSql("UPDATE config_table set c_value = ? where c_key= 'version';", [version]);
              resolve(true);
            } else {
              resolve(false);
            }
          }
        );
      });
    });
  }

  static async newerVersionDB(db) {
    await this.create_config_table(db);
    await this.insert_version(db);
    return await this.update_version(db);
  }

  static dropTables(db) {
    db.transaction((tx) => {
      tx.executeSql("DROP TABLE IF EXISTS president");
    });
  }

  static createTables(db) {
    db.transaction((tx) => {
      tx.executeSql("CREATE TABLE president (id integer primary key AUTOINCREMENT, name text, term text);");
    });
  }

  static createPresidents(db) {
    db.transaction((tx) => {
      tx.executeSql("INSERT INTO president (name, term) VALUES ('Roosevelt, Franklin Delano', '1933-1945');");
      tx.executeSql("INSERT INTO president (name, term) VALUES ('Truman, Harry', '1945-1953');");
      tx.executeSql("INSERT INTO president (name, term) VALUES ('Eisenhower, Dwight David', '1953-1961');");
      tx.executeSql("INSERT INTO president (name, term) VALUES ('Kennedy, John Fitzgerald', '1961-1963');");
      tx.executeSql("INSERT INTO president (name, term) VALUES ('Johnson, Lyndon Baines', '1963-1969');");
      tx.executeSql("INSERT INTO president (name, term) VALUES ('Nixon, Richard Milhous', '1969-1974');");
      tx.executeSql("INSERT INTO president (name, term) VALUES ('Ford, Gerald Rudolph', '1974-1977');");
      tx.executeSql("INSERT INTO president (name, term) VALUES ('Carter, James Earl Jr.', '1977-1981');");
      tx.executeSql("INSERT INTO president (name, term) VALUES ('Reagan, Ronald Wilson', '1981-1989');");
      tx.executeSql("INSERT INTO president (name, term) VALUES ('Bush, George Herbert Walker', '1989-1993');");
      tx.executeSql("INSERT INTO president (name, term) VALUES ('Clinton, William Jefferson', '1993-2001');");
      tx.executeSql("INSERT INTO president (name, term) VALUES ('Bush, George Walker', '2001-2009');");
      tx.executeSql("INSERT INTO president (name, term) VALUES ('Obama, Barack Hussein', '2009-2017');");
      tx.executeSql("INSERT INTO president (name, term) VALUES ('Trump, Donald John', '2017-2021');");
      tx.executeSql("INSERT INTO president (name, term) VALUES ('Biden, Joseph Robinette', '2021-2025');");
    });
  }

  static async initDb() {
    if (await this.newerVersionDB(db)) {
      this.dropTables(db);
      this.createTables(db);
      this.createPresidents(db);

      console.log('database created with version ' + version);
    } else {
      console.log('database is already up to date');
    }
  }

}