//Funções de calculos

// Calcula as calorias necessárias por dia.
function HarrisBenedict(){
    var data = new Array();

    data[0] = $("#idade").val();
    data[1] = $("#peso").val();
    data[2] = $("#altura").val();
    data[3] = $("input:radio[name=sexo]:checked").val();
    data[4] = $("input:radio[name=rotina]:checked").val();

    var result = 0;
    if(data[3] === "masculino"){
        result = 66.47 + ( 13.75 * data[1] ) + ( 5 * (data[2]*100) ) - ( 6.76 * data[0] );
    }
    else if(data[3] === "feminino"){
        result = 655.1 + ( 9.56 * data[1] ) + ( 1.85 * (data[2]*100) ) - ( 4.68 * data[0] );   
    }
    if(data[4] === "ativo"){
        result = (result * 1.5);
    }
    else if(data[4] === "medio"){
       result = (result * 1.2); 
    }
    $("#necessidade_calorica").val( Math.ceil(result) );
}

// Cria um botão dinâmico no menu de eventos
function ChangeButtonValue(){ // Get value from select
    $("#continuar_evento").attr("href", "#"+ $("#tipo_evento").val());
}

// Reseta os campos de um formulário
function resetForm(form){
    $("#"+ form)[0].reset();
}

// Reseta "na unha" os valores dos campos
function resetRadiosRanges_eventos(){
    setRadio("alta");
    setRadio("sim");
    $("#duracao").attr("value", "30");
    $("#valor_medicao").attr("value", "100");
}

function VerificarPreenchimento(){ // Verifica se não existem campos em branco ao adicionar evento, previne continuação.
    if ($("#data_evento").val() === null || $("#data_evento").val() === "" || $("#hora_evento").val() === null || $("#hora_evento").val() === "" ){
        alert("Campos em branco! Preencha todos para continuar.");
        $("#continuar_evento").attr("href", "#");
        //document.getElementById("continuar").setAttribute("href", "#");
        //resetForm("form_adicionar_eventos");
    }
}

function setRadio(value){
    if(value === "alta"){
        $("#radio_intensidade").html('<legend>Intensidade:</legend>'+
                                '<input type="radio" name="intensidade" id="intensidade_alta" value="alta" checked="checked">'+
                                '<label for="intensidade_alta">Alta</label>'+
                                '<input type="radio" name="intensidade" id="intensidade_media" value="media">'+
                                '<label for="intensidade_media">Media</label>'+
                                '<input type="radio" name="intensidade" id="intensidade_baixa" value="baixa">'+
                                '<label for="intensidade_baixa">Baixa</label>');
        $("#radio_intensidade").trigger("create");
    }
    else if(value === "media"){
        $("#radio_intensidade").html('<legend>Intensidade:</legend>'+
                                '<input type="radio" name="intensidade" id="intensidade_alta" value="alta">'+
                                '<label for="intensidade_alta">Alta</label>'+
                                '<input type="radio" name="intensidade" id="intensidade_media" value="media" checked="checked">'+
                                '<label for="intensidade_media">Media</label>'+
                                '<input type="radio" name="intensidade" id="intensidade_baixa" value="baixa">'+
                                '<label for="intensidade_baixa">Baixa</label>');
        $("#radio_intensidade").trigger("create");
    }
    else if(value === "baixa"){
        $("#radio_intensidade").html('<legend>Intensidade:</legend>'+
                                '<input type="radio" name="intensidade" id="intensidade_alta" value="alta">'+
                                '<label for="intensidade_alta">Alta</label>'+
                                '<input type="radio" name="intensidade" id="intensidade_media" value="media">'+
                                '<label for="intensidade_media">Media</label>'+
                                '<input type="radio" name="intensidade" id="intensidade_baixa" value="baixa" checked="checked">'+
                                '<label for="intensidade_baixa">Baixa</label>');
        $("#radio_intensidade").trigger("create");
    }
    else if(value === "sim"){
        $("#radio_jejum").html('<legend>Jejum:</legend>'+
                            '<input type="radio" name="jejum" id="jejum_sim" value="sim" checked="checked">'+
                            '<label for="jejum_sim">Sim</label>'+
                            '<input type="radio" name="jejum" id="jejum_nao" value="nao">'+
                            '<label for="jejum_nao">Não</label>');
        $("#radio_jejum").trigger("create");
    }
    else if(value === "nao"){
        $("#radio_jejum").html('<legend>Jejum:</legend>'+
                            '<input type="radio" name="jejum" id="jejum_sim" value="sim">'+
                            '<label for="jejum_sim">Sim</label>'+
                            '<input type="radio" name="jejum" id="jejum_nao" value="nao" checked="checked">'+
                            '<label for="jejum_nao">Não</label>');
        $("#radio_jejum").trigger("create");
    }
}