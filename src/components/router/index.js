import { createRouter, createWebHistory } from 'vue-router';
import Homeview from './view/Homeview.vue';
import Jobsview from './view/Jobsview.vue';
import NotFound from './view/NotFound.vue';

import JobViewDatail from './view/JobViewDatail.vue';
import JobView from './view/JobViewDatail.vue';
import AddJob from './view/AddJob.vue';
import EditjobView from './view/EditjobView.vue';

const router =createRouter({
    // @ts-ignore
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Homeview,
        },
        {
            path: '/jobs',
            name: 'jobs',
            component: Jobsview,

        },
        {
            path: '/jobs/:id',
            name: 'job',
            component: JobView,
          }, 
          {
            path: '/jobs/add',
            name: 'add-job',
            component: AddJob,

          },
          {
            path: '/jobs/edit/:id',
            name: 'edit-job',
            component:EditjobView,
          },
         
        {
            path: '/:catchAll(.*)',
            name: 'not-found',
            component: NotFound,
        },



    ]
});
export default router;