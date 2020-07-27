<template>
  <div id="nav" class="navigation">
    <div class="logo">Q</div>
    <div v-if="this.token">
      <nuxt-link to="/home">Home</nuxt-link>
      <a v-on:click="logout($event)">Logout</a>
    </div>
    <div v-else>
      <nuxt-link to="/login">Login</nuxt-link>
    </div>
  </div>
</template>

<script>
  import {mapMutations, mapState} from 'vuex';

  export default {
    data() {
        return {};
    },
    methods: {
        ...mapMutations({
            setToken: 'setToken',
        }),
        logout (event) {
            event.preventDefault();
            localStorage.removeItem('api_token');
            this.setToken('');
            this.$router.push('/');
        }
    },
    computed: {
        ...mapState({
            token: state => state.token
        })
    }
  };
</script>

<style>
  .logo {
    font-weight: bold;
    font-size: 24px;
  }

  .navigation {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    background: #FAFAFA;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
    margin-bottom: 2px;
    text-align: center;
    color: #2c3e50;
  }

  .navigation a {
    margin-right: 10px;
    font-weight: bold;
    color: #2c3e50;
  }

  .navigation a:last-child {
    margin-right: 0;
  }
</style>
