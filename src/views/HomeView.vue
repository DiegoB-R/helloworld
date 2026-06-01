<script setup>
import axios from 'axios'
import WeatherCard from '../components/WeatherCard.vue'
import SearchBar from '../components/SearchBar.vue'
import { useWeatherStore } from '@/stores/weatherStore'
import { ref } from 'vue'

const store = useWeatherStore()
const cardRef = ref(null)

async function onBuscar(ciudad) {
    try {
        const { data } = await axios.get('https://nominatim.openstreetmap.org/search', {
            params: { q: ciudad, format: 'json', limit: 1 },
        })

        if (!data || data.length === 0) {
            store.error = 'Ciudad no encontrada'
            return
        }

        const resultado = data[0]
        console.log('ciudad encontrada:', resultado.display_name)
        store.setCiudad(resultado.display_name, Number(resultado.lat), Number(resultado.lon))
        cardRef.value.cargarClima()

    } catch (e) {
        store.error = 'No se pudo buscar la ciudad'
    }
}
</script>

<template>
    <section class="home">
        <h1>Weather App</h1>
        <p class="subtitle">Aplicación del clima en tiempo real</p>
        <SearchBar @buscar="onBuscar" />
        <WeatherCard ref="cardRef" />
    </section>
</template>

<style scoped>
.home {
    padding: 40px;
    font-family: Arial;
}

h1 {
    color: #979da5;
    font-size: 2rem;
    margin-bottom: 8px;
}

.subtitle {
    color: #2d466f;
    margin-bottom: 24px;
}
</style>
