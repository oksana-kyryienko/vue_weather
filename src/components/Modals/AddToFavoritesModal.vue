<template>
  <modal-main :visible="visible">
    <p>{{ $t('confirmationAddFavorites') }}</p>
    <button @click="closeModal" class="modal-btn">OK</button>
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
    closeModal() {
      this.$emit('close-modal')
    }
  },
}
</script>
