import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useWeatherStore = defineStore('weather', () => {
    const ciudad = ref('Cancun')
    const latitud = ref(20.97)
    const longitud = ref(-86.93)
    const temperatura = ref(null)
    const viento = ref(null)
    const cargando = ref(false)
    const error = ref('')
    const codigoClima = ref(0)

    const tieneClima = computed(() => temperatura.value !== null)

    const descripcionClima = computed(() => {
        if (!tieneClima.value) return 'Sin datos'
        if (temperatura.value > 35) return 'Calor extremo'
        if (temperatura.value > 25) return 'Calido'
        if (temperatura.value > 1) return 'Templado'
        return 'Fresco'
    })

    function setCiudad(nombre, lat, lon) {
        ciudad.value = nombre
        latitud.value = lat
        longitud.value = lon
    }

    function setClima(temp, vientoKmh) {
        temperatura.value = temp
        viento.value = vientoKmh
    }

    function limpiarError() {
        error.value = ''
    }

    return {
        ciudad, latitud, longitud,
        temperatura, viento,
        cargando, error, codigoClima,
        tieneClima, descripcionClima,
        setCiudad, setClima, limpiarError
    }
})