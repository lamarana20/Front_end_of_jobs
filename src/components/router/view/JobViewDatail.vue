<script setup>
import { onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { useToast } from 'vue-toastification'
import BackButton from '@/components/BackButton.vue'

const route = useRoute()
const router = useRouter()
const toast = useToast()
const jobId = route.params.id

const state = reactive({
  job: {},
  isLoading: true,
  error: false
})

const deleteJob = async (jobId) => {
  const confirmDelete = confirm('Are you sure you want to delete this job?')
  if (!confirmDelete) return
  
  try {
    await axios.delete(`/api/api/jobs/${jobId}`)
    toast.success('Job deleted successfully!')
    router.push('/jobs')
  } catch (error) {
    console.error('Error deleting job:', error)
    toast.error('Failed to delete. Please try again.')
  }
}

onMounted(async () => {
  try {
    const { data } = await axios.get(`https://backend-jobs-main-d8y5e0.laravel.cloud/api/jobs/${jobId}`)
    state.job = data || {}
    if (!data) state.error = true
  } catch (error) {
    console.error('Error fetching job:', error)
    state.error = true
  } finally {
    state.isLoading = false
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <BackButton />
    
    <!-- Loading State -->
    <div v-if="state.isLoading" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="state.error" class="max-w-4xl mx-auto px-4 py-10">
      <div class="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-4">
            <h3 class="text-lg font-medium text-red-800">Job not found</h3>
            <div class="mt-2 text-sm text-red-700">
              <p>Sorry, we couldn't find the job with ID: {{ jobId }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Job Details -->
    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Main Content -->
        <main class="flex-1">
          <div class="bg-white rounded-xl shadow-md overflow-hidden">
            <div class="p-6 md:p-8">
              <span class="inline-block bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full uppercase font-semibold tracking-wide mb-4">
                {{ state.job.type }}
              </span>
              <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ state.job.title }}</h1>
              <div class="flex items-center text-gray-600 mb-6">
                <i class="pi pi-map-marker text-green-600 mr-2"></i>
                <span class="text-green-700">{{ state.job.location }}</span>
              </div>
              
              <div class="prose max-w-none">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">Job Description</h3>
                <p class="text-gray-700 mb-6">{{ state.job.description }}</p>
                
                <h3 class="text-xl font-semibold text-gray-900 mb-2">Salary</h3>
                <p class="text-green-600 font-medium">{{ state.job.salary }} / year</p>
              </div>
            </div>
          </div>
        </main>

        <!-- Sidebar -->
        <aside class="w-full lg:w-80 space-y-6">
          <!-- Company Info -->
          <div class="bg-white rounded-xl shadow-md overflow-hidden">
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <i class="pi pi-building text-green-600 mr-2"></i>
                Company Information
              </h3>
              
              <h4 class="text-lg font-semibold text-gray-800 mb-2">{{ state.job.company?.name }}</h4>
              <p class="text-gray-600 mb-4">{{ state.job.company?.description }}</p>
              
              <div class="space-y-3">
                <div>
                  <h4 class="text-sm font-medium text-gray-500">Contact Email</h4>
                  <p class="mt-1 text-gray-900 font-medium break-all bg-green-50 p-2 rounded-lg">
                    {{ state.job.company?.contactEmail }}
                  </p>
                </div>
                
                <div>
                  <h4 class="text-sm font-medium text-gray-500">Phone</h4>
                  <p class="mt-1 text-gray-900 font-medium bg-green-50 p-2 rounded-lg">
                    {{ state.job.company?.contactPhone }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Job Management -->
          <div class="bg-white rounded-xl shadow-md overflow-hidden">
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-4">Job Management</h3>
              
              <div class="space-y-3">
                <RouterLink
                  :to="'/jobs/edit/' + state.job.id"
                  class="block w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg text-center transition-colors duration-200"
                >
                  Edit Job
                </RouterLink>
                
                <button 
                  @click="deleteJob(state.job.id)"
                  class="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Delete Job
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>