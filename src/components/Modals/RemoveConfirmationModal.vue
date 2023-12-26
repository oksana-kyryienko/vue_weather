<template>
  <modal-main :visible="visible">
    <p>{{ $t('confirmationRemoveCard') }}</p>
    <button @click="confirmRemove" class="modal-btn">{{ $t('buttons.yes') }}</button>
    <button @click="cancelRemove" class="modal-btn">{{ $t('buttons.no') }}</button>
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
