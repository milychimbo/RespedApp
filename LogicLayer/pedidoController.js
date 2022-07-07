const {
    request,
    response
} = require('express');
const {
    getAllPedidosLocales,
    createPedidoLocal,
    getPedidosPorUsuario
} = require('../DataLayer/pedidolocal');
const {
    createPedidoDomicilio,
    getAllPedidosDomicilio,
    getPedidosPorRelacion
} = require('../DataLayer/pedidodomicilio');
const {
    createPedidoReserva,
    getAllPedidosReserva,
    getPedidoPorIdReserva
} = require('../DataLayer/pedidoreserva');
const {
    getAllPedidos,
    getOnePedido,
    createPedido,
    updatePedido,
    deletePedido
} = require('../DataLayer/pedidototal');
const {
    getOneEstado
} = require('../DataLayer/estado');
const {
    getOneDireccion
} = require('../DataLayer/direccion');
const {
    responseJson
} = require('../helpers/handleGenericFunction');
const {
    getOneProducto
} = require('../DataLayer/producto');
const {
    generateUUID
} = require('../middlewares/generateUUID');
const {
    createPedidoProducto,
    getPedidoProducto
} = require('../DataLayer/relacionpedidoproducto');
const {
    getRelacion,
    getUsuarioDireccion
} = require('../DataLayer/relacionusuariodireccion');
const {
    getOneReserva,
    getReservasPorUsuario
} = require('../DataLayer/reserva');
const {
    enviarEmail
} = require('../helpers/enviarMail');
const correo = require('../views/correo.js')


