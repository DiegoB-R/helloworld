<script setup>
import {computed} from 'vue'
import { useWeatherStore } from '@/stores/weatherStore' 

const store = useWeatherStore()

const historialOrdenado = computed ( () => [
    ...store.historial].reverse()

)

function seleccionarCiudad(ciudad) {
    store.setCiudad(ciudad.nombre, ciudad.lat, ciudad.lon)
}

</script>

<template>
<button v-for="ciudad in historialOrdenado" :key="`${ciudad.nombre}-${ciudad.lat}-${ciudad.lon}`"
@click="seleccionarCiudad(ciudad)">

{{ ciudad.nombre }}
</button>

<button @click="store.limpiarHistorial()">
    Limpiar el hisotrial
</button>




</template>

<style scoped>
button {
    margin-top: 16px;
    background: #5e8ef5;
    color: white;
    border: none;
    padding: 10px 24px;
    border-radius: 8px;
    cursor: pointer;
}

.icono {
    font-size: 48px;
    margin: 16px 0 8 px;
}

.temp {
    margin: 0;
    line-height: 1;
}


</style>