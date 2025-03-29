<template>
  <div class="search-container">
    <div class="search-input">
      <input
        v-model="searchQuery"
        @input="debouncedSearch"
        placeholder="Search..."
        type="search"
      />
      <div v-if="loading" class="spinner"></div>
    </div>
    
    <div v-if="results.length > 0" class="search-results">
      <NuxtLink 
        v-for="result in results" 
        :key="result.path" 
        :to="result.path"
        class="result-link"
      >
        {{ result.title || result.path }}
      </NuxtLink>
    </div>
    
    <div v-else-if="searchQuery.length >= 2 && !loading" class="no-results">
      No pages found for "{{ searchQuery }}"
    </div>
  </div>
</template>

<script setup>
const searchQuery = ref('')
const results = ref([])
const loading = ref(false)
let debounceTimer = null

const debouncedSearch = () => {
  clearTimeout(debounceTimer)
  if (searchQuery.value.length < 2) {
    results.value = []
    return
  }
  
  loading.value = true
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
</script>

<style scoped>
.search-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
}

.search-input {
  position: relative;
  margin-bottom: 1rem;
}

.search-input input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.spinner {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1rem;
  height: 1rem;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.search-results {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.result-link {
  padding: 0.75rem;
  border: 1px solid #eee;
  border-radius: 4px;
  text-decoration: none;
  color: #2c3e50;
  transition: background-color 0.2s;
}

.result-link:hover {
  background-color: #f8f8f8;
}

.no-results {
  padding: 1rem;
  text-align: center;
  color: #666;
}

@keyframes spin {
  0% { transform: translateY(-50%) rotate(0deg); }
  100% { transform: translateY(-50%) rotate(360deg); }
}
</style>