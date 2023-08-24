

var v = new Vue({
    el: "#index",
    data: {
        lojas:[]
    },
    delimiters: ["[[","]]"],
    created(){
        console.log("aaaaaaa")
        $.get("http://165.227.177.3:8001/clientes/cliente_01/" , function(data, status){
            v.lojas = data.stores
        })
    },
    methods:{
        selecionarloja: function(loja_slug){
            window.location.href = "/loja\/?slug=" + loja_slug
        }
    }
})