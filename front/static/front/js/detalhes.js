

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
        thumb:null,
        listaCarrinho:[],
        InfoProdutos:[],
    },
    delimiters: ["[[","]]"],
    created(){
        listaCarrinho = localStorage.getItem("ListaCarrinho")
        InfoProdutos = localStorage.getItem("InfoProdutos")
        if (listaCarrinho != undefined){
            this.listaCarrinho = JSON.parse("[" + listaCarrinho + "]")
        }
        if (InfoProdutos != undefined){
            this.InfoProdutos = JSON.parse(InfoProdutos)
        }
        console.log(this.listaCarrinho)
        console.log(this.InfoProdutos)
        url = window.location.search.substring(1)
        this.idProduto = url.split('id=')[1]
        console.log(this.idProduto)
        $.get("http://165.227.177.3:8001/produtos/?ids=" + this.idProduto, function(data, status){
            dados = data[0]
            v.imagens = dados.images
            v.thumb = dados.images[0].image
            v.titulo = dados.short_description
            v.disponivel = dados.available
            v.fabricante = dados.manufacturer
            v.preco = dados.stocks[0].unit_price
            console.log(dados)
        })
        //this.carregarProdutos()
    },
    methods: {
        adicionarCarrinho(productId, disponivel, preco, descricao, imagem){
            oc = this.countOccurrences(this.listaCarrinho)  
            if (oc[productId] >= disponivel){
                alert("Erro! Quantidade indisponivel")
            }else{
                this.listaCarrinho.push(productId)
                localStorage.setItem("ListaCarrinho",this.listaCarrinho)
                var exist = false
                console.log(this.InfoProdutos)
                console.log(typeof this.InfoProdutos)
                for(let i = 0; i < this.InfoProdutos.length; i++){
                    if(this.InfoProdutos[i].id == productId)
                        exist=true
                }
                if(!exist){
                    var dic = {"id":productId, "preco":preco,"descricao":descricao,"imagem":imagem, "disponivel":disponivel}
                    this.InfoProdutos.push(dic)
                    console.log(JSON.stringify(this.InfoProdutos))
                    localStorage.setItem("InfoProdutos",JSON.stringify(this.InfoProdutos))
                }
                
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


