

var v = new Vue({
    el: "#index",
    data: {
        nome:null,
        telefone:null,
        cpfcnpj:null,
        usuario:null,
        senha:null,
        novasinfo:false,
        cep:null,
        bairro:null,
        rua:null,
        numero:null,
        complemento:null,
        cidade:null,
        estado:null,

    },
    delimiters: ["[[","]]"],
    created(){

    },
    methods: {
        continuar(){
            this.novasinfo=true
        },
        changeUser(){
            this.usuario=$('#tele').val()
        },
        teste(){
            if(this.nome=="teste"){
                this.nome = "Nome de Teste"
                $( "#datepicker" ).val("08/01/2023")
                $('#tele').val("(00) 00000-0000")
                this.cpfcnpj = "41804096075"
                this.usuario = "(00)00000-0000"
                this.senha = "12345678"
            }
            if(this.cep=="0000"){
                this.bairro="Ininga"
                this.rua="Fidalma"
                this.numero=4
                this.complemento=""
                this.cidade="Teresina"
                this.estado="PI"
            }
        },
        criarConta(){
            var date = new Date(Date.parse($( "#datepicker" ).val()))
            dados = {
                "consumer":{
                    "birth_date":date.toISOString(),
                    "name":this.nome,
                    "phone":$('#tele').val(),
                    "cpf_cnpj": this.cpfcnpj,
                    "user":{
                        "username":$('#tele').val(),
                        "password": this.senha
                    }
                },
                "address":{
                    "neighborhood":this.bairro,
                    "street":this.rua,
                    "number":this.numero,
                    "complement":this.complemento,
                    "cep":this.cep,
                    "city":this.cidade,
                    "uf":this.estado
                }
            }
            //console.log(dados)
            url= "http://165.227.177.3:8001/consumidores/"
            //url = "https://httpbin.org/post"
            // $.post( url, dados , function( data ) {
            //     console.log(data);
            // }).fail(function(xhr, status, error){
            //     console.log(xhr.responseText)
            // })
            
            $.ajax({
                type: 'POST',
                url: url,
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                data: JSON.stringify(dados),
            }).done(function(data){
                localStorage.setItem("logado",true)
                localStorage.setItem("id", data.id)
                localStorage.setItem("nome_logado", data.name)
                window.location.href = "/conta"
            }).fail(function(xhr, status, error){
                var error = JSON.parse(xhr.responseText).consumer
                cpf_error = "cpf_cnpj" in error
                user_error = "user" in error
                console.log(error)
                if(cpf_error && user_error){
                    alert("CPF/CNPJ e Telefone já cadastrados no sistema!")
                }else{
                    if(cpf_error){
                        alert("CPF/CNPJ já cadastrado no sistema!")

                    }
                    if(user_error){
                        alert("Telefone já cadastrado no sistema!")

                    }
                }
                


            })
            ;

        }
    }
})



$( function() {
    $( "#datepicker" ).datepicker({
        changeMonth: true,
        changeYear: true,
        maxDate: 0
    });
    $('#tele').mask('(00) 00000-0000');

  } );

