<script setup>
import { onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { useToast } from 'vue-toastification'
import BackButton from '@/components/BackButton.vue'

// Initialisation du routeur et de la route actuelle
const route = useRoute()
const router = useRouter()

const jobId = route.params.id

const state = reactive({
  job: {},
  isLoading: true,
  error: false
})

// Fonction pour supprimer l'offre d'emploi
const deleteJob = async (jobId) => {
  const confirmDelete = confirm('Are you sure you want to delete this job?')
  if (!confirmDelete) {
    return
  }
  const toast = useToast()
  try {
    await axios.delete(`/api/api/jobs/${jobId}`)
    toast.success('Job deleted successfully!')
    router.push('/jobs') // Redirection correcte
  } catch (error) {
    console.error('Error deleting job:', error)
    toast.error('Failed to delete job. Please try again.')
  }
}

onMounted(async () => {
  try {
    const response = await axios.get(`https://back-end-jobs-api-main-3cw2mc.laravel.cloud/api/jobs/${jobId}`)
    if (response.data) {
      state.job = response.data
    } else {
      state.error = true
    }
  } catch (error) {
    console.error('Error fetching job:', error)
    state.error = true
  } finally {
    state.isLoading = false
  }
})
</script>


<template>
  <BackButton />
  <section class="bg-green-50">
    <div class="container m-auto py-10 px-6">
      <!-- Gestion des erreurs -->
      <div v-if="state.error" class="bg-red-100 p-6 rounded-lg shadow-md text-center">
        <h2 class="text-2xl text-red-700 font-bold">Job not found</h2>
        <p class="text-red-600 mt-2">😔 Sorry, we couldn't find the job with ID: {{ jobId }} </p>
      </div>

      <!-- Affichage des détails de l'offre d'emploi -->
      <div v-else class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
        <main v-if="!state.isLoading">
          <div class="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
            <div class="text-gray-500 mb-4">{{ state.job.type }}</div>
            <h1 class="text-3xl font-bold mb-4">{{ state.job.title }}</h1>
            <div class="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
              <i class="pi pi-map-marker text-orange-700 my-1 mr-1"></i>
              <p class="text-orange-700">{{ state.job.location }}</p>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-green-800 text-lg font-bold mb-6">Job Description</h3>
            <p class="mb-4">{{ state.job.description }}</p>

            <h3 class="text-green-800 text-lg font-bold mb-2">Salary</h3>
            <p class="mb-4">{{ state.job.salary }} /year</p>
          </div>
        </main>

        <!-- Sidebar -->
        <aside v-if="!state.isLoading && state.job.company">
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold mb-6">Company Info</h3>
            <h2 class="text-2xl">{{ state.job.company.name }}</h2>
            <p class="my-2">{{ state.job.company.description }}</p>

            <hr class="my-4" />

            <h3 class="text-xl">Contact Email:</h3>
            <p class="my-2 bg-green-100 p-2 font-bold">
              {{ state.job.company.contactEmail }}
            </p>

            <h3 class="text-xl">Contact Phone:</h3>
            <p class="my-2 bg-green-100 p-2 font-bold">
              {{ state.job.company.contactPhone }}
            </p>
          </div>

          <!-- Manage -->
          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-xl font-bold mb-6">Manage Job</h3>
            <RouterLink
              :to="'/jobs/edit/' + state.job.id"
              class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full block"
            >
              Edit Job
            </RouterLink>
            <button @click="deleteJob(state.job.id)"
              class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full mt-4"
            >
              Delete Job
            </button>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>
