

var v = new Vue({
    el: "#index",
    data: {
        logado:null,
        id:null,
        nome:null,
        listaCarrinho:null,
        cep:null,
        cidade:null,
        uf:null,
        rua:null,
        bairro:null,
        numero:null,
        complemento:null,
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
        console.log(url)
        $.get(url, function(data, status){
            let dados = data[0]
            v.cep = dados.cep
            v.cidade = dados.city.name
            v.uf = dados.city.uf
            v.rua = dados.street
            v.bairro = dados.neighborhood
            v.numero = dados.number
            v.complemento = dados.complement
        })

    },
    methods: {
        novaConta(){
            window.location.href = "/novaconta"
        }
    }
})


