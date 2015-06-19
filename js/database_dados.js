// Funções relacionadas a dados do usuário envolvendo banco de dados.

// Insere os dados do usuário na tabela Dados_Usuario.
function insertRecord_alterar_dados(){
        
        var data = new Array();
        data[0] = $("#idade").val();
        data[1] = $("#peso").val();
        data[2] = $("#altura").val();
        data[3] = $("input:radio[name=sexo]:checked").val();
        data[4] = $("input:radio[name=rotina]:checked").val();
        data[5] = $("#necessidade_calorica").val();
        //data[6] = "datetime(1092941466, 'unixepoch', 'localtime')";
        
        for (var i = 0; i < data.length; i++) {
            if (data[i] === null || data[i] === ""){
                alert("Campos em branco! Preencha todos para continuar.");
                document.getElementById("salvar_usuario").setAttribute("href", "#");
                return false;
            }
        }

        var insertStatement = "INSERT INTO Dados_Usuario (idade, peso_kg, altura_m, sexo, rotina_fisica, necessidade_calorica) VALUES (?, ?, ?, ?, ?, ?)";
        db.transaction(function (tx) { tx.executeSql(insertStatement, [data[0], data[1], data[2], data[3], data[4], data[5]], onError); });
        //tx.executeSql(SQL Query Statement,[ Parameters ] , Sucess Result Handler Function, Error Result Handler Function );
        
        document.getElementById("salvar_usuario").setAttribute("href", "#alterar_dados");
}

// Insere as porcentagens de macronutrientes recomendadas na tabela Recomendacao_Macro.
function insertRecord_macronutrientes(){
        var data = new Array();
        data[0] = $("#p_proteina").val();
        data[1] = $("#p_carbo").val();
        data[2] = $("#p_saturados").val();
        data[3] = $("#p_monoinsaturados").val();
        data[4] = $("#p_poliinsaturados").val();
        
        var sum = 0;
        for (i = 0; i < data.length; i++) {
            if (data[i] === null || data[i] === ""){
                alert("Campos em branco! Preencha todos para continuar.");
                return false;
            }
            sum = sum + parseInt(data[i]);
        }
        if (sum > 100){
                alert("A soma das porcentagens ultrapassa 100%! Preencha adequadamente para continuar.");
                return false;
        }
        
        var insertStatement = "INSERT INTO Recomendacao_Macro (p_proteina, p_carbo, p_saturados, p_monoinsaturados, p_poliinsaturados) VALUES (?, ?, ?, ?, ?)";
        db.transaction(function (tx) { tx.executeSql(insertStatement, [data[0], data[1], data[2], data[3], data[4]], onError); });
        //tx.executeSql(SQL Query Statement,[ Parameters ] , Sucess Result Handler Function, Error Result Handler Function );
}

// Insere na tabela Distribuicao_Calorica o horário indicado para cada refeição, juntamente com a porcentagem de calorias do dia indicada.
function insertRecord_dist_calorica(){
        var data = new Array();
        data[0] = $("#hora_desjejum").val();
        data[1] = $("#porcentagem_desjejum").val();
        
        data[2] = $("#hora_colacao").val();
        data[3] = $("#porcentagem_colacao").val();
        
        data[4] = $("#hora_almoco").val();
        data[5] = $("#porcentagem_almoco").val();
        
        data[6] = $("#hora_lanche").val();
        data[7] = $("#porcentagem_lanche").val();
        
        data[8] = $("#hora_jantar").val();
        data[9] = $("#porcentagem_jantar").val();
        
        data[10] = $("#hora_ceia").val();
        data[11] = $("#porcentagem_ceia").val();
                 
        var sum = 0;
        for (i = 1; i < data.length; i=i+2) {
            if (data[i] === null || data[i] === ""){
                alert("Campos em branco! Preencha todos para continuar.");
                document.getElementById("salvar_porcentagens").setAttribute("href", "#");
                return false;
            }
            sum = sum + parseInt(data[i]);
            if (sum > 100){
                alert("A soma das porcentagens ultrapassa 100%! Preencha adequadamente para continuar.");
                document.getElementById("salvar_porcentagens").setAttribute("href", "#");
                resetForm("form_dist_calorica");
                return false;
            }
        }
        
        var insertStatement = "INSERT INTO Distribuicao_Calorica (desjejum_p, desjejum_hora, colacao_p, colacao_hora, almoco_p, almoco_hora, lanche_tarde_p, lanche_tarde_hora, janta_p, janta_hora, ceia_p, ceia_hora) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        db.transaction(function (tx) { tx.executeSql(insertStatement, [data[1], data[0], data[3], data[2], data[5], data[4], data[7], data[6], data[9], data[8], data[11], data[10]], onError); });
        //tx.executeSql(SQL Query Statement,[ Parameters ] , Sucess Result Handler Function, Error Result Handler Function );
        
        document.getElementById("salvar_porcentagens").setAttribute("href", "#recomendacoes");
}

