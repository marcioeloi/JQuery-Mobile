//  Declare SQL Query for SQLite

var createStatement = new Array();
        
createStatement[0] = "CREATE TABLE IF NOT EXISTS Dados_Usuario (id INTEGER PRIMARY KEY AUTOINCREMENT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, idade REAL, peso_kg REAL, altura_m Real, necessidade_calorica REAL, sexo TEXT, rotina_fisica TEXT)";
createStatement[1] = "CREATE TABLE IF NOT EXISTS Recomendacao_Macro (id INTEGER PRIMARY KEY AUTOINCREMENT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, p_proteina REAL, p_carbo REAL, p_saturados REAL, p_monoinsaturados REAL, p_poliinsaturados REAL)";
createStatement[2] = "CREATE TABLE IF NOT EXISTS Distribuicao_Calorica (id INTEGER PRIMARY KEY AUTOINCREMENT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, desjejum_p REAL, desjejum_hora TIME, colacao_p REAL, colacao_hora TIME, almoco_p REAL, almoco_hora TIME, lanche_tarde_p REAL, lanche_tarde_hora TIME, janta_p REAL, janta_hora TIME, ceia_p REAL, ceia_hora TIME)";
createStatement[3] = "CREATE TABLE IF NOT EXISTS Medicao_Glicemia (id INTEGER PRIMARY KEY AUTOINCREMENT, data DATE, hora TIME, valor_dml REAL, jejum TEXT)";
createStatement[4] = "CREATE TABLE IF NOT EXISTS Uso_Medicamento (id INTEGER PRIMARY KEY AUTOINCREMENT, data DATE, hora TIME, medicamento TEXT, unidade TEXT, quantidade REAL)";
createStatement[5] = "CREATE TABLE IF NOT EXISTS Atividade_Fisica (id INTEGER PRIMARY KEY AUTOINCREMENT, data DATE, hora TIME, exercicio TEXT, intensidade TEXT, duracao_min REAL)";
createStatement[6] = "CREATE TABLE IF NOT EXISTS Receitas_Medicas (id INTEGER PRIMARY KEY AUTOINCREMENT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, medicamento TEXT, unidade TEXT, quantidade REAL)";
createStatement[7] = "CREATE TABLE IF NOT EXISTS Alimentos_TACO (id INTEGER PRIMARY KEY, nome_alimento TEXT, calorias_kcal REAL, calorias_joules REAL, proteinas_g REAL, carboidratos_g REAL, lipideos_g REAL, colesterol_mg REAL, fibra_g REAL)";
createStatement[8] = "CREATE TABLE IF NOT EXISTS Refeicao (id INTEGER PRIMARY KEY, data DATE, hora TIME, calorias_total REAL, proteinas_total REAL, carboidratos_total REAL, lipideos_total REAL)";
createStatement[9] = "CREATE TABLE IF NOT EXISTS Alimentos_Refeicao (id_refeicao INTEGER, id_alimento INTEGER, nome_alimento TEXT, quantidade_g REAL, calorias_parcial REAL, proteinas_parcial REAL, carboidratos_parcial REAL, lipideos_parcial REAL, PRIMARY KEY(id_refeicao, id_alimento))";

//var insertAlimentos = "BULK INSERT Alimentos_TACO FROM 'C:\TACO.csv' WITH ( FIELDTERMINATOR = '|', ROWTERMINATOR = '\n' )";

//Open SQLite Database -OK
var db = openDatabase("AddressBook", "1.0", "Address Book", 200000);
 
var dataset;
 
var DataType;
//End of Open SQLite variables.

function initDatabase(){  // Function Call When Page is ready. -OK
    try {
        if (!window.openDatabase){  // Check browser is supported SQLite or not.
            alert('Databases are not supported in this browser.');
        }
        else{
            for (var i = 0; i < createStatement.length; i++){
                createTable(createStatement[i]);  // If supported then call Function for create table in SQLite
            }
            insertTable();
        }
    }
    catch (e) {
        if (e === 2){// Version number mismatch.
            console.log("Invalid database version.");
        }
        else{
            console.log("Unknown error " + e + ".");
        }
        return;
    }
}

function onError(tx, error){ // Function for Hendeling Error... -OK
    //alert(error.message);
}

function createTable(createTable){  // Function for Create Table in SQLite. -OK
        db.transaction(function (tx) { tx.executeSql(createTable, [], onError); });
}

function deleteRecord(table, id){ // Get id of record . Function Call when Delete Button Click.. -OK
    var deleteStatement = "DELETE FROM "+ table +" WHERE id = ?";
    db.transaction(function (tx) { tx.executeSql(deleteStatement, [id], onError); });
}

function dropTable(table){ // Function Call when Drop Button Click.. Talbe will be dropped from database. -OK
    var dropStatement = "DROP TABLE "+ table;
    db.transaction(function (tx) { tx.executeSql(dropStatement, [], onError); });
    //initDatabase();
}

function dropAllTable(){
    var data = new Array();
        data[0] = "Dados_Usuario";
        data[1] = "Recomendacao_Macro";
        data[2] = "Distribuicao_Calorica";
        data[3] = "Medicao_Glicemia";
        data[4] = "Uso_Medicamento";
        data[5] = "Atividade_Fisica";
        data[6] = "Receitas_Medicas";
        data[7] = "Alimentos_TACO";
        data[8] = "Refeicao";
        data[9] = "Alimentos_Refeicao";
        
         for (var i = 0; i < data.length; i++) {
             dropTable(data[i]);
         }
         initDatabase();
}

$(document).ready(function (){ // Call function when page is ready for load..
                                //$("body").fadeIn(2000); // Fade In Effect when Page Load..
                                initDatabase();
                             }
);