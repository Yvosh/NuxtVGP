<!-- File: app/pages/launches.vue -->
<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">SpaceX Launches</h1>

    <div class="flex gap-4 mb-6">
      <v-select v-model="selectedYear" :items="years" label="Filter by Year" clearable></v-select>
      <v-select
        v-model="sortOrder"
        :items="['asc', 'desc']"
        label="Sort by Date"
        clearable
      ></v-select>
    </div>

    <v-table>
      <thead>
        <tr>
          <th>Mission Name</th>
          <th>Launch Date</th>
          <th>Launch Site</th>
          <th>Rocket Name</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="launch in sortedLaunches" :key="launch.id">
          <td>{{ launch.mission_name }}</td>
          <td>{{ formatDate(launch.launch_date_utc) }}</td>
          <td>{{ launch.launch_site.site_name_long }}</td>
          <td>
            <NuxtLink :to="`/rockets/${launch.rocket.rocket.id}`">
              {{ launch.rocket.rocket_name }}
            </NuxtLink>
          </td>
          <td>{{ launch.details || 'No details' }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup lang="ts">
import { useLaunches } from '~/composables/useLaunches'
import { ref, computed } from 'vue'
import { format } from 'date-fns'

const { launches } = await useLaunches()
const selectedYear = ref(null)
const sortOrder = ref('desc')

const years = computed(() => {
  const allYears = launches.value.map((l) => new Date(l.launch_date_utc).getFullYear())
  return [...new Set(allYears)].sort()
})

const filteredLaunches = computed(() => {
  return selectedYear.value
    ? launches.value.filter((l) => new Date(l.launch_date_utc).getFullYear() === selectedYear.value)
    : launches.value
})

const sortedLaunches = computed(() => {
  return [...filteredLaunches.value].sort((a, b) => {
    const dateA = new Date(a.launch_date_utc)
    const dateB = new Date(b.launch_date_utc)
    return sortOrder.value === 'asc' ? dateA - dateB : dateB - dateA
  })
})

function formatDate(date: string) {
  return format(new Date(date), 'PPPpp')
}
</script>

<style scoped>
th, td {
  padding: 12px;
}
</style>