async function obtenerPedidos(req = request, res = response) {
    const pedidos = await getAllPedidos();
    let respuestas = [];
    if (pedidos.length > 0) {
        for (const pedido of pedidos) {
            const productos = await getPedidoProducto(pedido.IDPEDIDOTOTAL);
            let arrayProductos = [];
            for (const producto of productos) {
                const productovar = await getOneProducto(producto.IDPRODUCTO)
                arrayProductos = [
                    ...arrayProductos,
                    productovar.NAME
                ]
            }
            const respuesta = {
                "IDPEDIDOTOTAL": pedido.IDPEDIDOTOTAL,
                "NUMPEDIDO": pedido.NUMPEDIDO,
                "PRODUCTOS": arrayProductos,
                "IDSTATE": pedido.IDSTATE,
                "VALORTOTAL": pedido.VALORTOTAL.toFixed(2),
                "NOTE": pedido.NOTE,
                "TIPO":pedido.TIPO,
                "PAGADO": pedido.PAGADO
            }
            if (pedido.IDSTATE != 5) {
                respuestas = [
                    ...respuestas,
                    respuesta
                ]
            }
        }
        res.status(200).json(responseJson(200, "success", respuestas))
    } else
        res.status(404).json(responseJson(404, "no existe"))
}
async function obtenerPedidosFinalizados(req = request, res = response) {
    const pedidos = await getAllPedidos();
    const respuestas = [];
    if (pedidos.length > 0) {
        pedidos.forEach(async (pedido, index) => {
            if (pedido.IDSTATE == 5) {
                respuestas.push(pedido);
            }
            if (index == (pedidos.length - 1)) {
                res.status(200).json(responseJson(200, "success", respuestas))
            }

        });
    } else
        res.status(404).json(responseJson(404, "no existe"))
}
async function obtenerPedidosLocales(req = request, res = response) { //corregido
    const pedidos = await getAllPedidosLocales();
    let respuestas = [];
    if (pedidos.length > 0) {
        for (const pedido of pedidos) {
            const pedidoTotal = await getOnePedido(pedido.IDPEDIDOTOTAL);
            const productos = await getPedidoProducto(pedido.IDPEDIDOTOTAL);
            let arrayProductos = [];
            for (const producto of productos) {
                const productovar = await getOneProducto(producto.IDPRODUCTO)
                arrayProductos = [
                    ...arrayProductos,
                    productovar.NAME
                ]
            }
            const respuesta = {
                "IDPEDIDO": pedido.IDPEDIDO,
                "IDPEDIDOTOTAL": pedidoTotal.IDPEDIDOTOTAL,
                "NUMPEDIDO": pedidoTotal.NUMPEDIDO,
                "PRODUCTOS": arrayProductos,
                "IDSTATE": pedidoTotal.IDSTATE,
                "MESA": pedido.MESA,
                "VALORTOTAL": pedidoTotal.VALORTOTAL.toFixed(2),
                "NOTE": pedidoTotal.NOTE,
                "PAGADO": pedidoTotal.PAGADO
            }
            if (pedidoTotal.IDSTATE != 5) {
                respuestas = [
                    ...respuestas,
                    respuesta
                ]
            }
        }
        res.status(200).json(responseJson(200, "success", respuestas))
    } else
        res.status(404).json(responseJson(404, "no existe"))
}
async function obtenerPedidosDomicilio(req = request, res = response) { //corregido
    const pedidos = await getAllPedidosDomicilio();
    let respuestas = [];
    if (pedidos.length > 0) {
        for (const pedido of pedidos) {
            const pedidoTotal = await getOnePedido(pedido.IDPEDIDOTOTAL);
            const productos = await getPedidoProducto(pedido.IDPEDIDOTOTAL);
            let arrayProductos = [];
            for (const producto of productos) {
                const productovar = await getOneProducto(producto.IDPRODUCTO)
                arrayProductos = [
                    ...arrayProductos,
                    productovar.NAME
                ]
            }
            const relacion = await getRelacion(pedido.IDRELACIONUD);
            const direccion = await getOneDireccion(relacion.IDDIRECCION);
            const respuesta = {
                "IDPEDIDO": pedido.IDPEDIDO,
                "IDPEDIDOTOTAL": pedidoTotal.IDPEDIDOTOTAL,
                "NUMPEDIDO": pedidoTotal.NUMPEDIDO,
                "PRODUCTOS": arrayProductos,
                "IDSTATE": pedidoTotal.IDSTATE,
                "VALORTOTAL": pedidoTotal.VALORTOTAL.toFixed(2),
                "NOTE": pedidoTotal.NOTE,
                "DIRECCION": direccion,
                "PAGADO": pedidoTotal.PAGADO
            }
            if (pedidoTotal.IDSTATE != 5) {
                respuestas = [
                    ...respuestas,
                    respuesta
                ]
            }
        }
        res.status(200).json(responseJson(200, "success", respuestas))
    } else
        res.status(404).json(responseJson(404, "no existe"))
}
async function obtenerPedidosReserva(req = request, res = response) { //corregido
    const pedidos = await getAllPedidosReserva();
    let respuestas = [];
    if (pedidos.length > 0) {
        for (const pedido of pedidos) {
            const pedidoTotal = await getOnePedido(pedido.IDPEDIDOTOTAL);
            const productos = await getPedidoProducto(pedido.IDPEDIDOTOTAL);
            let arrayProductos = [];
            for (const producto of productos) {
                const productovar = await getOneProducto(producto.IDPRODUCTO)
                arrayProductos = [
                    ...arrayProductos,
                    productovar.NAME
                ]
            }
            const reserva = await getOneReserva(pedido.IDRESERVA);
            const respuesta = {
                "IDPEDIDO": pedido.IDPEDIDO,
                "IDPEDIDOTOTAL": pedidoTotal.IDPEDIDOTOTAL,
                "NUMPEDIDO": pedidoTotal.NUMPEDIDO,
                "PRODUCTOS": arrayProductos,
                "IDSTATE": pedidoTotal.IDSTATE,
                "VALORTOTAL": pedidoTotal.VALORTOTAL.toFixed(2),
                "NOTE": pedidoTotal.NOTE,
                "RESERVA": reserva.NUMRESERVA,
                "PAGADO": pedidoTotal.PAGADO
            }
            if (pedidoTotal.IDSTATE != 5) {
                respuestas = [
                    ...respuestas,
                    respuesta
                ]
            }
        }
        res.status(200).json(responseJson(200, "success", respuestas))
    } else
        res.status(404).json(responseJson(404, "no existe"))
}
async function obtenerPedidosLocalUsuario(req = request, res = response) {//corregido
    const pedidos = await getPedidosPorUsuario(req.currentToken.IDUSUARIO);
    let respuestas = [];
    if (pedidos.length > 0) {
        for (const pedido of pedidos) {
            const pedidoTotal = await getOnePedido(pedido.IDPEDIDOTOTAL);
            const productos = await getPedidoProducto(pedido.IDPEDIDOTOTAL);
            let arrayProductos = [];
            for (const producto of productos) {
                const productovar = await getOneProducto(producto.IDPRODUCTO)
                arrayProductos = [
                    ...arrayProductos,
                    productovar.NAME
                ]
            }
            const estado = await getOneEstado(pedidoTotal.IDSTATE);
            const respuesta = {
                "IDPEDIDO": pedido.IDPEDIDO,
                "NUMPEDIDO": pedidoTotal.NUMPEDIDO,
                "PRODUCTOS": arrayProductos,
                "ESTADO": estado.STATE,
                "MESA": pedido.MESA,
                "VALORTOTAL": pedidoTotal.VALORTOTAL.toFixed(2),
                "NOTE": pedidoTotal.NOTE,
                "PAGADO": pedidoTotal.PAGADO
            }
            respuestas = [
                ...respuestas,
                respuesta
            ]
        }
        res.status(200).json(responseJson(200, "success", respuestas))
    } else
        res.status(404).json(responseJson(404, "no existe"))
}
async function obtenerPedidosUsuarioDomicilio(req = request, res = response) { //corregido
    const relaciones = await getUsuarioDireccion(req.currentToken.IDUSUARIO);
    let respuestas = [];
    if (relaciones.length > 0) {
        for (const relacion of relaciones) {
            const pedidos = await getPedidosPorRelacion(relacion.IDRELACIONUD);
            const direccion = await getOneDireccion(relacion.IDDIRECCION);
            let respuestas1 = [];
            for (const pedido of pedidos) {
                const pedidoTotal = await getOnePedido(pedido.IDPEDIDOTOTAL);
                const productos = await getPedidoProducto(pedido.IDPEDIDOTOTAL);
                let arrayProductos = [];
                for (const producto of productos) {
                    const productovar = await getOneProducto(producto.IDPRODUCTO)
                    arrayProductos = [
                        ...arrayProductos,
                        productovar.NAME
                    ]
                }
                const estado = await getOneEstado(pedidoTotal.IDSTATE);
                const respuesta = {
                    "IDPEDIDO": pedido.IDPEDIDO,
                    "NUMPEDIDO": pedidoTotal.NUMPEDIDO,
                    "PRODUCTOS": arrayProductos,
                    "ESTADO": estado.STATE,
                    "VALORTOTAL": pedidoTotal.VALORTOTAL.toFixed(2),
                    "NOTE": pedidoTotal.NOTE
                }
                respuestas1 = [
                    ...respuestas1,
                    respuesta
                ]

            }
            const aux = {
                "DIRECCION": direccion.NAME,
                "PEDIDOS": respuestas1
            }
            respuestas = [
                ...respuestas,
                aux
            ]

        }
        res.status(200).json(responseJson(200, "success", respuestas))
    } else {
        res.status(404).json(responseJson(404, "no existen direcciones"))
    }



}
async function obtenerPedidosUsuarioReserva(req = request, res = response) {//corregido
    const reservas = await getReservasPorUsuario(req.currentToken.IDUSUARIO);
    let respuestas = [];
    if (reservas.length > 0) {
        for (const reserva of reservas) {
            const pedido = await getPedidoPorIdReserva(reserva.IDRESERVA);
            if (pedido != null) {
                respuestas = [
                    ...respuestas,
                    pedido
                ]
            }
        }
        if (respuestas.length>0) {
            let respuestas1 = [];
            for (const pedido of respuestas) {
                const pedidoTotal = await getOnePedido(pedido.IDPEDIDOTOTAL);
                const productos = await getPedidoProducto(pedido.IDPEDIDOTOTAL);
                const estado = await getOneEstado(pedidoTotal.IDSTATE);
                const reserva = await getOneReserva(pedido.IDRESERVA);
                let arrayProductos = [];
                for (const producto of productos) {
                    const productovar = await getOneProducto(producto.IDPRODUCTO)
                    arrayProductos = [
                        ...arrayProductos,
                        productovar.NAME
                    ]
                }
                const respuesta = {
                    "IDPEDIDO": pedido.IDPEDIDO,
                    "NUMPEDIDO": pedidoTotal.NUMPEDIDO,
                    "PRODUCTOS": arrayProductos,
                    "ESTADO": estado.STATE,
                    "VALORTOTAL": pedidoTotal.VALORTOTAL.toFixed(2),
                    "NOTE": pedidoTotal.NOTE,
                    "RESERVA": reserva.NUMRESERVA
                }
                respuestas1 = [
                    ...respuestas1,
                    respuesta
                ]
            }
            res.status(200).json(responseJson(200, "success", respuestas1))
        } else {
            res.status(404).json(responseJson(404, "no existen pedidos en tus reservas"))
        }
    } else {
        res.status(404).json(responseJson(404, "no existe reservas"))
    }

    // const pedidos = await getAllPedidosReserva();
    // const respuestas =[];
    // if(pedidos.length>0){
    //     pedidos.forEach(async (pedido,index) =>{
    //         const pedidoTotal = await getOnePedido(pedido.IDPEDIDOTOTAL);
    //         const productos = await getPedidoProducto(pedido.IDPEDIDOTOTAL);
    //         const arrayProductos = [];
    //         productos.forEach(async (producto,index1) =>{
    //             const productovar = await getOneProducto(producto.IDPRODUCTO)
    //             arrayProductos.push(productovar.NAME)
    //             if(index1==(productos.length-1)){
    //                 const estado = await getOneEstado(pedidoTotal.IDSTATE);
    //                 const reserva = await getOneReserva(pedido.IDRESERVA);
    //                 const respuesta = {
    //                     "IDPEDIDO": pedido.IDPEDIDO,
    //                     "NUMPEDIDO": pedidoTotal.NUMPEDIDO,
    //                     "PRODUCTOS": arrayProductos,
    //                     "ESTADO": estado.STATE,
    //                     "VALORTOTAL": pedidoTotal.VALORTOTAL.toFixed(2),
    //                     "NOTE": pedidoTotal.NOTE,
    //                     "RESERVA": reserva
    //                 }
    //                 respuestas.push(respuesta);
    //                 if(index==(pedidos.length-1)){
    //                     res.status(200).json(responseJson(200, "success", respuestas))
    //                 }
    //             }
    //         })
    //         const arrayProductos = await getOneProducto(pedido.IDPEDIDOTOTAL);

    //     })
    // }
    // else
    // res.status(404).json(responseJson(404, "no existe"))
}

