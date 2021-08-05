/*const promesa = new Promise((resolve, reject) => {
    if(todoVaBien){
        resolve("ok")
    }
    else{
        reject("not ok")
    }
})

promesa.then(()=>{})
promesa.catch(()=>{})*/

const ejemploMuro = {};

function construir(muro) {
    // Resultado de funcion
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            muro.construido = true;

        if (muro.construido) {
            resolve(muro);
        } else {
            const error = new Error("No se pudo construir");
            reject(error);
        }
        }, 3000);
    });
}

    const promesaDeconstruccion = construir(ejemploMuro);

    promesaDeconstruccion
    .then((muroConstruido) => {
        console.log("muroConstruido:", muroConstruido);
    })
    .catch((error) => {
        console.error("Ocurrio un error:", error);
    });

function aplanar(muro){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            muro.aplanado = true;

            if (muro.aplanado){
                resolve(muro);
            } else {
                const errorAplanar = new Error("No se pudo aplanar");
            }
        }, 6000);
    });
}

const promesaDeAplanado = aplanar(ejemploMuro);

promesaDeAplanado
.then((muroAplanado) => {
    console.log("muroAplanado:", muroAplanado);
})
.catch((error) => {
    console.error("Ocurrio un error:", error);
});

function pintar(muro){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            muro.pintado = true;
            if (muro.aplanado){
                resolve(muro);
            } else {
                const errorPintar = new Error("No se pudo pintar");
            }
        }, 9000);
    });
}

const promesaDePintado = pintar(ejemploMuro);

promesaDePintado
.then((muroPintado) => {
    console.log("muroPintado:", muroPintado);
})
.catch((error) => {
    console.error("Ocurrió un error:", error);
});