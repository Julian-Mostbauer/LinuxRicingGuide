<template>
  <div class="relative w-full">
    <!-- Search Input -->
    <div class="relative">
      <DynamicIcon :names="{ 'default': 'magnifying-glass', 'mdi': 'search' }" :size="20" />
      <input
        v-model="searchQuery"
        @input="debouncedSearch"
        @focus="showResults = true"
        @blur="setTimeout(() => { showResults = false }, 200)"
        placeholder="Search..."
        type="search"
        class="w-full py-2 px-4 pr-10 rounded-full bg-gray-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-600 transition"
      />
      <!-- Loading Spinner -->
      <div 
        v-if="loading"
        class="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 border-2 border-gray-400 border-t-white rounded-full animate-spin"
      ></div>
    </div>

    <!-- Search Results Dropdown -->
    <div 
      v-if="showResults && results.length > 0"
      class="absolute z-50 w-full mt-2 max-h-80 overflow-y-auto bg-white rounded-md shadow-lg"
    >
      <NuxtLink 
        v-for="result in results" 
        :key="result.path" 
        :to="result.path"
        class="block px-4 py-3 text-gray-800 hover:bg-gray-100 transition"
        @click="closeResults"
      >
        {{ result.title || result.path }}
      </NuxtLink>
    </div>

    <!-- No Results Message -->
    <div 
      v-if="showResults && searchQuery.length >= 2 && !loading && results.length === 0"
      class="absolute z-50 w-full mt-2 p-4 bg-white rounded-md shadow-lg text-gray-600"
    >
      No results found for "{{ searchQuery }}"
    </div>
  </div>
</template>

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