<!-- components/SearchBar.vue -->
<template>
    <div class="relative w-full max-w-lg">
      <input
        type="text"
        v-model="search"
        @input="onSearch"
        class="w-full py-3 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition-shadow"
        placeholder="Search for jobs, companies..."
      />
      <button
        v-if="search"
        @click="clearSearch"
        class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
      >
        &times;
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  const emit = defineEmits(['update:query'])
  const search = ref('')
  
  const onSearch = () => {
    emit('update:query', search.value)
  }
  
  const clearSearch = () => {
    search.value = ''
    emit('update:query', '')
  }
  </script>
  