//Funções responsáveis pelos dados da Tabela TACO

// Pega valores da Tabela TACO em um campo testo e insere no banco de dados.
  function insertTable(){
      //inserir função de loader aqui
      var input = $("#tabela_taco").val();
      var data = $.csv.toArrays(input);
      var html = "";
      var cont =0;
      for(var row in data) {
        html = "INSERT INTO Alimentos_TACO (id,  nome_alimento, calorias_kcal, calorias_joules, proteinas_g, carboidratos_g, lipideos_g, colesterol_mg, fibra_g) VALUES (";
        html += cont;
        cont++;
        for(var item in data[row]) {
          html += ", '" + data[row][item] +"'";
        }
        html += ")";
        insertAlimentos(html);
        $('#resultado').append(html +"<p/>");
      }
      //inserir fechamento do loader aqui
  }
  
  // Realiza a inserção no banco, linha a linha.
  function insertAlimentos(InsertStatement){
      db.transaction(function (tx) { tx.executeSql(InsertStatement, [], onError); });
  }