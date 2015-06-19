// Funções relacionadas a eventos envolvendo banco de dados.

// Variáveis globais para uso das funções.
ClassTACO = new Object();
ClassTACO = {
    nome_alimento : new Array(),
    calorias_kcal : new Array(),
    calorias_joules : new Array(),
    proteinas_g : new Array(),
    carboidratos_g : new Array(),
    lipideos_g : new Array() 
};

ClassRefeicao = new Object();
ClassRefeicao = {  
    nome_alimento : new Array(),
    id_alimento : new Array(),
    quantidade_alimento : new Array(),
    unidade_alimento : new Array(),
    calculo_calorias : new Array(),
    calculo_proteinas : new Array(),
    calculo_carboidratos : new Array(),
    calculo_lipideos : new Array(),
    id_refeicao : 0
};

// Apaga todos os valores dos objetos.
function ResetObjects(){
    ClassTACO = new Object();
    ClassTACO = {
        nome_alimento : new Array(),
        calorias_kcal : new Array(),
        calorias_joules : new Array(),
        proteinas_g : new Array(),
        carboidratos_g : new Array(),
        lipideos_g : new Array() 
    };

    ClassRefeicao = new Object();
    ClassRefeicao = {  
        nome_alimento : new Array(),
        id_alimento : new Array(),
        quantidade_alimento : new Array(),
        unidade_alimento : new Array(),
        calculo_calorias : new Array(),
        calculo_proteinas : new Array(),
        calculo_carboidratos : new Array(),
        calculo_lipideos : new Array(),
        id_refeicao : 0
    };
}

// Apaga os  valores em dataset.
function ResetDataset(){
    dataset = new Array();
}

// Fim dos objetos e seus métodos.

// Insere na tabela Atividade_Fisica os dados relativos ao evento.
function insertRecord_atividade(){
        var data = new Array();
        data[0] = $("#data_evento").val();
        data[1] = $("#hora_evento").val();
        data[2] = $("#nome_atividade").val();
        data[3] = $("#duracao").val();
        data[4] = $("input:radio[name=intensidade]:checked").val();
        
        for (var i = 0; i < data.length; i++) {
            if (data[i] === null || data[i] === ""){
                alert("Campos em branco! Preencha todos para continuar.");
                return false;
            }
        }
        
        var insertStatement = "INSERT INTO Atividade_Fisica (data, hora, exercicio, duracao_min, intensidade) VALUES (?, ?, ?, ?, ?)";
        db.transaction(function (tx) { tx.executeSql(insertStatement, [data[0], data[1], data[2], data[3], data[4]], onError); });
        //tx.executeSql(SQL Query Statement,[ Parameters ] , Sucess Result Handler Function, Error Result Handler Function );
        
        resetForm("form_atividade");
        resetForm("form_adicionar_eventos");
}

// Insere na tabela Medicao_Glicemia os dados relativos ao evento.
function insertRecord_medicao_glicemia(){
        var data = new Array();
        data[0] = $("#data_evento").val();
        data[1] = $("#hora_evento").val();
        data[2] = $("#valor_medicao").val();
        data[3] = $("input:radio[name=jejum]:checked").val();
        
        for (var i = 0; i < data.length; i++) {
            if (data[i] === null || data[i] === ""){
                alert("Campos em branco! Preencha todos para continuar.");
                return false;
            }
        }
        
        var insertStatement = "INSERT INTO Medicao_Glicemia (data, hora, valor_dml, jejum) VALUES (?, ?, ?, ?)";
        db.transaction(function (tx) { tx.executeSql(insertStatement, [data[0], data[1], data[2], data[3]], onError); });
        //tx.executeSql(SQL Query Statement,[ Parameters ] , Sucess Result Handler Function, Error Result Handler Function );
        
        resetForm("form_medicao_glicemia");
        resetForm("form_adicionar_eventos");
}

