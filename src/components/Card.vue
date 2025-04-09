<script setup>
import { defineProps } from 'vue';
defineProps({
    bg: {
        type: String,
        default: 'bg-white',
    },
}
)
</script>
<template>
    <div :class="`${bg} rounded-lg shadow-md p-6`">
     <slot></slot>  
    </div>
        
</template>
