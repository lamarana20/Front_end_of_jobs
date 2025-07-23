<script setup>
import { defineProps, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
const toast = useToast();
defineProps({
  title: {
    type: String,
    default: 'Become a Vue Dev',
  },
    subtitle: {
        type: String,
        default: 'Find the Vue job that fits your skills and needs',
    },
});
onMounted(() => {
const timer = setTimeout(() => {
  toast.success('Welcome to Vue Jobs! Explore the latest job listings and find your dream job today!',{
    position: 'top-right',
    timeout: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
  clearTimeout(timer);

}, 1000);

});

</script>
<template>
    <section class="bg-green-700 py-20 mb-4">
        <div
          class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center"
        >
          <div class="text-center">
            <h1
              class="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl"
            >
             {{ title }}
            </h1>
            <p class="my-4 text-xl text-white">
                {{ subtitle }}
            </p>
          </div>
        </div>
      </section>
</template>