async function crearPedido(req = request, res = response) { //corregido
    const listaProductos = req.body;
    let valorTotal = 0;
    let infoProductos = [];
    if (Object.keys(req.body).length != 0) {
        for (const idproducto of listaProductos) {
            let producto = await getOneProducto(idproducto)
            let info = {
                "IDPRODUCTO": producto.IDPRODUCTO,
                "PRICE": producto.PRICE
            }
            infoProductos = [
                ...infoProductos,
                info
            ]
            valorTotal = valorTotal + producto.PRICE;
        }
        const idState = 1;
        const numPedido = generateUUID();
        const pedidoJson = {
            "NUMPEDIDO": numPedido,
            "VALORTOTAL": valorTotal,
            "IDSTATE": idState,
            "PAGADO": false
        }
        const pedidoTotal = await createPedido(pedidoJson)
        for (const el of infoProductos) {

            const relacionJson = {
                "IDPEDIDOTOTAL": pedidoTotal.IDPEDIDOTOTAL,
                "IDPRODUCTO": el.IDPRODUCTO,
                "PRICE": el.PRICE
            }
            await createPedidoProducto(relacionJson)
        }

        const respuesta = {
            "IDPEDIDOTOTAL": pedidoTotal.IDPEDIDOTOTAL,
            "NUMPEDIDO": numPedido,
            "NUMITEMS": listaProductos.length,
            "VALORTOTAL": valorTotal.toFixed(2)
        }
        res.status(200).json(responseJson(200, "success", respuesta))

    } else {
        res.status(404).json(responseJson(404, "no puede ser vacio"))
    }
}

