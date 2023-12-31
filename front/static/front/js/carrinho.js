

var v = new Vue({
    el: "#index",
    data: {
        listaCarrinho:[],
        itens:{},
        InfoProdutos:[],
    },
    delimiters: ["[[","]]"],
    created(){
        listaCarrinho = localStorage.getItem("ListaCarrinho")
        InfoProdutos = localStorage.getItem("InfoProdutos")
        if (listaCarrinho != undefined){
            this.listaCarrinho = JSON.parse("[" + listaCarrinho + "]")
            this.itens = this.countOccurrences(this.listaCarrinho)
        }
        if (InfoProdutos != undefined){
          this.InfoProdutos = JSON.parse(InfoProdutos)
        }
        console.log(this.listaCarrinho)
        console.log(this.InfoProdutos)
        console.log(this.itens)
        //var itensStr = Object.keys(this.itens).toString()

        // console.log(this.idProduto)
        // $.get("http://165.227.177.3:8001/produtos/?ids=" + itensStr, function(data, status){
        //     this.produtos = data
        //     console.log(this.produtos)
        // })
        //this.carregarProdutos()
    },
    methods: {
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
        removeCarrinho(productId){
          if(confirm("Você realmente deseja remover esse produto do carrinho?")){
            console.log(productId)
            console.log(this.listaCarrinho)
            this.listaCarrinho = this.listaCarrinho.filter(x => x !== parseInt(productId))
            // var newList = []
            // for(let i=0; i<this.listaCarrinho.length; i++){
            //   if(this.listaCarrinho[i]!==parseInt(productId)){
            //     newList.push(this.listaCarrinho[i])
            //   }
            // }
            console.log(this.listaCarrinho)
            localStorage.setItem("ListaCarrinho",this.listaCarrinho)

          }
          else{
            console.log("no")
          }
        },
        getQuantidade(productId){
          return this.itens[productId.toString()]
        },
        detalheProduto(produto){
          window.location.href = "/loja\/produto\/?id=" + produto
        },
        checkout(produto){
          logado = localStorage.getItem("logado")? true : false
          if(logado)
            window.location.href = "/checkout"
          else
            window.location.href = "/conta"

        },
        calcularValorTotal(){
          var valor_total = 0
          let lista = Object.keys(this.itens)
          for(let i=0; i<lista.length; i++){
            for(let j=0; j<this.InfoProdutos.length; j++){
              if(lista[i]==this.InfoProdutos[j].id){
                valor_total += this.itens[lista[i]]*this.InfoProdutos[j].preco
              }
            }
            console.log(lista[i], this.itens[lista[i]])
          }
          return valor_total.toFixed(2)
        }
    }
})


