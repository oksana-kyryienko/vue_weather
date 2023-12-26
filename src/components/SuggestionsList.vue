<!-- SuggestionsList.vue -->

<template>
  <ul v-if="citySuggestions.length" class="suggestions-list">
    <li
      v-for="(suggestion, index) in citySuggestions"
      :key="index"
      @click="selectCity(suggestion)"
      class="suggestion-item"
    >
      {{ suggestion }}
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    citySuggestions: Array,
  },
  methods: {
    selectCity(city) {
      this.$emit('selectCity', city);
    },
  },
};
</script>

<style scoped>
.suggestion-item {
  cursor: pointer;
  padding: 5px;
  transition: background-color 0.3s;
}

.suggestion-item:hover {
  background-color: #f0f0f0;
}
</style>
