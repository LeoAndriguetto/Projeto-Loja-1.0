class Produto {
    constructor(){
        this.id =1;
        this.arrayProdutos = [];
        this.editId = null;
    }

    salvar(){
        let produto = this.lerDados();
        if(this.validaCampos(produto)){
            if(this.editId == null){
                this.adicionar(produto);
            } else{
                this.atualizar(this.editId, produto);
            }
            
        }
        this.listaTabela();
        this.cancelar();
        document.getElementById("produto").focus();
    }

    listaTabela(){
        let tbody = document.getElementById("tbody");
        tbody.innerText = "";
        for(let i = 0; i < this.arrayProdutos.length; i++){
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_valor = tr.insertCell();
            let td_acoes = tr.insertCell();
            
            td_id.innerText = this.arrayProdutos[i].id;
            td_produto.innerText = this.arrayProdutos[i].nomeProduto;
            td_valor.innerText = "R$" + this.arrayProdutos[i].valor;
            td_produto.classList.add("center");
            td_valor.classList.add("center");

            td_id.classList.add("center");
            let imgEdit = document.createElement("img");
            imgEdit.setAttribute("onclick", "produto.preparaEdicao("+ JSON.stringify(this.arrayProdutos[i]) +")")
            imgEdit.src = "img/editar.png"
            td_acoes.appendChild(imgEdit);

            let imgDelete = document.createElement("img");
            imgDelete.src = "img/botao-apagar.png";
            imgDelete.setAttribute("onclick", "produto.deletar("+ this.arrayProdutos[i].id +")")
            td_acoes.appendChild(imgDelete);
            td_acoes.classList.add("center");
        }
    }

    adicionar(produto){
        produto.valor = parseFloat(produto.valor);
        this.arrayProdutos.push(produto);
        this.id++;
    }

    atualizar(id, produto){
        for(let i = 0; i < this.arrayProdutos.length; i++){
            if(this.arrayProdutos[i].id == id){
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
                this.arrayProdutos[i].valor = produto.valor;
            }
        }
    }

    preparaEdicao(dados){
        this.editId = dados.id;

        document.getElementById("produto").value = dados.nomeProduto;
        document.getElementById("valor").value = dados.valor;

        document.getElementById("btn1").innerText = "Atualizar"
    }

    lerDados(){
        let produto = {}
        produto.id = this.id;
        produto.nomeProduto = document.getElementById("produto").value
        produto.valor = document.getElementById("valor").value
        return produto;
    }

    validaCampos(produto){
        let msg = "";

        if(produto.nomeProduto == ""){
            msg += "informe o nome do produto \n"
        }
        if(produto.valor == ""){
            msg += "informe o valor do produto"
        }
        if(msg != ""){
            alert(msg);
            return false;
        }
        return true;
    }
    
    cancelar(){
        document.getElementById("produto").value = "";
        document.getElementById("valor").value = "";

        document.getElementById("btn1").innerText = "Salvar";
        this.editId = null;
    }

    deletar(id){

        if(confirm("Deseja mesmo deletar o produto do id " + id)){
            let tbody = document.getElementById("tbody");
            for(var i = 0; i < this.arrayProdutos.length; i++){
                if(this.arrayProdutos[i].id == id){
                    this.arrayProdutos.splice(i, 1);
                    tbody.deleteRow(i);
        }

            }
        }
    }
}

var produto = new Produto();