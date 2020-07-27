<template>
  <div class="navbar-back">
    <div class="navbar-back__button" v-on:click="goBack">Back</div>
  </div>
</template>

<script>
  export default {
    methods: {
        goBack() {
            this.$router.go(-1);
        }
    }
  };
</script>

<style scoped>
  .navbar-back {
    display: flex;
    width: 100%;
    background: #C1C8D2;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
    padding: 10px 20px;
    margin-bottom: 2px;
  }

  .navbar-back__button {
    background-color: #CECECE;
    padding: 10px 30px;
    cursor: pointer;
    border-radius: 5px;
    box-sizing: border-box;
    transition: background-color 0.2s;
  }

  .navbar-back__button:hover {
    background-color: #e2e2e2;
  }
</style>
