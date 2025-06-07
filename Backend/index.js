const express = require('express');
const sequelize = require('./conexion/database'); 
const cors = require('cors'); 


const Empleado = require('./modelo/Empleado');
const Producto = require('./modelo/Producto');

const app = express(); 

app.use(cors());

app.use(express.json());

const puerto = 5000; 

app.get('/suma-salario-departamento', async (req, resp) => {
    try {
        const resultado = await Empleado.findAll({
            attributes: [
                'DEPARTMENT_ID',
                [sequelize.fn('SUM', sequelize.col('SALARY')), 'Salario_total']
                ],
            group: ['DEPARTMENT_ID'] 
        });
        if (resultado.length === 0) {
            resp.status(400).send({ "mensaje": 'No existen registros para esta métrica' });
        } else {
            resp.status(200).send(resultado);
        }
    } catch (error) {
       
        resp.status(500).send({ error: 'Ocurrió un error al obtener la suma de salario por departamento: ' + error.message });
    }
});


app.get('/cantidad-empleado-puesto', async (req, resp) => {
    try {
        const resultado = await Empleado.findAll({
            attributes: [
                'DEPARTMENT_ID',
                'JOB_ID',
                [sequelize.fn('COUNT', sequelize.col('*')), 'total_empleados'] 
            ],
            group: ['DEPARTMENT_ID', 'JOB_ID'] 
        });
        if (resultado.length === 0) {
            resp.status(400).send({ "mensaje": 'No existen registros para esta métrica' });
        } else {
            resp.status(200).send(resultado);
        }
    } catch (error) {
        resp.status(500).send({ error: 'Ocurrió un error al obtener la cantidad de empleados por puesto: ' + error.message });
    }
});


app.get('/average-value-by-category', async (req, resp) => {
    try {
        const resultado = await Producto.findAll({
            attributes: [
                'categoryCode',
                [sequelize.fn('AVG', sequelize.col('value')), 'average_value'] 
            ],
            group: ['categoryCode'] 
        });
        if (resultado.length === 0) {
            resp.status(400).send({ "mensaje": 'No existen registros para esta métrica' });
        } else {
            resp.status(200).send(resultado);
        }
    } catch (error) {
        resp.status(500).send({ error: 'Ocurrió un error al obtener el promedio de valor por categoría: ' + error.message });
    }
});


app.get('/total-value-by-brand', async (req, resp) => {
    try {
        const resultado = await Producto.findAll({
            attributes: [
                'brandCode',
                [sequelize.fn('SUM', sequelize.col('value')), 'total_value'] 
            ],
            group: ['brandCode'] 
        });
        if (resultado.length === 0) {
            resp.status(400).send({ "mensaje": 'No existen registros para esta métrica' });
        } else {
            resp.status(200).send(resultado);
        }
    } catch (error) {
        resp.status(500).send({ error: 'Ocurrió un error al obtener el valor total por marca: ' + error.message });
    }
});


app.get('/count-products-by-type', async (req, resp) => {
    try {
        const resultado = await Producto.findAll({
            attributes: [
                'productType',
                [sequelize.fn('COUNT', sequelize.col('*')), 'total_products'] 
            ],
            group: ['productType'] 
        });
        if (resultado.length === 0) {
            resp.status(400).send({ "mensaje": 'No existen registros para esta métrica' });
        } else {
            resp.status(200).send(resultado);
        }
    } catch (error) {
        resp.status(500).send({ error: 'Ocurrió un error al obtener la cantidad de productos por tipo: ' + error.message });
    }
});


app.listen(puerto, () => {
    console.log('Aplicación ejecutando en el puerto ' + puerto);
   
    sequelize.authenticate()
        .then(() => {
            console.log('Conexión a la base de datos exitosa desde el servidor.');
        })
        .catch((error) => {
            console.error('Error al conectar a la base de datos desde el servidor:', error);
        });
});
