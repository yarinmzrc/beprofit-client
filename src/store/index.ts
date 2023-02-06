import Vue from "vue";
import Vuex from "vuex";
import data from "../../orders.json";
import { v4 as uuidv4 } from "uuid";

Vue.use(Vuex);

export interface ILineItems {
  name: string;
  price: number;
  production_cost_reason: string;
}

export interface IOrders {
  name: string;
  total_price: number | null;
  fulfillment_status: string | null;
  line_items: ILineItems[];
  total_items: number;
  order_ID?: string;
  created_at?: Date | string;
}

export default new Vuex.Store({
  state: {
    orders: [] as IOrders[],
  },
  getters: {},
  mutations: {
    setOrders: (state, payload) => {
      state.orders = [...payload];
    },
    deleteOrder: (state, payload) => {
      const { id } = payload;
      const updatedOrders = state.orders.filter(
        (order) => order.order_ID !== id
      );
      state.orders = [...updatedOrders];
    },
    updateOrder: (state, payload) => {
      const { name, totalPrice, status } = payload.orderData;
      const updatedOrderIndex = state.orders.findIndex(
        (order) => order.name === name
      );
      if (updatedOrderIndex > -1) {
        const newOrders = [...state.orders];
        newOrders[updatedOrderIndex] = {
          ...newOrders[updatedOrderIndex],
          name,
          total_price: Number(totalPrice),
          fulfillment_status: status,
        };
        state.orders = [...newOrders];
      }
    },
    createOrder: (state, payload) => {
      const { totalPrice, status } = payload.orderData;
      state.orders = [
        ...state.orders,
        {
          name: uuidv4(),
          total_price: Number(totalPrice),
          total_items: 1,
          fulfillment_status: status,
          created_at: new Date().toLocaleString(),
          line_items: [
            {
              name: "Astra (5 colors) - Women's / Silver / 9",
              price: 59.99,
              production_cost_reason:
                "This was manually edited in the orders page on 30 Nov, 2020",
            },
          ],
        },
      ];
    },
  },
  actions: {
    async getOrders({ commit }) {
      const isOk = await fetch("https://www.become.co/api/rest/test.php").then(
        (res) => res.json()
      );
      if (isOk.success) {
        commit("setOrders", data);
      }
    },
  },
  modules: {},
});
