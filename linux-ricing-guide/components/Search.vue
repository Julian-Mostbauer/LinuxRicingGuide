<template>
  <div class="relative w-full">
    <!-- Search Input -->
    <div class="relative flex items-center">
      <DynamicIcon :names="{ 'default': 'magnifying-glass', 'mdi': 'search' }" :size="20" />
      <input v-model="searchQuery" @input="debouncedSearch" @focus="showResults = true"
        @blur="setTimeout(() => { showResults = false }, 200)" placeholder="Search..." type="text"
        class="w-full py-2 px-4 pr-10" />
      <!-- Loading Spinner -->
      <div v-if="loading"
        class="absolute right-3 loading loading-dots loading-xs">
      </div>
    </div>

    <!-- Search Results Dropdown -->
    <div v-if="showResults && results.length > 0"
      class="absolute z-50 w-full mt-2 max-h-80 overflow-y-auto bg-base-100 rounded-md shadow-lg">
      <NuxtLink v-for="result in results" :key="result.path" :to="'/' + result.path + '?q=' + searchQuery" @click="closeResults"
                class="block px-4 py-3 text-accent-800 bg-base-100 hover-background">
          {{ result.title || result.path }}
      </NuxtLink>
    </div>


    <!-- No Results Message -->
    <div v-if="showResults && searchQuery.length >= 2 && !loading && results.length === 0"
      class="absolute z-50 w-full mt-2 p-4 shadow-lg bg-base-100 rounded-md text-base-600 flex items-center">
      <DynamicIcon :names="{ 'default': 'triangle-exclamation'}" :size="16" class="mr-2"/>
      No results found for "{{ searchQuery }}"
    </div>

  </div>
</template>

<style scoped>
.hover-background:hover {
  background-color: var(--color-base-200)
}
</style>

<script setup>
const searchQuery = ref('')
const results = ref([])
const loading = ref(false)
const showResults = ref(false)
let debounceTimer = null

const debouncedSearch = () => {
  clearTimeout(debounceTimer)
  if (searchQuery.value.length < 2) {
    results.value = []
    return
  }

  loading.value = true
  showResults.value = true
  debounceTimer = setTimeout(async () => {
    try {
      const { data } = await useFetch('/api/search', {
        query: { q: searchQuery.value }
      })
      results.value = data.value?.results || []
    } catch (error) {
      console.error('Search failed:', error)
      results.value = []
    } finally {
      loading.value = false
    }
  }, 300)
}

const closeResults = () => {
  searchQuery.value = ''
  results.value = []
  showResults.value = false
}
</script>