// Insere na tabela Receitas_Medicas as indicações de medicamentos.
function insertRecords_receitas(){
    var data = new Array();
    data[0] = $("#nome_medicamento_receita").val();
    data[1] = $("#quantidade_medicamento_receita").val();
    data[2] = $("#escolha_unidade_receita").val();
    
    for (i = 0; i < data.length; i++) {
            if (data[i] === null || data[i] === ""){
                alert("Campos em branco! Preencha todos para continuar.");
                return false;
            }
    }

    var insertStatement = "INSERT INTO Receitas_Medicas (medicamento, quantidade, unidade) VALUES (?, ?, ?)";
    db.transaction(function (tx) { tx.executeSql(insertStatement, [data[0], data[1], data[2]], onError); });
    //tx.executeSql(SQL Query Statement,[ Parameters ] , Sucess Result Handler Function, Error Result Handler Function );

    resetForm("form_receitas_medicas"); 
    
    showRecords_receitas();
}

// Exibe uma lista contendo todas as inseções da tabela Receitas_Medicas, e botões para Apagar ou Editar os dados.
function showRecords_receitas(){
    $("#lista_de_receitas_ul").html('');
    var selectAllStatement = "SELECT * FROM Receitas_Medicas";
    var tabela_aspas = "'Receitas_Medicas'";
        
    db.transaction(function (tx) {
         tx.executeSql(selectAllStatement, [], function (tx, result) {
             dataset = result.rows;
             for (var i = 0, row = null; i < dataset.length; i++) {
                 row = dataset.item(i);
                 var nome_aspas = "'"+ row["medicamento"] +"'";
                 var quant_aspas = "'"+ row["quantidade"] +"'";
                 var uni_aspas = "'"+ row["unidade"] +"'";
                 
                 var linkeditdelete = '<li class="ui-body ui-body-b">'+
                                            '<fieldset class="ui-grid-b">'+
                                                '<div class="ui-block-a"><label>'+ row["medicamento"] +'; '+ row["quantidade"] +'; '+ row["unidade"] +';</label></div>'+
                                                '<div class="ui-block-b" id="div_apagar_'+ i +'"><a href="#" id="button_apagar_receita'+ i +'" data-role="button" data-theme="a" data-mini="true" onclick="deleteAndshowReceita('+ tabela_aspas +', '+ row["id"] +')">Apagar</a></div>'+
                                                '<div class="ui-block-c" id="div_editar_'+ i +'"><a href="#" id="button_editar_receita'+ i +'" data-role="button" data-theme="a" data-mini="true" onclick="editRecord_receita('+ nome_aspas +', '+ quant_aspas +', '+ uni_aspas +', '+ row["id"] +')">Editar</a></div>'+
                                            '</fieldset>'+
                                      '</li>';
                 $("#lista_de_receitas_ul").append(linkeditdelete);
                 $("#lista_de_receitas_ul").listview("refresh");
                 $("#button_apagar_receita"+ i).button();
                 $("#button_editar_receita"+ i).button();
             }
         });
    }); 
}

// Apaga uma linha da tablela Receitas_Medicas, e carrega a lista novamente.
function deleteAndshowReceita(tabela, id){
    deleteRecord(tabela, id);
    showRecords_receitas();
}

// Volta o formulário da pagina ao normal após edição dos dados.
function resetReceita(){
    resetForm("form_receitas_medicas");
    $("#salvar_receita").attr("onclick","insertRecords_receitas()");
    $("#salvar_receita .ui-btn-text").text("Salvar");
    $("#salvar_receita").button();
}

// Carrega os dados da lista para o formulário, muda o botão de Salvar para Atualizar.
function editRecord_receita(nome, quant, uni, id){
    $("#nome_medicamento_receita").val(nome);
    $("#quantidade_medicamento_receita").val(quant);
    $("#escolha_unidade_receita").val(uni).attr('selected', true).siblings('option').removeAttr('selected');
    $("#escolha_unidade_receita").selectmenu("refresh", true);
    $("#hidden_receita").val(id);
    $("#salvar_receita").attr("onclick","updateRecord_receita()");
    $("#salvar_receita .ui-btn-text").text("Atualizar");
    $("#salvar_receita").button();
}

// Atualiza os dados na tabela Receitas_Medicas, de acordo com as mudanças feitas no folmulário.
function updateRecord_receita(){
    var data = new Array();
    data[0] = $("#nome_medicamento_receita").val();
    data[1] = $("#quantidade_medicamento_receita").val();
    data[2] = $("#escolha_unidade_receita").val();
    data[3] = $("#hidden_receita").val();
    
    for (i = 0; i < data.length; i++) {
            if (data[i] === null || data[i] === ""){
                alert("Campos em branco! Preencha todos para continuar.");
                return false;
            }
    }

    var updateStatement = "UPDATE Receitas_Medicas SET medicamento = ?, quantidade = ?, unidade = ? WHERE id=?";
    db.transaction(function (tx) { tx.executeSql(updateStatement, [data[0], data[1], data[2], data[3]], onError); });
    //tx.executeSql(SQL Query Statement,[ Parameters ] , Sucess Result Handler Function, Error Result Handler Function );

    resetReceita();
    showRecords_receitas();
}