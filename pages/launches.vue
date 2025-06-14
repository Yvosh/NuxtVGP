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
import { ref, computed, onMounted } from 'vue'
import { format } from 'date-fns'

// Sample launch data
const launches = ref([
  {
    id: 1,
    mission_name: 'FalconSat',
    launch_date_utc: '2023-01-01T00:00:00Z',
    launch_site: { site_name_long: 'Cape Canaveral Space Force Station' },
    rocket: { rocket: { id: 'falcon1', rocket_name: 'Falcon 1' } },
    details: 'First mission of Falcon 1.',
  },
  {
    id: 2,
    mission_name: 'DragonFly',
    launch_date_utc: '2023-05-15T00:00:00Z',
    launch_site: { site_name_long: 'Kennedy Space Center' },
    rocket: { rocket: { id: 'falcon9', rocket_name: 'Falcon 9' } },
    details: 'Mission to deliver supplies to the ISS.',
  },
  {
    id: 3,
    mission_name: 'Starlink 5',
    launch_date_utc: '2023-08-20T00:00:00Z',
    launch_site: { site_name_long: 'Vandenberg Space Force Base' },
    rocket: { rocket: { id: 'falcon9', rocket_name: 'Falcon 9' } },
    details: 'Deployment of Starlink satellites.',
  },
  {
    id: 4,
    mission_name: 'Mars Mission',
    launch_date_utc: '2024-03-10T00:00:00Z',
    launch_site: { site_name_long: 'Cape Canaveral Space Force Station' },
    rocket: { rocket: { id: 'starship', rocket_name: 'Starship' } },
    details: 'Mission to Mars.',
  },
  {
    id: 5,
    mission_name: 'Lunar Gateway',
    launch_date_utc: '2024-11-11T00:00:00Z',
    launch_site: { site_name_long: 'Kennedy Space Center' },
    rocket: { rocket: { id: 'falconheavy', rocket_name: 'Falcon Heavy' } },
    details: 'Building the Lunar Gateway.',
  },
]);

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