// Insere na tabela Uso_Medicamento os dados relativos ao evento.
function insertRecord_medicamento(){
        var data = new Array();
        data[0] = $("#data_evento").val();
        data[1] = $("#hora_evento").val();
        data[2] = $("#nome_medicamento").val();
        data[3] = $("#quantidade_medicamento").val();
        data[4] = $("#escolha_unidade").val();
        
        for (var i = 0; i < data.length; i++) {
            if (data[i] === null || data[i] === ""){
                alert("Campos em branco! Preencha todos para continuar.");
                return false;
            }
        }
        
        var insertStatement = "INSERT INTO Uso_Medicamento (data, hora, medicamento, quantidade, unidade) VALUES (?, ?, ?, ?, ?)";
        db.transaction(function (tx) { tx.executeSql(insertStatement, [data[0], data[1], data[2], data[3], data[4]], onError); });
        //tx.executeSql(SQL Query Statement,[ Parameters ] , Sucess Result Handler Function, Error Result Handler Function );
        
        resetForm("form_medicamento");
        resetForm("form_adicionar_eventos");
}

// Apaga um evento e reexibe a lista de eventos.
function deleteAndshowEventos(tabela, id){
    deleteRecord(tabela, id);
    showRecords_eventos();
}

// Retorna um vetor contendo os campos de cada tabela, ou os campos de cada formulário.
function camposTabela(tabela){//manutenção
    var campos = new Array();
    if (tabela === "Medicao_Glicemia"){
        campos[0] = "hora";
        campos[1] = "valor_dml";
        campos[2] = "jejum";
    }
    else if (tabela === "Uso_Medicamento"){
        campos[0] = "hora";
        campos[1] = "medicamento";
        campos[2] = "quantidade";
        campos[3] = "unidade";
    }
    else if (tabela === "Atividade_Fisica"){
        campos[0] = "hora";
        campos[1] = "exercicio";
        campos[2] = "duracao_min";
        campos[3] = "intensidade";
    }
     else if (tabela === "Refeicao"){
        campos[0] = "hora";
        campos[1] = "calorias_total";
        campos[2] = "proteinas_total";
        campos[3] = "carboidratos_total";
        campos[4] = "lipideos_total";
    }
    else if (tabela === "form_Medicao_Glicemia"){
        campos[0] = "medicao_glicemia";
        campos[1] = "#valor_medicao";
        campos[2] = "input:radio[name=jejum]";
    }
    else if (tabela === "form_Uso_Medicamento"){
        campos[0] = "medicamento";
        campos[1] = "#nome_medicamento";
        campos[2] = "#quantidade_medicamento";
        campos[3] = "#escolha_unidade";
    }
    else if (tabela === "form_Atividade_Fisica"){
        campos[0] = "atividade";
        campos[1] = "#nome_atividade";
        campos[2] = "#duracao";
        campos[3] = "input:radio[name=intensidade]";
    }
    else if (tabela === "form_Refeicao"){
        campos[0] = "refeicao";
    }
    else{
        return false;
    }
    return campos;
}

