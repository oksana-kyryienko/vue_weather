<template>
  <div v-if="visible" class="modal">
    <div class="modal-content" :style="customStyles">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: Boolean,
    customStyles: Object
  },
  methods: {
    closeModal() {
      this.$emit('close-modal')
    }
  }
}
</script>

<style scoped>
.modal-content {
  background-color: lightgreen;
  width: 70%;
  max-width: 500px;
  max-height: 300px;
  padding: 40px 30px;
  border-radius: 10px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.5s ease-in-out;
}
</style>
