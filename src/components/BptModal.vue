<template>
  <div class="modal">
    <div class="modal-content">
      <div class="btn-container">
        <button class="bpt-button" @click="handleClose">Close Modal</button>
      </div>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "modal-vue",
  methods: {
    handleClose() {
      this.$emit("close-modal");
    },
  },
});
</script>

<style lang="scss" scoped>
.modal {
  max-height: 100vh;
  overflow: hidden;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: bottom 1s;
  .modal-content {
    background: #fff;
    width: 600px;
    height: 400px;
    padding: 20px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px;

    .btn-container {
      display: flex;
      justify-content: end;
      padding: 10px;
      .close-btn {
        cursor: pointer;
      }
    }
  }
}

@media (max-width: 720px) {
  .modal {
    .modal-content {
      width: 300px;
      height: 400px;
    }
  }
}
</style>
