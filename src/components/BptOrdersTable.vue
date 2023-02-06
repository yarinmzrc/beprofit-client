<template>
  <b-table
    :data="data"
    ref="table"
    paginated
    per-page="5"
    class="bpt-table-container"
    detailed
    detail-key="name"
    :show-detail-icon="showDetailIcon"
    aria-next-label="Next page"
    aria-previous-label="Previous page"
    aria-page-label="Page"
    aria-current-label="Current page"
  >
    <b-table-column
      v-for="item in ordersTableColumnData"
      :field="item.field"
      :label="item.label"
      :searchable="item.searchable"
      :sortable="item.sortable"
      :key="item.order_ID"
      v-slot="props"
      >{{ rowText(props, item) }}</b-table-column
    >

    <b-table-column v-slot="props" field="edit" label="Edit">
      <button @click="$emit('open-modal', props.row)" class="bpt-button">
        Edit
      </button>
    </b-table-column>

    <b-table-column v-slot="props" field="delete" label="Delete">
      <button
        class="bpt-button"
        @click="$emit('delete-order', props.row.order_ID)"
      >
        Delete
      </button>
    </b-table-column>

    <template #detail="props">
      <article class="media">
        <div class="media-content">
          <div class="content">
            <p
              v-for="item in filterDescriptionItems(props.row.line_items)"
              :key="item.line_item_ID"
            >
              <strong>{{ item.name }} </strong>
              <small>{{ item.price }}$</small>
              <br />
              {{ item.production_cost_reason }}
            </p>
          </div>
        </div>
      </article>
    </template>
  </b-table>
</template>

<script lang="ts">
import { IOrdersTableColumnData } from "@/constants/constants";
import { IOrders } from "@/store";

interface IProps {
  row: IOrders;
}

export default {
  name: "BptOrdersTable",
  data() {
    return {
      showDetailIcon: true,
      useTransition: false,
    };
  },
  props: {
    data: {
      type: Array,
    },
    ordersTableColumnData: {
      type: Array as any,
    },
  },
  methods: {
    filterDescriptionItems(lineItems: any[]) {
      const keys = ["line_item_ID"];
      return lineItems.filter(
        (value, index, self) =>
          self.findIndex((v) => keys.every((k) => v[k] === value[k])) === index
      );
    },
    rowText(props: IProps, item: IOrdersTableColumnData) {
      return item.field === "created_at"
        ? new Date(props.row.created_at!).toLocaleDateString()
        : props.row[item.field as keyof typeof props.row];
    },
  },
};
</script>

<style lang="scss" scoped>
.bpt-table-container {
  padding: 12px;
  border: 1px solid rgb(219, 219, 219);
  border-radius: 12px;
  text-align: start;

  .bpt-button {
    all: unset;
    padding: 6px 20px;
    background-color: #7957d5;
    border-radius: 4px;
    color: white;
  }
  .bpt-button:hover {
    cursor: pointer;
    background-color: #7e37e9;
  }
}
</style>
