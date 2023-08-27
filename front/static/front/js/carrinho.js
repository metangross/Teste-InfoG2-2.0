

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
        var itensStr = Object.keys(this.itens).toString()
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
            console.log(this.listaCarrinho)
            for( var i = 0; i < this.listaCarrinho.length; i++){ 
    
              if ( this.listaCarrinho[i] === productId) { 
          
                this.listaCarrinho.splice(i, 1); 
              }
            console.log(this.listaCarrinho)
            localStorage.setItem("ListaCarrinho",this.listaCarrinho)

          }
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
          window.location.href = "/checkout"
      }
    }
})


