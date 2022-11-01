
// CalculoMotor(tipoNomina, fechaPrimerEmpleo, genero)

const generos = ['M', 'F']

const tipoNominas = ['A', 'B', 'C', 'D']

const MesesMasculino = [26, 27, 28, 29, 30]

const MesesFemenino = [24, 25, 26, 27, 28]

const Creditos = [

    {
        genero: 'M',
        minCredito: {
            26: [100, 1000, 400, 200],
            27: [400, 600, 200, 300],
            28: [900, 1000, 200, 500],
            29: [100, 1000, 1000, 900],
            30: [600, 1000, 600, 1000]
        },
        maxCredito: {
            26: [4900, 4700, 5000, 4400],
            27: [4700, 4400, 4700, 4700],
            28: [4600, 5000, 5000, 4300],
            29: [4600, 4400, 4200, 4900],
            30: [4500, 4900, 4600, 4300]
        }

    },
    {
        genero: 'F',
        minCredito: {
            24: [800, 800, 200, 500],
            25: [800, 700, 900, 1000],
            26: [800, 100, 700, 600],
            27: [600, 600, 800, 400],
            28: [200, 700, 100, 700]
        },
        maxCredito: {
            24: [4000, 4700, 4600, 5000],
            25: [4200, 4200, 4900, 4900],
            26: [4100, 4500, 4600, 4700],
            27: [4200, 4300, 4700, 5000],
            28: [4500, 4400, 4000, 4300]
        }
    }
]

const p1 = (min, max) => min + Math.sqrt(max - min)
const p2 = (min, max) => min + 0.0175 * (max - min)

const lineaCreditoOptima = Math.max(p1, p2)

const calculoMotor = (tipoNomina, fechaPrimerEmpleo, genero) => {

    // Validaciones

    if (!tipoNominas.includes(tipoNomina)) {
        throw new Error('Tipo de nomina no valida')
    }

    if (!generos.includes(genero)) {
        throw new Error('Genero no valido')
    }


    // Calculo de meses de antiguedad

    const fechaActual = new Date();
    const fechaPrimerEmpleoDate = new Date(fechaPrimerEmpleo)


    // Calculo de meses de antiguedad
    const meses = (fechaActual.getFullYear() - fechaPrimerEmpleoDate.getFullYear()) * 12
        + (fechaActual.getMonth() - fechaPrimerEmpleoDate.getMonth())

    // 
    const mesesCredito = genero === 'M' ? MesesMasculino : MesesFemenino

    const mesCredito = () => {

        if (meses <= mesesCredito[0]) {
            return mesesCredito[0]
        } else if (meses >= mesesCredito[4]) {
            return mesesCredito[4]
        } else {
            return meses
        }
    }

    // Calculate min and max credit

    const tipoNominaIndex = tipoNominas.indexOf(tipoNomina)

    const minCredito = Creditos.find(credito => credito.genero === genero).minCredito[mesCredito()][tipoNominaIndex]
    const maxCredito = Creditos.find(credito => credito.genero === genero).maxCredito[mesCredito()][tipoNominaIndex]

    // Calculatar la linea de credito optima

    const lineaCreditoOptima = Math.max(p1(minCredito, maxCredito), p2(minCredito, maxCredito))

    return {
        tipoNomina,
        fechaPrimerEmpleo,
        genero,
        minCredito,
        maxCredito,
        lineaCreditoOptima
    }


}

console.log(calculoMotor('D', '2019-01-15', 'M'))