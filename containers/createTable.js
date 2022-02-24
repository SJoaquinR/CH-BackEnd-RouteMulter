const { optionsMySql } = require("./utils/optionsMySql");
const memoryDB = require("./memoryDB");
 
const { optionsSqlite } = require("./utils/optionsSqlite");
const MessageDB = require("./messageDB");

const modeloMemoryDB = new memoryDB(optionsMySql);

const batchMemoryDB = async () => {
  try {
    console.log("1) tabla creada");
    await modeloMemoryDB.crearTabla();
  } catch (error) {
    console.error(error);
  } finally {
    modeloMemoryDB.cerrarConexion();
  }
};
batchMemoryDB();

const modeloMessageDB = new MessageDB(optionsSqlite);

const batchMessageDB = async () => {
    try {
      console.log("1) tabla creada");
      await modeloMessageDB.crearTabla();
    } catch (error) {
      console.error(error);
    } finally {
        modeloMessageDB.cerrarConexion();
    }
  };
  batchMessageDB();