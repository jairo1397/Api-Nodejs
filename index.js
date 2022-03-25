const express = require('express');

const app = express();

app.use(express.json());

const empleados = [
    { id: 1, name: 'Jairo', age: 24, email: 'jairo.espinoza.quispe@gmail.com' },
    { id: 2, name: 'Juan', age: 24, email: 'juan@gmail.com' },
];

app.get('/', (req, res) => {
    res.send('Esta es la API hecha en Nodejs');
});

app.get('/api/empleados', (req, res) => {
    res.json(empleados);
});

app.get('/api/empleados/:id', (req, res) => {
    const empleado = empleados.find(empleado => empleado.id === parseInt(req.params.id));
    if (!empleado) {
        res.status(404).send('El empleado no existe');
    }
    res.json(empleado);
});

app.post('/api/empleados', (req, res) => {
    const empleado = {
        id: empleados.length + 1,
        name: req.body.name,
        age: req.body.age,
        email: req.body.email
    }
    empleados.push(empleado);
    res.json(empleado);
});

app.delete('/api/empleados/:id', (req, res) => {
    const empleado = empleados.find(empleado => empleado.id === parseInt(req.params.id));
    if (!empleado) {
        res.status(404).send('El empleado no existe');
    }
    const index = empleados.indexOf(empleado);
    empleados.splice(index, 1);
    res.json(empleado);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Escuchando en el puerto  ${port}`));


