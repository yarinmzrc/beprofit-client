<template>
  <div class="orders">
    <p class="beprofit-description-container">
      <span class="beprofit-description-big"
        >Discover your true eCommerce profits at a glance.</span
      >
      <br />
      <span class="beprofit-description-small">
        Track all your expenses in one place.
      </span>
    </p>
    <button
      class="bpt-button create-order-btn"
      @click="() => (isCreateOrderModalOpen = true)"
    >
      Create Order
    </button>
    <div class="orders-container">
      <div class="table-container">
        <BptOrdersTable
          @open-modal="openModal"
          @delete-order="deleteOrder"
          :ordersTableColumnData="ordersTableColumnData"
          :data="orders"
        />
      </div>
    </div>
    <BptModal @close-modal="closeModal" v-if="isModalOpen">
      <BptOrdersForm :order-data="orderData" @update-order="updateOrder" />
    </BptModal>
    <BptModal @close-modal="closeModal" v-if="isCreateOrderModalOpen">
      <BptOrdersForm is-create @create-order="createOrder" />
    </BptModal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { ordersTableColumnData } from "../constants/constants";
import BptModal from "@/components/BptModal.vue";
import BptOrdersForm from "@/components/BptOrdersForm.vue";
import BptOrdersTable from "@/components/BptOrdersTable.vue";

export default Vue.extend({
  name: "OrdersView",
  components: {
    BptOrdersTable,
    BptModal,
    BptOrdersForm,
  },
  data() {
    return {
      ordersTableColumnData,
      isModalOpen: false,
      isCreateOrderModalOpen: false,
      orderData: {
        name: "",
        totalPrice: null,
        status: null,
      },
    };
  },
  computed: {
    orders() {
      return this.$store.state.orders;
    },
  },
  methods: {
    deleteOrder(id: string) {
      this.$store.commit("deleteOrder", { id });
    },
    updateOrder(orderDataToChange: any) {
      this.$store.commit("updateOrder", { orderData: orderDataToChange });
      this.isModalOpen = false;
    },
    createOrder(orderDataToCreate: any) {
      this.$store.commit("createOrder", { orderData: orderDataToCreate });
      this.isCreateOrderModalOpen = false;
    },
    openModal(data: any) {
      const newOrderData = {
        name: data.name,
        totalPrice: data.total_price,
        status: data.fulfillment_status,
      };
      this.orderData = { ...newOrderData };
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.isCreateOrderModalOpen = false;
    },
  },
});
</script>

<style lang="scss">
.orders {
  width: 100%;
  min-height: calc(100dvh - 104px);
  display: flex;
  flex-direction: column;
  align-items: center;

  .beprofit-description-container {
    margin: 60px 0;

    .beprofit-description-big {
      font-size: 40px;
      font-weight: bold;
      color: #6514dd;
    }

    .beprofit-description-small {
      font-size: 20px;
      color: rgb(163, 163, 163);
    }
  }

  .create-order-btn {
    margin: 20px 0;
  }

  .orders-container {
    width: 100%;

    .table-container {
      width: 100%;
    }
  }

  .modal-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
    gap: 20px;
  }
}
</style>
