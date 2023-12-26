<!-- WeatherSearchInput.vue -->
<template>
  <div class="search-container">
    <input
      v-model="сityName"
      @input="debouncedGetCitySuggestions"
      :placeholder="$t('placeholderCity')"
      class="search-input"
      :readonly="isFavoritePage"
    />
  </div>
</template>

<script>
import _debounce from 'lodash/debounce'

export default {
  props: {
    cityName: String,
    isFavoritePage: Boolean,
  },
  data() {
    return {
      localCityName: this.cityName,
    }
  },
  methods: {
    debouncedGetCitySuggestions: _debounce(function () {
      this.$emit('debouncedGetCitySuggestions', this.cityName);
    }, 300),
  },
};
</script>


<style scoped>
/* Add your styles here */
</style>


<style scoped>
.search-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.search-input {
  width: 100%;
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 8px;
}
</style>
