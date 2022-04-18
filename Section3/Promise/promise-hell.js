const empleados = [
    {
        id: 1,
        nombre: 'Fernando'
    },
    {
        id: 2,
        nombre: 'Linda'
    },
    {
        id: 3,
        nombre: 'Karen'
    }
];

const salarios = [
    {
        id: 1,
        salario: 1000
    },
    {
        id: 2,
        salario: 1500
    }
];

const getEmpleado = ( id ) => {

    return new Promise (( resolve, reject ) => {
        const empleado = empleados.find( e => e.id === id )?.nombre
        
        if ( empleado ){
            resolve(empleado)
        }else{
            reject(`El empleado ${id} no existe`)
        }
    })

}

const getSalario = ( id ) => {
    return new Promise (( resolve, reject ) => {
        const salario = salarios.find(salarioObj => salarioObj.id === id)?.salario
        
        if( salario ){
            resolve(salario)
        }else{
            reject(`El salario con id ${id} no existe`)
        }
    })
}

const id = 4


getEmpleado( id ).then(( resultEmpleado ) => {
    getSalario( id ).then(( resultSalario ) => console.log(`El empleado ${resultEmpleado} esta cobrando un sueldo de ${resultSalario}` ))
}).catch(( err ) => console.log( err )) 