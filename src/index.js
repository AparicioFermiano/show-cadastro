//SHOW-CADASTRO DE CLIENTES
const express = require('express');
const app = express();
app.use(express.json());
const axios = require('axios');
const port = 2000

const clientes = [{
    "id": 1,
    "nome": "Jully",
    "endereco":"Rua cracolandia",
    "idade": 74
    },
    {
    "id": 2,
    "nome": "Marcelo",
    "endereco":"Rua Duende",
    "idade": 23
    }];

id = 2;

app.get('/clientes', (req, res) => {
    res.send(clientes);
});

app.post('/clientes', async (req, res) => {
    const { nome, endereco, idade } = req.body;
    id ++;
    clientes.push({id, nome, endereco, idade});
    axios.post('http://localhost:10000/eventos', {
        tipo: "ObservacaoAtualizada",
        dados: {
            id, nome, endereco, idade
        }
    });
    
    res.status(200).send(clientes)
})

app.post('/eventos', (req, res) => {
    console.log(req.body);
    res.status(200).send({ msg: "ok"})
})

app.delete('/clientes/:id', async (req, res, next) => {
    var idcliente  = req.params.id;
    clientes.forEach((informacao, index) => {
        (informacao.id == idcliente) ? clientes.splice(index, 1) : ""
    })
    axios.post('http://localhost:10000/eventos', {
        tipo: "ArquivoDeletado",
    });
     res.status(200).send(clientes);
});

app.listen(port, () => {
    console.log('Clientes. Porta 2000');
});