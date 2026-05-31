<script setup>
import { ref } from 'vue'

const ciudadInput = ref('')
const emit = defineEmits(['buscar'])

// TODO: mostrar mensaje si el input esta vacio
const obtenerCiudad = () => {
    const ciudad = ciudadInput.value.trim()
    if (!ciudad) return
    emit('buscar', ciudad)
    ciudadInput.value = ''
}
</script>

<template>
    <div class="box">
        <input
            v-model="ciudadInput"
            @keyup.enter="obtenerCiudad"
            placeholder="Ej: Cancún, Madrid..."
        />
        <button @click="obtenerCiudad">Buscar</button>
    </div>
</template>

<style scoped>
.box {
    display: flex;
    gap: 8px;
    margin-bottom: 20px;
}

input {
    padding: 10px;
    border: 2px solid #2563EB;
    border-radius: 8px;
    font-size: 16px;
    width: 260px;
}

button {
    background: #4b72c7;
    color: white;
    border: none;
    padding: 10px 18px;
    border-radius: 8px;
    cursor: pointer;
}
</style>