async function crearPedidoLocal(req = request, res = response) {
    const pedidoLocalJson = {
        "IDUSUARIO": req.currentToken.IDUSUARIO,
        "IDPEDIDOTOTAL": req.body.IDPEDIDOTOTAL,
        "MESA": req.body.MESA
    }
    const pedido = await createPedidoLocal(pedidoLocalJson);
    if (Object.keys(pedido)[0] == "dataValues") {
        var mailOptions = {
            from: 'noreplyfdcoz@gmail.com',
            to: req.currentToken.EMAIL,
            subject: 'Tu pedido ha sido recibido',
            html: correo.pedidoMail
        };
        const requestNota = {
            "IDPEDIDOTOTAL": req.body.IDPEDIDOTOTAL,
            "NOTE": req.body.NOTE,
            "TIPO": 1
        }
        await updatePedido(requestNota);
        res.status(200).json(responseJson(200, "success"))
        enviarEmail(mailOptions);
    } else {
        res.status(400).json(responseJson(400, "no se pudo crear pedido local", pedido.parent.sqlMessage))
    }
}

async function crearPedidoDomicilio(req = request, res = response) {
    const pedidoDomicilioJson = {
        "IDRELACIONUD": req.body.IDRELACIONUD,
        "IDPEDIDOTOTAL": req.body.IDPEDIDOTOTAL
    }

    const pedido = await createPedidoDomicilio(pedidoDomicilioJson);
    if (Object.keys(pedido)[0] == "dataValues") {
        var mailOptions = {
            from: 'noreplyfdcoz@gmail.com',
            to: req.currentToken.EMAIL,
            subject: 'Tu pedido ha sido recibido',
            html: correo.pedidoMail
        };
        const requestNota = {
            "IDPEDIDOTOTAL": req.body.IDPEDIDOTOTAL,
            "NOTE": req.body.NOTE,
            "TIPO": 2
        }
        await updatePedido(requestNota);
        res.status(200).json(responseJson(200, "success"))
        enviarEmail(mailOptions);
    } else {
        res.status(400).json(responseJson(400, "no se pudo crear pedido a domicilio", pedido.parent.sqlMessage))
    }
}

