<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-6">🚀 SpaceX Launches</h1>

    <div v-if="error" class="text-red-500">Error: {{ error.message }}</div>
    <div v-else-if="pending">Loading launches...</div>
    <div v-else>
      <div
        v-for="launch in launches"
        :key="launch.id"
        class="bg-white rounded-xl shadow-md p-6 mb-4"
      >
        <h2 class="text-xl font-semibold">
          {{ launch.mission_name }}
        </h2>
        <p><strong>Date:</strong> {{ formatDate(launch.launch_date_utc) }}</p>
        <p><strong>Site:</strong> {{ launch.launch_site.site_name_long }}</p>
        <p><strong>Rocket:</strong> {{ launch.rocket.rocket_name }}</p>
        <p v-if="launch.details"><strong>Details:</strong> {{ launch.details }}</p>
        <p v-else class="italic text-gray-500">No details available.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const query = gql`
  query GetLaunches {
    launchesPast(limit: 10) {
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

const { data, error, pending } = await useAsyncQuery(query)

const launches = data?.value?.launchesPast || []

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleString()
}
</script>

<style scoped>
body {
  background-color: #f5f5f5;
}
</style>
