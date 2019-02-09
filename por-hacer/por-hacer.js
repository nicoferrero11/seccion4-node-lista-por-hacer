const fs = require('fs');

let listadoPorHacer = []; //guardaremos la lista

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();

    //Busca la posicion del item que interesa
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }

}

const borrar = (descripcion) => {
    cargarDB();

    // let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    // if (index >= 0) {
    //     listadoPorHacer.splice(index, 1);
    //     guardarDB();
    //     return true;
    // }
    // return false;

    //Otra forma

    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

//Graba la lista en el archivo json que creamos(data.json)
const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer); //Transforma el objeto en json, para poder guardarlo

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se grabó', err);
    })

}

//Carga el archivo data.json, si falla (porque no tiene contenido) creo un array vacio
const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}