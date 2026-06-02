<script setup>
import { watch, onMounted, onUnmounted } from 'vue'
import { useWeatherStore } from '@/stores/weatherStore'
import { obtenerClima } from '../services/weatherService'

const store = useWeatherStore()

let tiemr = null

async function cargarClima() {
    store.cargando = true
    store.limpiarError()
    try {
        const datos = await obtenerClima(store.latitud, store.longitud)
        store.setClima(datos.temperatura, datos.viento, datos.codigoClima)
    } catch (e) {
        store.error = 'No se pudo obtener el clima. Verifica tu conexion.'
    } finally {
        store.cargando = false
    }
}

/*   Watch recargar cuando el usuario cambiad de ciudad  
     Solo se ejecutara cuando latitud y longitud cambian
*/

wactch(
    [() => store.latitud, () => store.longitud],
    () => cargarClima()

)

onMounted(async () => {
    await cargarClima()
    timer = setInterval(cargarClima, 5 * 60 * 1000) // Actualizar cada 5 minutos
})


onUnmounted(() => {
    clearInterval(timer) //Limpiar el timer cuando el componente se destruya
})

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
    border: 2px solid #2563EB;
    border-radius: 16px;
    padding: 28px;
    max-width: 360px;
    font-family: Arial;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}

h2 {
    color: #1E3A5F;
    margin: 0 0 4px;
    font-size: 1.3rem;
}

.actualizacion {
    font-size: 11px;
    color: #94a3b8;
}

.badge {
    background: #DBEAFE;
    color: #1E3A5F;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 12px;
    white-space: nowrap;
}

.icono {
    font-size: 48px;
    margin: 16px 0 0;
}

.temp {
    font-size: 52px;
    font-weight: 800;
    color: #2563EB;
    margin: 0;
}

.viento {
    color: #374151;
    margin: 4px 0 16px;
}

.estado {
    padding: 24px 0;
    color: #374151;
    font-size: 15px;
}

.error {
    color: #991B1B;
}

.historial {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid #e5e7eb;
}

.historial-titulo {
    font-size: 11px;
    color: #94a3b8;
    margin: 0 0 6px;
}

.chip {
    display: inline-block;
    background: #f3f4f6;
    border-radius: 12px;
    padding: 3px 10px;
    font-size: 12px;
    margin: 2px;
    cursor: pointer;
}

.chip:hover {
    background: #DBEAFE;
}

button {
    margin-top: 16px;
    background: #2563EB;
    color: white;
    border: none;
    padding: 10px 24px;
    border-radius: 8px;
    cursor: pointer;
}

button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
</style>