// Exibe uma lista com os eventos de acordo com os dados do formulário. Apresenta os botões Apagar e Editar em cada item da lista.
function showRecords_eventos(){
    if ($("#tipo_evento_passado").val() === null || $("#tipo_evento_passado").val() === "" || $("#data_evento_passado").val() === null || $("#data_evento_passado").val() === "" ){
        return false;
    }
    
    $("#lista_de_eventos_ul").html('');
    var nome_tabela = $("#tipo_evento_passado").val();
    var nome_tabela_aspas = "'"+ nome_tabela +"'";
    var data_evento = $("#data_evento_passado").val();
    var selectAllStatement = "SELECT * FROM "+ nome_tabela +" WHERE data ='"+ data_evento +"' ";
    var campos =new Array();
    var row = new Array();
    
    db.transaction(function (tx) {
         tx.executeSql(selectAllStatement, [], function (tx, result) {
             dataset = result.rows;
             for (var i = 0; i < dataset.length; i++) {
                 row = dataset.item(i);
                 var linkeditdelete = '<li class="ui-body ui-body-b">'+
                                            '<fieldset class="ui-grid-b">'+
                                                '<div class="ui-block-a"><label>';
                                        
                 campos = camposTabela(nome_tabela);
                 for(var j=0; j < campos.length; j++){
                     linkeditdelete = linkeditdelete + ''+ row[campos[j]] +'; ';
                 }
                 
                 linkeditdelete = linkeditdelete +'</label></div>'+
                                                '<div class="ui-block-b" id="apagar_'+ i +'"><a href="#" id="button_apagar_'+ i +'" data-role="button" data-theme="a" data-mini="true" onclick="deleteAndshowEventos('+ nome_tabela_aspas +', '+ row["id"] +')">Apagar</a></div>'+
                                                '<div class="ui-block-c" id="editar_'+ i +'"><a href="#" id="button_editar_'+ i +'" data-role="button" data-theme="a" data-mini="true"onclick="editRecord_eventos('+ nome_tabela_aspas +', '+ row["id"] +', '+ i +')">Editar</a></div>'+
                                            '</fieldset>'+
                                      '</li>';
                 $("#lista_de_eventos_ul").append(linkeditdelete);
                 $("#lista_de_eventos_ul").listview("refresh");
                 $("#button_apagar_"+ i).button();
                 $("#button_editar_"+ i).button();
             }
         });
    }); 
}

// Retorna os botões e campos à seus valores originais.
function resetarEventos(form, tabela){
    //devolve valores originais para os elementos.    
    $("#voltar_evento").attr("href","#index");
    $("#voltar_evento").attr("onclick","resetarEventos('atividade', 'Atividade_Fisica')");
    $("#voltar_evento").buttonMarkup({ icon: "arrow-l"});
    $("#voltar_evento .ui-btn-text").text("Voltar");

    $("#salvar_"+ tabela).attr("onclick","insertRecord_"+ form +"()");
    $("#salvar_"+ tabela).buttonMarkup({ icon: "check"});
    $("#salvar_"+ tabela +" .ui-btn-text").text("Salvar");
    
    //reseta campo com os eventos
    $("#lista_de_eventos_ul").html("");
    resetForm("form_dados_eventos");
    
    //reseta os formulários
    resetForm("form_adicionar_eventos");
    resetForm("form_"+ form);
    resetRadiosRanges_eventos();
}

// Modifica as páginas para atualizaçao dos dados.
function editRecord_eventos(tabela ,id , i_lista){
    //cria vetores e variáveis, atribuindo valores correspondentes.
    var dados_selecao = new Array();
    dados_selecao = dataset.item(i_lista);
    
    var campos_tabela = new Array();
    campos_tabela = camposTabela(tabela);
    
    var campos_form = new Array();
    campos_form = camposTabela("form_"+ tabela);
    
    //modifica botões para os do formulário de atualização.
    $("#button_editar_"+ i_lista).attr("href","#adicionar_eventos");
    
    $("#voltar_evento").attr("href","#");
    $("#voltar_evento").attr("onclick","resetarEventos('"+ campos_form[0] +"', '"+ tabela +"')");
    $("#voltar_evento").buttonMarkup({ icon: "delete"});
    $("#voltar_evento .ui-btn-text").text("Cancelar");

    $("#salvar_"+ tabela).attr("onclick","updateRecord_eventos('"+ tabela +"' , '"+ id +"')");
    $("#salvar_"+ tabela).buttonMarkup({ icon: "refresh"});
    $("#salvar_"+ tabela +" .ui-btn-text").text("Atualizar");
    
    //insere data, hora e tipo do evento editado nos campos.
    $("#data_evento").val(dados_selecao["data"]);
    $("#hora_evento").val(dados_selecao["hora"]);
    $("#tipo_evento").val(campos_form[0]).change();
    //$("#tipo_evento").selectmenu("disable"); para uso futuro
    $("#continuar_evento").attr("href", "#"+ campos_form[0]);
    
    //percorre vetor atribuindo valor aos campos de acordo com tipo de evento.
    for(var i = 1, tipo_campo= null, tag_campo =null; i < campos_form.length; i++){
        tag_campo = $(campos_form[i]).prop("tagName");
        tipo_campo = $(campos_form[i]).attr("type");
        
        if (tag_campo === "SELECT"){
            $(campos_form[i]).val(dados_selecao[campos_tabela[i]]).change();
        }
        else if (tipo_campo === "radio"){
            setRadio( dados_selecao[campos_tabela[i]] );
        }
        else if (tipo_campo === "range"){
            $(campos_form[i]).attr("value", dados_selecao[campos_tabela[i]]);
        }
        else{
            $(campos_form[i]).val(dados_selecao[campos_tabela[i]]);
        }
    }
    ResetDataset();
}

