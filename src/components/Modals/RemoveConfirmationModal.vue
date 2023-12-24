<template>
  <modal-main :visible="visible">
    <p>Are you sure you want to remove this weather card?</p>
    <button @click="confirmRemove" class="modal-btn">Yes</button>
    <button @click="cancelRemove" class="modal-btn">No</button>
  </modal-main>
</template>

<script>
import ModalMain from '@/components/Modals/ModalMain.vue'

export default {
  components: {
    ModalMain
  },
  props: {
    visible: Boolean
  },
  methods: {
    confirmRemove() {
      this.$emit('confirm-remove')
    },
    cancelRemove() {
      this.$emit('cancel-remove')
    }
  },
}
</script>
