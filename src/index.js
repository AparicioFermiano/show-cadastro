//SHOW-CADASTRO DE CLIENTES
const express = require('express');
const app = express();
app.use(express.json());
const axios = require('axios');
const port = 2000

const clientes = []

id = 0;
//Obter a informação contida no json
app.get('/clientes', (req, res) => {
    res.status(200).send(clientes);
});
//Criação de novo usuário
//async significa assincrona, envia porém não espera resposta
app.post('/clientes', async (req, res) => {
    //Requiremento do corpo do Json
    const { nome, endereco, idade, quantidade } = req.body;
    id ++;
    //Inserir conteúdo no json
    clientes.push({id, nome, endereco, idade, quantidade});
    //Enviar uma mensagem sem retorno para o barramento
    await axios.post('http://localhost:10000/eventos', {
        tipo: "clienteCriado",
        dados: {
            id, nome, endereco, idade, quantidade
        }
    });  
    //retornar o resultado do json atualizado
    res.status(200).send(clientes)
})
app.put('/clientes/:id', (req, res) => {
    const { nome, endereco, idade, quantidade } = req.body;
    const idCliente = req.params.id || ["error"];
    clientes.forEach((informacao) => {
    idCliente == informacao.id ?
    (informacao.nome = nome,
    informacao.endereco = endereco,
    informacao.idade = idade,
    informacao.quantidade = quantidade,
    axios.post("http://localhost:10000/eventos", {
        tipo: "Cadastro Atualizado",
        dados: { nome, endereco, idade, quantidade },
        })) : "error";
    })
    
    res.status(200).send(clientes)
})

//Receber informação do barramento
app.post('/eventos', (req, res) => {
    try{
    console.log(req.body);
    } catch(err){}       
    res.status(200).send({ msg: "ok"})
})
//Realizar um delete em um cliente cadastrado
app.delete('/clientes/:id', async (req, res) => {
    //Recebe o parametros da id da URL em uma variavel
    const { nome, endereco, idade } = req.body;
    var idcliente  = req.params.id;
    //faz um laço de repetição, buscando o id do cliente e faz o delete.
    clientes.forEach((informacao, index) => {
        (informacao.id == idcliente) ? clientes.splice(index, 1) : ""
    })//Envia a informação do arquivo deletado para o barramento
    axios.post('http://localhost:10000/eventos', {
        tipo: "ClienteDeletado",
        dados: {
            id
        }
    });
     res.status(200).send(clientes);
});
//Faz a listagem da porta
app.listen(port, () => {
    console.log('Cadastro. Porta 2000');
});