// Atualiza as tabelas do banco com os novos dados.
function updateRecord_eventos(tabela, id){
    var campos_tabela = new Array();
    campos_tabela = camposTabela(tabela);
    var campos_form = new Array();
    campos_form = camposTabela("form_"+ tabela);
    
    var updateStatement = "UPDATE "+ tabela +" SET ";
    
    for (var i = 1; i < campos_tabela.length; i++) {
            if( $(campos_form[i]).val() === "" || $(campos_form[i]).val() === null ){
                alert("Campos em branco! Preencha todos para continuar!");
                return false;
            }
            if( tabela !== "Uso_Medicamento" && i === (campos_tabela.length - 1) ){
                updateStatement = updateStatement + campos_tabela[i] +" = '"+ $(campos_form[i] +":checked").val() +"', ";
            }
            else{
                updateStatement = updateStatement + campos_tabela[i] +" = '"+ $(campos_form[i]).val() +"', ";
            }
    }
    updateStatement = updateStatement +"data = '"+ $("#data_evento").val() +"', hora = '"+ $("#hora_evento").val() +"' WHERE id = '"+ id +"'";
    
    db.transaction(function (tx) { tx.executeSql(updateStatement, []); });
    //tx.executeSql(SQL Query Statement,[ Parameters ] , Sucess Result Handler Function, Error Result Handler Function );

    resetarEventos(campos_form[0], tabela);
}

// Preenche o vetor global com os nomes de alimentos.
function vetorAlimentos(){
    var input = $("#tabela_taco").val();
    var data = $.csv.toArrays(input);
   
    for(var i = 0; i < data.length; i++){
        ClassTACO.nome_alimento[i] = data[i][0];
        ClassTACO.calorias_kcal[i] = data[i][1];
        ClassTACO.calorias_joules[i] = data[i][2];
        ClassTACO.proteinas_g[i] = data[i][3];
        ClassTACO.carboidratos_g[i] = data[i][4];
        ClassTACO.lipideos_g[i] = data[i][5];
    }
}

// Ativa o auto-preenchimento do campo nome_alimento na pagina refeição.
function autopreenchimento_alimento(){
    if (ClassTACO.nome_alimento.length === 0){
        vetorAlimentos();
    }
    $("#nome_alimento_refeicao").autocomplete({
            source: ClassTACO.nome_alimento,
            minLength: 3
    });
}

// Adiciona os dados do formulário ao objeto responsável por armazena-los até que o evento seja salvo ou cancelado. Chama função responsável por exibir a lista.
function adicionarAlimento(){
    var last = ClassRefeicao.nome_alimento.length;
    
    ClassRefeicao.nome_alimento[last] = $('#nome_alimento_refeicao').val();
    ClassRefeicao.id_alimento[last] = jQuery.inArray( $('#nome_alimento_refeicao').val(), ClassTACO.nome_alimento );
    ClassRefeicao.quantidade_alimento[last] = $('#quantidade_alimento_refeicao').val();
    ClassRefeicao.unidade_alimento[last] = $('#escolha_unidade_refeicao').val();
    
    ClassRefeicao.calculo_calorias[last] = ( ClassTACO.calorias_kcal[ ClassRefeicao.id_alimento[last] ] * ClassRefeicao.quantidade_alimento[last] );
    ClassRefeicao.calculo_proteinas[last] = ( ClassTACO.proteinas_g[ ClassRefeicao.id_alimento[last] ] * ClassRefeicao.quantidade_alimento[last] );
    ClassRefeicao.calculo_carboidratos[last] = ( ClassTACO.carboidratos_g[ ClassRefeicao.id_alimento[last] ] * ClassRefeicao.quantidade_alimento[last] );
    ClassRefeicao.calculo_lipideos[last] = ( ClassTACO.lipideos_g[ ClassRefeicao.id_alimento[last] ] * ClassRefeicao.quantidade_alimento[last] );
    
    if(ClassRefeicao.id_refeicao === 0){
        getNextId();// posicionado aqui por motivos de lentidão no processamento de comandos sql.
    }
    
    listaAlimentos();
}

