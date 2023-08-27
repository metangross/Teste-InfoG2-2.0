

var v = new Vue({
    el: "#index",
    data: {
        nome:null,
        telefone:null,
        senha:null,

    },
    delimiters: ["[[","]]"],
    created(){

    },
    methods: {
        logar(){
            dados = {
                "username":$('#tele').val(),
                "password":this.senha
            }
            url="http://165.227.177.3:8001/login/consumidor/"
            $.ajax({
                type: 'POST',
                url: url,
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                data: JSON.stringify(dados),
            }).done(function(data){
                console.log(data)
                localStorage.setItem("logado",true)
                localStorage.setItem("id", data.id)
                localStorage.setItem("nome_logado", data.name)
                localStorage.setItem("telefone", data.phone)
                window.location.href = "/conta"
            }).fail(function(xhr, status, error){
                alert("Erro! Usuário ou senha inválidos")
            })
        },
    }
})



$( function() {
    $('#tele').mask('(00) 00000-0000');

  } );

