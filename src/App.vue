<template>
  <div class="app-container">
    <nav class="navbar">
      <img src="./assets/logo.png" width="140px" alt="beprofit-logo" />
    </nav>
    <div id="app-content">
      <div v-if="loading">Loading...</div>
      <h2 class="error-message" v-else-if="error">{{ error }}</h2>
      <div v-else>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import store from "./store";
import Vue from "vue";

export default Vue.extend({
  name: "App",
  data() {
    return {
      loading: false,
      error: "",
    };
  },
  async mounted() {
    this.loading = true;
    try {
      await store.dispatch("getOrders");
    } catch (err: any) {
      this.error = "Server is currently not available";
    }
    this.loading = false;
  },
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;500;700&display=swap");
.app-container {
  .navbar {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    padding: 0 40px;
    margin-bottom: 24px;
    border-bottom: 1px solid rgb(234, 234, 234);

    .title {
      font-size: 28px;
      font-weight: 400;
      color: #6514dd;
    }
  }
  #app-content {
    font-family: "Poppins", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    padding: 0 40px;

    .error-message {
      font-weight: bold;
      font-size: 40px;
      color: #7957d5;
      margin-top: 80px;
    }
  }
  .bpt-input {
    outline: none;
    padding: 6px 20px;
    width: 100%;
    border: 1px solid rgb(194, 194, 194);
    border-radius: 8px;
  }
  .bpt-button {
    all: unset;
    padding: 6px 20px;
    border-radius: 4px;
    text-align: center;
    background-color: #7957d5;
    color: white;
  }
  .bpt-button:hover {
    cursor: pointer;
    background-color: #7e37e9;
  }
}
</style>
