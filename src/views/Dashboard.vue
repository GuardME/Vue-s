<template>
<PageComponent title="Dashboard">Dashboard</PageComponent>
<div v-if="loading" class="flex justify-center">Loading ...</div>
        <div
        v-else
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-gray-700"
        >
        <div class="bg-white shadow-md p-3 text-center flex flex-col order-1 animate-fade-in-down lg:order-2" style="animation-delay: 0.2s">
        <h1 class="text-2xl font-semibold">Total Surveys</h1>
        <div class="text-8xl font-semibold flex-1 flex items-center justify-center">
        {{ data.totalSurveys }}
        </div>
        </div>
        <div class="bg-white shadow-md p-3 text-center flex flex-col order-2 lg:order-4 animate-fade-in-down" style="animation-delay: 0.2s">
        <h1 class="text-2xl font-semibold">Total Answer</h1>
        <div class="text-8xl font-semibold flex-1 flex items-center justify-center">
        {{ data.totalSurveys }}
        </div>
        </div>
        <div class="row-span-2 order-3 bg-white shadow-md p-4 lg:order-1 animate-fade-in-down" style="animation-delay: 0.2s">
        <h1 class="text-2xl font-semibold">Latest Surveys</h1>
        <img  :src="data.latestSurvey.image_url"
            class="w-[240px] mx-auto"
            alt=""/>
            <h3 class="font-bold text-xl mb-3">{{ data.latestSurvey.title }}</h3>
                <div class="flex justify-beetwen text-sm mb-3">
                <div>Answers:</div>
                <div>{{data.totalSurveys}}</div>
                </div>
        </div>
        <div class="bg-white shadow-md p-3 row-span-2 order-4 lg:oreder-3 animate-fade-in-down" style="animation-delay: 0.2s"></div>

        </div>
</template>

<script setup>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
import PageComponent from "../components/PageComponent.vue";
const store = useStore();

const loading = computed(() => store.state.dashboard.loading);
const data = computed(() => store.state.dashboard.data);

store.dispatch("getDashboardData");
</script>
