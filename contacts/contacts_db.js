import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('contacts.db');
const version = 1;

export default class ContactsDB {

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
      tx.executeSql("DROP TABLE IF EXISTS contact");
      tx.executeSql("DROP TABLE IF EXISTS category");
    });
  }

  static createCategories(db) {
    db.transaction((tx) => {
      tx.executeSql("CREATE TABLE category (id integer primary key, name text);");

      tx.executeSql("INSERT INTO category (id, name) VALUES (1, 'family');");
      tx.executeSql("INSERT INTO category (id, name) VALUES (3, 'work');");
      tx.executeSql("INSERT INTO category (id, name) VALUES (8, 'friends');");
    });
  }

  static createContacts(db) {
    db.transaction((tx) => {
      tx.executeSql("CREATE TABLE contact (id integer primary key AUTOINCREMENT, name text, categoryid integer, tel text, FOREIGN KEY(categoryid) REFERENCES category(id));");

      tx.executeSql("INSERT INTO contact (name, categoryid, tel) VALUES ('Jones, Jeff', 1, '0032 14 263541');");
      tx.executeSql("INSERT INTO contact (name, categoryid, tel) VALUES ('Smith, Olive', 3, '0032 479 6ra59821');");
      tx.executeSql("INSERT INTO contact (name, categoryid, tel) VALUES ('Brown, Amelia', 8, '0032 14 582365');");
      tx.executeSql("INSERT INTO contact (name, categoryid, tel) VALUES ('Johnson, Rick', 3, '0032 472 512421');");
      tx.executeSql("INSERT INTO contact (name, categoryid, tel) VALUES ('Wilson, Bart', 1, '0032 14 585487');");
    });
  }

  static async initDb() {
    if (await this.newerVersionDB(db)) {
      this.dropTables(db);
      this.createCategories(db);
      this.createContacts(db);

      console.log('database created with version ' + version);
    } else {
      console.log('database is already up to date');
    }
  }

  static getContacts() {
    return new Promise((resolve) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM contact",
          [],
          (tx, { rows }) => {
            resolve(rows._array);
          }
        );
      });
    });
  }

  static getCategories() {
    return new Promise((resolve) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM category ORDER BY name",
          [],
          (tx, { rows }) => {
            resolve(rows._array);
          }
        );
      });
    });
  }

  static insertContact(contact) {
    return new Promise((resolve) => {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO contact (name, categoryid, tel) VALUES (?,?,?)",
          [contact.name, contact.categoryid, contact.tel],
          (tx, results) => {
            if (results.rowsAffected == 0) {
              resolve(false);
            } else {
              resolve(true);
            }
          },
          () => resolve(false)
        );
      });
    });
  }

  static updateContact(contact) {
    return new Promise((resolve) => {
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE contact SET name=?, categoryid=?, tel=? where id=?",
          [contact.name, contact.categoryid, contact.tel, contact.id],
          (tx, results) => {
            if (results.rowsAffected == 0) {
              resolve(false);
            } else {
              resolve(true);
            }
          },
          () => resolve(false)
        );
      });
    });
  }

  static deleteContact(id) {
    return new Promise((resolve) => {
      db.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM contact where id=?",
          [id],
          (tx, results) => {
            if (results.rowsAffected == 0) {
              resolve(false);
            } else {
              resolve(true);
            }
          },
          () => resolve(false)
        );
      });
    });
  }

}