

var v = new Vue({
    el: "#index",
    data: {
        lojas:[]
    },
    delimiters: ["[[","]]"],
    created(){
        $.get("http://165.227.177.3:8001/clientes/cliente_01/" , function(data, status){
            v.lojas = data.stores
        })
    },
    methods:{
        selecionarloja: function(loja_slug){
            console.log(loja_slug)
            localStorage.setItem("loja_slug", loja_slug)

            window.location.href = "/loja\/?slug=" + loja_slug
        }
    }
})