
var v = new Vue({
    el: "#index",
    data: {
        logado:null,
        id:null,
        nome:null,
        endereco:null,
        formapagamento:null,
        endereco_id:null,
        payment:null,
        delivery:null,
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
      this.id = localStorage.getItem("id")
      const DELIVERY = localStorage.getItem("delivery")
      const PAYMENT = localStorage.getItem("payment")
      this.payment = PAYMENT
      this.delivery = DELIVERY
      const FORMAPAGAMENTO = {
        0:"Cartão de Débito",
        1:"Cartão de Crédito",
        2:"Dinheiro",
        3:"Pix"
      }
      this.formapagamento = FORMAPAGAMENTO[PAYMENT]
      if(DELIVERY==1){
        url = "http://165.227.177.3:8001/enderecos/?consumer__id=" + this.id
        $.get(url, function(data, status){
            let dados = data[0]
            cep = dados.cep
            cidade = dados.city.name
            uf = dados.city.uf
            rua = dados.street
            bairro = dados.neighborhood
            numero = dados.number
            complemento = dados.complement
            v.endereco_id= dados.id
            console.log(dados)
            let str = "Rua " + rua + ", Bairro " + bairro + ",Número " + numero + " -- " + cep + " / " + cidade +"-" + uf
            v.endereco = str
        })

      }else{
        this.endereco = "Retirar na Loja"
      }

    },
    methods: {
        finalizar(){
          console.log(this.listaCarrinho)
          console.log(this.InfoProdutos)
          console.log(this.itens)
          itens = []
          for(let i=0; i<this.InfoProdutos.length; i++){
            itens.push({
              "unit_price":this.InfoProdutos[i].preco,
              "product":this.InfoProdutos[i].id,
              "quantity":this.itens[this.InfoProdutos[i].id]
            })
          }
          loja_slug = localStorage.getItem("loja_slug")
          telefone = localStorage.getItem("telefone")
          dados = {
            "items":itens,
            "store":loja_slug,
            "consumer":parseInt(this.id),
            "phone":telefone, 
            "address":this.endereco_id,
            "total_price":this.calcularValorTotal(),
            "payment":this.payment,
            "delivery":this.delivery? true: false
          }
          console.log(dados)
          url="http://165.227.177.3:8001/pedidos/"
          $.ajax({
            type: 'POST',
            url: url,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(dados),
        }).done(function(data){
            console.log(data)
            alert("Pedido feito com sucesso!")
            window.location.href = "/conta"
        }).fail(function(xhr, status, error){
            console.log(xhr.responseText)
            console.log(status)
            console.log(error)
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
        getQuantidade(productId){
          return this.itens[productId.toString()]
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


