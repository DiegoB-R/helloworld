import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useWeatherStore = defineStore('weather', () => {
    //Estados 
    const ciudad = ref('Cancun')
    const latitud = ref(20.97)
    const longitud = ref(-86.93)
    const temperatura = ref(null)
    const viento = ref(null)
    const cargando = ref(false)
    const error = ref('')

    //Variables computadas 
    const tieneClima = computed(() => temperatura.value !== null)
    const descripcionClima = computed(() => {
        if (!tieneClima.value) return 'Sin datos'
        if (temperatura.value > 35) return 'Calor extremo'
        if (temperatura.value > 25) return 'Calido'
        if (temperatura.value > 1) return 'Templado'
        return 'Fresco'
    })

    //Acciones
    function setCiudad(nombre, lat, lon) {
        ciudad.value = nombre
        latitud.value = lat
        longitud.value = lon
    }

    function setClima(temp, vientKmh) {
        temperatura.value = temp
        viento.value = vientKmh
    }

    function limpiarError() {
        error.value = ''
    }

    //Exponer todo lo que los componentes puedan utilizar
    return {
        ciudad, latitud, longitud,
        temperatura, viento, cargando, error,
        tieneClima, descripcionClima,
        setCiudad, setClima, limpiarError
    }

    

})