// Adiciona os dados no formulário em uma lista de alimentos. Exibe a opção de salvar a lista, ou de apagar os alimentos inseridos.
function listaAlimentos(){
    $("#lista_refeicao_ul").html("");
    
    for(var id = 0; id < ClassRefeicao.nome_alimento.length; id++){
        var item = '<li class="ui-body ui-body-b" id="'+ id +'">'+
                       '<fieldset class="ui-grid-a">'+
                           '<div class="ui-block-a"><label>'+
                               ClassRefeicao.nome_alimento[id] +'; '+ ClassRefeicao.quantidade_alimento[id] +'; '+ ClassRefeicao.unidade_alimento[id] +'; '+
                           '</label></div>'+
                           '<div class="ui-block-b"><a href="#" id="button_apagar'+ id +'" data-role="button" data-theme="a" data-mini="true" onclick="apagarAlimento('+ id +')">Apagar</a></div>'+
                       '</fieldset>'+
                   '</li>';
        $("#lista_refeicao_ul").append(item);
        $("#lista_refeicao_ul").listview("refresh");
        $("#button_apagar"+ id).button();
    }
    if(id > 0){
        item = '<a href="#index" data-role="button" data-icon="check" data-theme="a" name="salvar_Refeicao" id="salvar_Refeicao" data-mini="true" onclick="insertRefeicaoAlimentos()">Salvar</a>';
        $("#lista_refeicao_ul").append(item);
        $("#salvar_Refeicao").button();
    }
    resetForm("form_refeicao");
}

// Remove dados selecionados do objeto, e da lista de alimentos exibida.
function apagarAlimento(li){
    ClassRefeicao.nome_alimento.splice(li, 1);
    ClassRefeicao.id_alimento.splice(li, 1);
    ClassRefeicao.quantidade_alimento.splice(li, 1);
    ClassRefeicao.unidade_alimento.splice(li, 1);
    ClassRefeicao.calculo_calorias.splice(li, 1);
    ClassRefeicao.calculo_proteinas.splice(li, 1);
    ClassRefeicao.calculo_carboidratos.splice(li, 1);
    ClassRefeicao.calculo_lipideos.splice(li, 1);
    
    listaAlimentos();
}

// Chama as duas funções responsáveis por inserir dados relativos a refeições.
function insertRefeicaoAlimentos(){
    for(var j = 0; j < ClassRefeicao.id_alimento.length; j++){
        inserirAlimentosRefeicao(j);
    }
    insertRecord_Refeicao();
}

