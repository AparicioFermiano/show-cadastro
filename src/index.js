//SHOW-CADASTRO DE CLIENTES
const express = require('express');
const app = express();
app.use(express.json());

const clientes = [];

id = 0;

app.get('/clientes', (req, res) => {
    res.send(clientes);
});

app.post('/clientes', (req, res) => {
    
    const {nome, endereco, idade } = req.body
    id ++
    clientes.push({id, nome, endereco, idade})
    res.status(201).send(clientes)
});
app.put('/clientes', (req, res) => {
    clientes.forEach((informacao) => {
        informacao.id === req.body.id ?
        (informacao.nome = req.body.nome,
        informacao.endereco = req.body.endereco,
        informacao.idade = req.body.idade) : "";
    })
    res.status(200).send(clientes)
})

app.delete('/clientes/:id', (req, res, next) => {
    var idcliente  = req.params.id;
    clientes.forEach((informacao, index) => {
        (informacao.id == idcliente) ? clientes.splice(index, 1) : ""
    })
     res.status(200).send(clientes);
});



app.listen(2000, () => {
    console.log('Clientes. Porta 2000');
});



