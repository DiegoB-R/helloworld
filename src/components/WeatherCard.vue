<script setup>
import { onMounted } from 'vue'
import { useWeatherStore } from '@/stores/weatherStore'
import { obtenerClima, interpretaCodigo } from '../services/weatherService'

const store = useWeatherStore()
 
async function cargarClima() {
    store.cargando = true
    store.limpiarError()
    try {
        const datos = await obtenerClima(store.latitud, store.longitud)
        store.setClima(datos.temperatura, datos.viento)
        store.codigoClima = datos.codigoClima
    } catch (e) {
        store.error = 'No se puede conectar con la API de clima'
    } finally {
        store.cargando = false
    }
}

onMounted(cargarClima)

defineExpose({ cargarClima })
</script>

<template>
    <div class="card">
        <header>
            <h2>{{ store.ciudad }}</h2>
            <span class="badge">
                {{ store.descripcionClima }}
                {{ interpretaCodigo(store.codigoClima).emoji }}
            </span>
        </header>

        <div v-if="store.cargando" class="estado">
            Obteniendo clima...
        </div>
        <div v-else-if="store.error" class="estado error">
            {{ store.error }}
        </div>
        <div v-else class="datos">
            <p class="temp">{{ store.temperatura }}°C</p>
            <button @click="cargarClima" :disabled="store.cargando">
                {{ store.cargando ? 'Actualizando...' : 'Actualizar' }}
            </button>
        </div>
    </div>
</template>

<style scoped>
.card {
    border: 4px solid #2563EB;
    border-radius: 16px;
    padding: 28px;
    max-width: 320px;
    font-family: "Gill Sans", Calibri, sans-serif;
    background-color: #d2dde8;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

h2 {
    color: #1e3a5f;
    margin: 0;
    font-size: 16px;
}

.badge {
    background-color: #dbeafe;
    color: #1e3a5f;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 20px;
}

.temp {
    font-size: 48px;
    font-weight: 800;
    color: #2563EB;
    margin: 16px 0 0;
}

.viento {
    color: #374151;
    margin: 4px 0;
}

.estado {
    padding: 20px 0;
    color: #374151;
}

.error {
    color: #991B1B;
}

button {
    margin-top: 16px;
    background: #2563EB;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
}

button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
</style>