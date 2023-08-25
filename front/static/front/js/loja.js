

var v = new Vue({
    el: "#index",
    data: {
        banner:null,
        categorias:[],
        nome_loja:null,
        text:null, 
        listaCarrinho:[],
    },
    delimiters: ["[[","]]"],
    created(){
        listaCarrinho = localStorage.getItem("ListaCarrinho")
        if (listaCarrinho != undefined){
            this.listaCarrinho = JSON.parse("[" + listaCarrinho + "]")
        }
        console.log(this.listaCarrinho)
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
        adicionarCarrinho(productId, disponivel){
            oc = this.countOccurrences(this.listaCarrinho)  
            if (oc[productId] >= disponivel){
                alert("Erro! Quantidade indisponivel")
            }else{
                this.listaCarrinho.push(productId)
                localStorage.setItem("ListaCarrinho",this.listaCarrinho)
            }
        },
        carregarProdutos(produto=null){
            if(produto){
                url = "http://165.227.177.3:8001/categorias/" + this.nome_loja + "/?search=" + produto 

            }
            else{
                url = "http://165.227.177.3:8001/categorias/" + this.nome_loja + "/"
                
            }
            console.log(url)
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


