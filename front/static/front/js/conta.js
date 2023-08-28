Vue.component("modal", {
    template: "#modal-template"
  });

var v = new Vue({
    el: "#index",
    data: {
        logado:null,
        id:null,
        nome:null,
        listaCarrinho:[],
        cep:null,
        cidade:null,
        uf:null,
        rua:null,
        bairro:null,
        numero:null,
        complemento:null,
        pedidos:null,
        showModal:false,
        modal: {
            pedido_id:null,
            items:null,
        }
    },
    delimiters: ["[[","]]"],
    created(){
        this.logado = localStorage.getItem("logado")? true : false
        this.listaCarrinho = localStorage.getItem("ListaCarrinho")? localStorage.getItem("ListaCarrinho") : []
        console.log(this.listaCarrinho)
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
        url = "http://165.227.177.3:8001/pedidos/?consumer__id=" + this.id
        console.log(url)
        $.get(url, function(data, status){
            v.pedidos = data
            console.log(v.pedidos)
        })
        


    },
    methods: {
        novaConta(){
            window.location.href = "/novaconta"
        },
        logarConta(){
            window.location.href = "/login"
        },
        converteStatus(status){
            const STATUS = {
                0:"ABERTO",
                1:"EM ANÁLISE",
                2:"CONFIRMADO",
                3:"ENVIADO",
                4:"CANCELADO",
                5:"NEGADO",
                6:"TERMINADO",
                7:"PAGAMENTO PENDENTE"
            }
            return STATUS[status]
        },
        exibirDetalhes(pedido_id){
            this.modal["pedido_id"] = pedido_id
            for(let i =0; i<v.pedidos.length; i++){
                if(pedido_id == v.pedidos[i].id){
                    this.modal["items"] = v.pedidos[i].items
                }
            }
            $("#exampleModal").modal("show") 
        },
        fecharModal(){
            $("#exampleModal").modal("hide") 
        },
        logout(){
            if(confirm("Deseja mesmo realizar o logout?")){
                localStorage.removeItem("logado")
                localStorage.removeItem("id")
                localStorage.removeItem("nome_logado")
                localStorage.removeItem("telefone")
                alert("Logout realizado com sucesso!")
                window.location.reload()

            }

        }
    }
})