async function crearPedidoReserva(req = request, res = response) {
    const pedidoReservaJson = {
        "IDRESERVA": req.body.IDRESERVA,
        "IDPEDIDOTOTAL": req.body.IDPEDIDOTOTAL
    }
    const pedido = await createPedidoReserva(pedidoReservaJson);
    if (Object.keys(pedido)[0] == "dataValues") {
        var mailOptions = {
            from: 'noreplyfdcoz@gmail.com',
            to: req.currentToken.EMAIL,
            subject: 'Tu pedido ha sido recibido',
            html: correo.pedidoMail
        };
        const requestNota = {
            "IDPEDIDOTOTAL": req.body.IDPEDIDOTOTAL,
            "NOTE": req.body.NOTE,
            "TIPO": 3
        }
        await updatePedido(requestNota);
        res.status(200).json(responseJson(200, "success"))
        enviarEmail(mailOptions);
    } else {
        res.status(400).json(responseJson(400, "no se pudo crear pedido de reserva", pedido.parent.sqlMessage))
    }
}

async function actualizarPedido(req = request, res = response) { //corregido
    const pedido = await updatePedido(req.body);
    if (pedido == 1)
        res.status(201).json(responseJson(201, "success"))
    else
        res.status(200).json(responseJson(200, "no hubo cambios"))
}


async function borrarPedido(req = request, res = response) {
    const pedido = await deletePedido(req.params.id);
    if (pedido == 1)
        res.status(201).json(responseJson(201, "success"))
    else
        res.status(200).json(responseJson(200, "no hubo cambios"))
}


module.exports = {
    obtenerPedidos,
    obtenerPedidosFinalizados,
    obtenerPedidosLocalUsuario,
    obtenerPedidosLocales,
    obtenerPedidosUsuarioDomicilio,
    obtenerPedidosUsuarioReserva,
    obtenerPedidosDomicilio,
    obtenerPedidosReserva,
    crearPedido,
    crearPedidoLocal,
    crearPedidoDomicilio,
    crearPedidoReserva,
    actualizarPedido,
    borrarPedido
};