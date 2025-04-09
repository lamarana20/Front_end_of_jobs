<script setup>
import { reactive,onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { useRouter,useRoute } from 'vue-router'
import axios from 'axios'
const route = useRoute()
const jobId = route.params.id

const form = reactive({
  title: '',
  type: 'Full-Time',
  description: '',
  location: '',
  salary: 'Under $50K',
  company_name: '',
  company_description: '',
  contact_email: '',
  contact_phone: ''
});
const state = reactive({
  job: {},
  isLoading: true,
 
})

const toast = useToast()
const router = useRouter()

const submitForm = async () => {
  try {
    const response = await axios.put(`https://back-end-jobs-api-main-3cw2mc.laravel.cloud/api/jobs/${jobId}`, form)

    toast.success('Job update successfully!')
    router.push('/jobs')

    console.log(response.data)
    Object.keys(form).forEach(key => form[key] = '')
  } catch (error) {
    console.error('Error:', error.response?.data)
    toast.error('Failed to update. Please try again.')
  }
};
onMounted(async () => {
  try {
    const response = await axios.get(`https://back-end-jobs-api-main-3cw2mc.laravel.cloud/api/jobs/${jobId}`)
   state.job =response.data;
   //populate inputs
   form.title = state.job.title;
    form.type = state.job.type;
    form.description = state.job.description;
    form.location = state.job.location;
    form.salary = state.job.salary;
    form.company_name =state.job.company.name;
    form.company_description = state.job.company.description;
    form.contact_email = state.job.company.contactEmail ;
    form.contact_phone = state.job.company.contactPhone
  } catch (error) {
    console.error('Error fetching job:', error)
   
  } finally {
    state.isLoading = false
  }
})  ;
</script>


<template>
  <section class="bg-green-50">
    <div class="container m-auto max-w-2xl py-24">
      <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
        <form @submit.prevent="submitForm">
          <h2 class="text-3xl text-center font-semibold mb-6">Edit job</h2>

          <div class="mb-4">
            <label for="type" class="block text-gray-700 font-bold mb-2">Job Type</label>
            <select id="type" name="type" v-model="form.type" class="border rounded w-full py-2 px-3" required>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Remote">Remote</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          <div class="mb-4">
            <label for="title" class="block text-gray-700 font-bold mb-2">Job Title</label>
            <input
              type="text"
              id="title"
              name="title" 
              v-model="form.title"
              class="border rounded w-full py-2 px-3"
              placeholder="e.g. Frontend Developer"
              required
            />
          </div>

          <div class="mb-4">
            <label for="description" class="block text-gray-700 font-bold mb-2">Description</label>
            <textarea
              id="description"
              name="description" 
              v-model="form.description"
              class="border rounded w-full py-2 px-3"
              rows="4"
              placeholder="Job duties, expectations, requirements, etc"
              required
            ></textarea>
          </div>

          <div class="mb-4">
            <label for="salary" class="block text-gray-700 font-bold mb-2">Salary</label>
            <select id="salary" name="salary" v-model="form.salary" class="border rounded w-full py-2 px-3" required>
              <option value="Under $50K">Under $50K</option>
              <option value="$50K - $60K">$50K - $60K</option>
              <option value="$60K - $70K">$60K - $70K</option>
              <option value="$70K - $80K">$70K - $80K</option>
              <option value="$80K - $90K">$80K - $90K</option>
              <option value="$90K - $100K">$90K - $100K</option>
              <option value="$100K - $125K">$100K - $125K</option>
              <option value="$125K - $150K">$125K - $150K</option>
              <option value="$150K - $175K">$150K - $175K</option>
              <option value="$175K - $200K">$175K - $200K</option>
              <option value="Over $200K">Over $200K</option>
            </select>
          </div>

          <div class="mb-4">
            <label for="location" class="block text-gray-700 font-bold mb-2">Location</label>
            <input
              type="text"
              id="location"
              name="location" 
              v-model="form.location"
              class="border rounded w-full py-2 px-3"
              placeholder="e.g. New York, Remote"
              required
            />
          </div>

          <h3 class="text-2xl mb-5">Company Info</h3>

          <div class="mb-4">
            <label for="company_name" class="block text-gray-700 font-bold mb-2">Company Name</label>
            <input
              type="text"
              id="company_name"
              name="company_name" 
              v-model="form.company_name"
              class="border rounded w-full py-2 px-3"
              placeholder="e.g. Tech Solutions Inc."
              required
            />
          </div>

          <div class="mb-4">
            <label for="company_description" class="block text-gray-700 font-bold mb-2">Company Description</label>
            <textarea
              id="company_description"
              name="company_description" 
              v-model="form.company_description"
              class="border rounded w-full py-2 px-3"
              rows="4"
              placeholder="Describe what your company does"
              required
            ></textarea>
          </div>

          <div class="mb-4">
            <label for="contact_email" class="block text-gray-700 font-bold mb-2">Contact Email</label>
            <input
              type="email"
              id="contact_email"
              name="contact_email"
              v-model="form.contact_email"
              class="border rounded w-full py-2 px-3"
              placeholder="example@company.com"
              required
            />
          </div>

          <div class="mb-4">
            <label for="contact_phone" class="block text-gray-700 font-bold mb-2">Contact Phone</label>
            <input
              type="tel"
              id="contact_phone"
              name="contact_phone" 
              v-model="form.contact_phone"
              class="border rounded w-full py-2 px-3"
              placeholder="e.g. +1 (555) 123-4567"
              required
            />
          </div>

          <div>
            <button
              class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
             update
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
