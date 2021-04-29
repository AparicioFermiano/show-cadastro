//SHOW-CADASTRO DE CLIENTES
const express = require('express');
const app = express();
app.use(express.json());

const clientes = [
    {
        id: 1,
        nome: "João",
        endereco: "Rua Vicente Lopes",
        idade: 35
        },
        
        {
        id: 2,
        nome: "Marcela",
        endereco: "Rua Batista",
        idade: 23
    }
];
id = 2;

app.get('/clientes', (req, res) => {
    res.send(clientes);
});

app.post('/clientes', (req, res) => {
    
    const info = req.body;
    const informacao = {
        id: id += 1,
        nome: info.nome,
        endereco: info.endereco,
        idade: info.idade,
    }
    clientes.push(informacao) 
    res.status(201).send(clientes);
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



