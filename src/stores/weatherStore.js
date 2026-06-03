import { defineStore } from 'pinia'
import { ref, computed,reactive } from 'vue'
import {interpretaCodigo} from '@/services/weatherService'

export const useWeatherStore = defineStore('weather', () => {
    const ciudad = ref('Cancun')
    const latitud = ref(20.97)
    const longitud = ref(-86.93)
   /* const temperatura = ref(null)
    const viento = ref(null)*/
    const cargando = ref(false)
    const error = ref('')
    const codigoClima = ref(0)

/*Datos del clima agrupados con reactive*/
const clima = reactive({
    temperatura: null,
    viento: null,
    codigoClima: 0,
    ultimaActualizacion: null
})


/*Historial de ciudades consultadas*/
const historial = ref([])



    const tieneClima = computed(() => clima.temperatura !== null)

    const descripcionClima = computed(() => {
        if (!tieneClima.value) return 'Sin datos'
        if (clima.temperatura > 35) return 'Calor extremo'
        if (clima.temperatura > 25) return 'Calido'
        if (clima.temperatura > 1) return 'Templado'
        return 'Fresco'
    })

/* Regresa el icono segun el codigo de clima OpenMeteo */
const iconoClima = computed (()=> {
   return tieneClima.value?interpretaCodigo(clima.codigoClima).emoji:'💩'
})


/*  FC: Tiempo desde la ultima actualizacion  */
const tiempoActualizacion = computed(() => {
    if (!clima.ultimaActualizacion) return 'Nunca'

    const minutos = Math.floor((Date.now()- clima.ultimaActualizacion)/60000)
    if (minutos <1) return 'Hace menos de un minuto'
    if (minutos <60) return `Hace ${minutos} min.`
    return `Hace ${Math.floor(minutos/60)} horas`


})

    function setCiudad(nombre, lat, lon) {
        ciudad.value = nombre
        latitud.value = lat
        longitud.value = lon
        //Guardar la ciudad en el historial
        if (!historial.value.includes(nombre)){
            historial.value=[nombre,...historial.value.slice(0,5)]
        }
    }

    function setClima(temp, vientoKmh, codigo) {
        clima.temperatura = temp
        clima.viento = vientoKmh
        clima.codigoClima = codigo
        clima.ultimaActualizacion = Date.now()

    }

    function limpiarError() {
        error.value = ''
    }

    return {
        ciudad, latitud, longitud,
        cargando, error, codigoClima,clima, historial,
        tieneClima, descripcionClima, iconoClima, tiempoActualizacion,
        setCiudad, setClima, limpiarError,
    }
})
