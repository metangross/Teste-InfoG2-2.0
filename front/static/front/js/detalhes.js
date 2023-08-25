

var v = new Vue({
    el: "#index",
    data: {
        imagens:[],
        categorias:[],
        idProduto:null,
        titulo:null,
        fabricante:null,
        disponivel:null,
        preco:null,
        listaCarrinho:{},
    },
    delimiters: ["[[","]]"],
    created(){
        listaCarrinho = localStorage.getItem("ListaCarrinho")
        if (listaCarrinho != undefined){
            this.listaCarrinho = JSON.parse("[" + listaCarrinho + "]")
        }
        console.log(this.listaCarrinho)
        url = window.location.search.substring(1)
        this.idProduto = url.split('id=')[1]
        console.log(this.idProduto)
        $.get("http://165.227.177.3:8001/produtos/?ids=" + this.idProduto, function(data, status){
            dados = data[0]
            v.imagens = dados.images
            v.titulo = dados.short_description
            v.disponivel = dados.available
            v.fabricante = dados.manufacturer
            v.preco = dados.stocks[0].unit_price
            console.log(dados)
        })
        //this.carregarProdutos()
    },
    methods: {
        adicionarCarrinho(productId, disponivel){
            oc = this.countOccurrences(this.listaCarrinho)  
            if (oc[productId] >= disponivel){
                alert("Erro! Quantidade indisponivel")
            }else{
                this.listaCarrinho.push(productId)
                localStorage.setItem("ListaCarrinho",this.listaCarrinho)
            }
        },
        countOccurrences(arr) {
            const occurrences = {};
          
            for (const num of arr) {
              if (occurrences[num]) {
                occurrences[num]++;
              } else {
                occurrences[num] = 1;
              }
            }
          
            return occurrences;
        },
    }
})


