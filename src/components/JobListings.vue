<script setup>
import { reactive, onMounted, watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Joblisting from './Joblisting.vue'
import axios from 'axios'

const route = useRoute()
const router = useRouter()


const search = ref('')


defineProps({
  limit: Number,
  showbutton: {
    type: Boolean,
    default: false
  }
})

const state = reactive({
  jobs: [],
  allJobs: [],
  isLoading: true
})


const fetchJobs = async () => {
  try {
    const response = await axios.get('https://back-end-jobs-api-main-3cw2mc.laravel.cloud/api/jobs')
    state.allJobs = response.data
    applyFilter()  
  } catch (error) {
    console.error('Error fetching jobs:', error)
  } finally {
    state.isLoading = false
  }
}


const applyFilter = () => {
  const searchQuery = route.query.q?.toString().toLowerCase() || ''
  if (searchQuery === '') {
    state.jobs = state.allJobs  
  } else {
    state.jobs = state.allJobs.filter(job =>
      job.title.toLowerCase().includes(searchQuery) ||
      job.location.toLowerCase().includes(searchQuery) ||
      job.company_name.toLowerCase().includes(searchQuery)
    )
  }
}

onMounted(fetchJobs)

watch(() => route.query.q, applyFilter)


const handleSearch = () => {
  if (search.value.trim() !== '') {
    router.push({ path: '/jobs', query: { q: search.value } })
  }
}
</script>

<template>
  <div>
    <section class="bg-blue-50 px-4 py-10">
      <div class="bg-green-100 p-6 rounded-lg shadow-md text-center">
        <h2 class="text-3xl font-bold">Explore Career Opportunities</h2>
        <p class="text-gray-600 mt-2">Find your dream job here!</p>
      </div>

      <!-- Barre de recherche avec une meilleure intégration -->
      <div class="mt-6 flex justify-center w-full max-w-lg mx-auto">
        <div class="flex w-full max-w-lg bg-white rounded-lg shadow-lg overflow-hidden">
          <input
            v-model="search"
            @keyup.enter="handleSearch"
            type="text"
            placeholder="Search jobs by title, location..."
            class="w-full px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300 rounded-l-lg"
          />
          <button
            @click="handleSearch"
            class="bg-green-500 text-white px-6 py-2 font-semibold rounded-r-lg hover:bg-green-600 transition"
          >
            Search
          </button>
        </div>
      </div>

      <div class="container-xl lg:container m-auto mt-10">
        <h2 class="font-bold text-center mb-6 text-green-500">Browse jobs</h2>

        <!-- Affiche le spinner de chargement -->
        <div v-if="state.isLoading" class="flex justify-center items-center my-10">
          <div class="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>

        <!-- Affiche les emplois filtrés -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Joblisting
            v-for="job in state.jobs.slice(0, limit || state.jobs.length)"
            :key="job.id"
            :job="job"
          />
        </div>
      </div>
    </section>

    <!-- Affiche le bouton pour voir tous les emplois -->
    <section v-if="showbutton" class="m-auto max-w-lg my-10 px-6">
      <RouterLink
        to="/jobs"
        class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
      >
        View All Jobs
      </RouterLink>
    </section>
  </div>
</template>
