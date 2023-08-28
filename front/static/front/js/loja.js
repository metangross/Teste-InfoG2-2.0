
/*
    productInfo format
    productInfo = {
        "id":1,
        "img":_url_,
        "desc":name,
        "value":1,
    }
    productList = [productInfo]
*/
var v = new Vue({
    el: "#index",
    data: {
        banner:null,
        categorias:[],
        nome_loja:null,
        text:null, 
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
        this.nome_loja = url.split('slug=')[1]
        console.log(this.nome_loja)
        $.get("http://165.227.177.3:8001/lojas/" + this.nome_loja + "/" , function(data, status){
            v.banner = data.banner 
        })
        this.carregarProdutos()
    },
    methods: {
        onChange(){
            this.carregarProdutos(this.text)
        },
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
        carregarProdutos(produto=null){
            if(produto){
                url = "http://165.227.177.3:8001/categorias/" + this.nome_loja + "/?search=" + produto 

            }
            else{
                url = "http://165.227.177.3:8001/categorias/" + this.nome_loja + "/"
                
            }
            $.get(url , function(data, status){
                    v.categorias = data
                    console.log(v.categorias)
            })

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
        detalheProduto(produto){
            window.location.href = "/loja\/produto\/?id=" + produto
        }
    }
})