// Insere dados da refeição na tablea Refeicao
function insertRecord_Refeicao(){
    var data = new Array();
    data[0] = $("#data_evento").val();
    data[1] = $("#hora_evento").val();
    
    var soma_calorias = 0;
    var soma_proteinas = 0;
    var soma_carboidratos = 0;
    var soma_lipideos = 0;
    var value = 0;
    var id = ClassRefeicao.id_refeicao;
    
    for(var i=0; i < ClassRefeicao.id_alimento.length; i++){
        value = ClassRefeicao.id_alimento[i];
        soma_calorias = soma_calorias + ( ClassTACO.calorias_kcal[value] * ClassRefeicao.quantidade_alimento[i] );
        soma_proteinas = soma_proteinas + ( ClassTACO.proteinas_g[value] * ClassRefeicao.quantidade_alimento[i] );
        soma_carboidratos = soma_carboidratos + ( ClassTACO.carboidratos_g[value] * ClassRefeicao.quantidade_alimento[i] );
        soma_lipideos = soma_lipideos + ( ClassTACO.lipideos_g[value] * ClassRefeicao.quantidade_alimento[i] );
    }
    
    var insertStatement = "INSERT INTO Refeicao (id, data, hora, calorias_total, proteinas_total, carboidratos_total, lipideos_total) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.transaction(function (tx) { tx.executeSql(insertStatement, [id, data[0], data[1], soma_calorias, soma_proteinas, soma_carboidratos, soma_lipideos]); });

    ResetObjects();
    resetForm("form_refeicao");
    $("#lista_refeicao_ul").html("");
    resetForm("form_adicionar_eventos");
    
}

// Seleciona o id de maior valor na tabela, e retorna o próximo valor inteiro.
function getNextId(){
    var selectStatement = "SELECT * FROM Refeicao";
    
    db.transaction(function (tx) {
        tx.executeSql(selectStatement, [], function (tx, result){
            dataset = result.rows;
            if(dataset.length > 0){
                ClassRefeicao.id_refeicao = parseInt( dataset.item(dataset.length - 1)["id"] ) + 1;
            }
            else{
                ClassRefeicao.id_refeicao = 1;
            }
         });
    });
    ResetDataset();
}

// Insere 1 alimento na tabela Alimentos_Refeicao
function inserirAlimentosRefeicao(i){
    var id_refeicao = ClassRefeicao.id_refeicao;
    var id_alimento = ClassRefeicao.id_alimento[i];
    var nome_alimento = ClassRefeicao.nome_alimento[i];
    var quantidade_alimento = ClassRefeicao.quantidade_alimento[i];
    var calculo_calorias = ClassRefeicao.calculo_calorias[i];
    var calculo_proteinas = ClassRefeicao.calculo_proteinas[i];
    var calculo_carboidratos = ClassRefeicao.calculo_carboidratos[i];
    var calculo_lipideos = ClassRefeicao.calculo_lipideos[i];
    
    var insertStatement = "INSERT INTO Alimentos_Refeicao (id_refeicao, id_alimento, nome_alimento, quantidade_g, calorias_parcial, proteinas_parcial, carboidratos_parcial, lipideos_parcial) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    db.transaction(function (tx) { tx.executeSql(insertStatement, [id_refeicao, id_alimento, nome_alimento, quantidade_alimento, calculo_calorias, calculo_proteinas, calculo_carboidratos, calculo_lipideos]); });
}

//--------------------------------------------------------
function selectRefeicao(id_refeicao){
    var selectAllStatement = "SELECT * FROM Alimentos_Refeicao WHERE id_refeicao ='"+ id_refeicao +"' ";
    var row = new Array();
    
    db.transaction(function (tx) {
         tx.executeSql(selectAllStatement, [], function (tx, result) {
            dataset = result.rows;
            for (var i = 0; i < dataset.length; i++) {
                ClassRefeicao.id_refeicao = id_refeicao;
                ClassRefeicao.id_alimento[i] = row["id_alimento"];
                ClassRefeicao.nome_alimento[i] = row["nome_alimento"];
                ClassRefeicao.quantidade_alimento[i] = row["quantidade_g"];
                ClassRefeicao.calculo_calorias[i] = row["calorias_parcial"];
                ClassRefeicao.calculo_proteinas[i] = row["proteinas_parcial"];
                ClassRefeicao.calculo_carboidratos[i] = row["carboidratos_parcial"];
                ClassRefeicao.calculo_lipideos[i] = row["lipideos_parcial"];
            }
            //$("#continuar_evento").attr("onclick","");
            listaAlimentos();
         });
    }); 
}

function editRecord_refeicao(id){
    
}