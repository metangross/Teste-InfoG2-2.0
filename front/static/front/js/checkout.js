

var v = new Vue({
    el: "#index",
    data: {
        logado:null,
        id:null,
        nome:null,
        passo_1:true,
        passo_2:false,
        passo_3:false,
        selected:null,
        radio:null,
    },
    delimiters: ["[[","]]"],
    created(){
        this.logado = localStorage.getItem("logado")? true : false
        this.listaCarrinho = localStorage.getItem("ListaCarrinho")

        if(this.logado){
            this.id = localStorage.getItem("id")
            this.nome = localStorage.getItem("nome_logado")
        }
        url = "http://165.227.177.3:8001/enderecos/?consumer__id=" + this.id
        $.get(url, function(data, status){
            let dados = data[0]
            v.cep = dados.cep
            v.cidade = dados.city.name
            v.uf = dados.city.uf
            v.rua = dados.street
            v.bairro = dados.neighborhood
            v.numero = dados.number
            v.complemento = dados.complement
            let str = "Rua " + v.rua + ", Bairro " + v.bairro + ",Número " + v.numero + " -- " + v.cep + " / " + v.cidade +"-" + v.uf
            document.getElementById('label2').innerHTML= str
        })

    },
    methods: {
        novaConta(){
            window.location.href = "/novaconta"
        },
        continuar(etapa){
            if(etapa==1){
                v.passo_1=false
                v.passo_2=true
            }
        }
    }
})


