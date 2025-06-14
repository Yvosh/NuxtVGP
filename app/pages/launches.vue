<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">🚀 SpaceX Launches</h1>

    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else>
      <div
        v-for="launch in launches"
        :key="launch.id"
        class="mb-4 p-4 border rounded shadow"
      >
        <h2 class="text-xl font-semibold">{{ launch.mission_name }}</h2>
        <p><strong>Date:</strong> {{ formatDate(launch.launch_date_utc) }}</p>
        <p><strong>Site:</strong> {{ launch.launch_site.site_name_long }}</p>
        <p><strong>Rocket:</strong> {{ launch.rocket.rocket_name }}</p>
        <p v-if="launch.details"><strong>Details:</strong> {{ launch.details }}</p>
        <p v-else class="text-gray-500 italic">No details available.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAsyncQuery, gql } from '@nuxtjs/apollo'

const GET_LAUNCHES = gql`
  query {
    launchesPast(limit: 5) {
      id
      mission_name
      launch_date_utc
      details
      launch_site {
        site_name_long
      }
      rocket {
        rocket_name
      }
    }
  }
`

const { data, error, pending } = await useAsyncQuery(GET_LAUNCHES)
const launches = computed(() => data.value?.launchesPast || [])

function formatDate(date: string) {
  return new Date(date).toLocaleString()
}
</script>
