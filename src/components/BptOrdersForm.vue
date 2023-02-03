<template>
  <form @submit.prevent="handleSaveChanges">
    <div class="modal-container">
      <h2>{{ orderNameText }}</h2>
      <div>
        <label for="total_price">Total Price</label>
        <input
          class="bpt-input"
          required
          type="number"
          id="name"
          v-model="orderDataToChange.totalPrice"
        />
      </div>
      <div>
        <label for="status">Status</label>
        <select
          class="bpt-input"
          v-model="orderDataToChange.status"
          name="status"
          required
          id="status"
        >
          <option value="fulfilled">fulfilled</option>
          <option value="unfulfilled">unfulfilled</option>
        </select>
      </div>
      <button type="submit" @click="handleSaveChanges" class="bpt-button">
        {{ buttonText }}
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "BptOrdersForm",
  data() {
    return {
      orderDataToChange: this.orderData,
    };
  },
  props: {
    orderData: {
      default: {
        name: "",
        totalPrice: null,
        status: null,
      },
    },
    isCreate: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    buttonText(): string {
      return this.isCreate ? "Create" : "Update";
    },
    orderNameText(): string {
      return !this.isCreate ? `Order: ${this.orderDataToChange.name}` : "";
    },
  },
  methods: {
    handleSaveChanges() {
      const { totalPrice, status } = this.orderDataToChange;
      if (!totalPrice || !status) return;
      if (this.isCreate) {
        this.$emit("create-order", this.orderDataToChange);
      } else {
        this.$emit("update-order", this.orderDataToChange);
      }
      this.orderDataToChange = {
        name: "",
        totalPrice: null,
        status: null,
      };
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
