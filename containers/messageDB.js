const knexLib = require("knex");

class ContainerMemoryDB {
  constructor(options) {
    this.bd = "message";
    this.knex = knexLib(options);
  }

  crearTabla() {
    return this.knex.schema.dropTableIfExists(this.bd).finally(() => {
      return this.knex.schema.createTable(this.bd, (table) => {
        table.increments("id").primary();
        table.string("email", 50).notNullable();
        table.string("message", 100).notNullable();
      });
    });
  }

  save(message) {
    return this.knex(this.bd).insert(message);
  }

  listAll() {
    return this.knex.from(this.bd).select("*");
  }

  eliminar(id) {
    return this.knex.from(this.bd).where("id", id).del();
  }

  actualizar(condition , parameters) {
    return this.knex.from(this.bd).where(condition).update(parameters);
}

  cerrarConexion() {
    this.knex.destroy();
  }
}

module.exports = ContainerMemoryDB;
