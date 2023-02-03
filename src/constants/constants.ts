export const ordersTableColumnData = [
  {
    field: "name",
    label: "Name",
    searchable: true,
    sortable: true,
  },
  {
    field: "total_items",
    label: "Total Items",
    searchable: true,
    sortable: true,
  },
  {
    field: "total_price",
    label: "Total Price",
    searchable: false,
    sortable: false,
  },
  {
    field: "fulfillment_status",
    label: "Status",
    searchable: false,
    sortable: true,
  },
  {
    field: "created_at",
    label: "Date",
    searchable: false,
    sortable: true,
  },
];

export interface IOrdersTableColumnData {
  field: string;
  label: string;
  searchable: boolean;
  sortable: boolean;
}
