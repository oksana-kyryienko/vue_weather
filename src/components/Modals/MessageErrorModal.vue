<template>
  <modal-main :visible="visible">
    <div class="modal-content" :style="customStyles">
      <p class="error-message">{{ errorMessage }}</p>
      <button @click="closeModal" class="close-button">Close</button>
    </div>
  </modal-main>
</template>

<script>

import ModalMain from '@/components/Modals/ModalMain.vue'

export default {
  components: {
    ModalMain
  },
  props: {
    visible: Boolean,
    customStyles: Object,
    errorMessage: String
  },
  methods: {
    closeModal() {
      this.$emit('close-modal')
    }
  }
}
</script>

<style scoped>
.error-message {
  color: red;
  margin-bottom: 10px;
}

.close-button {
  padding: 5px 10px;
  background-color: #007BFF;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
