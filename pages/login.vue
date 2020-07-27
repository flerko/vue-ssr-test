<template>
  <div class='login'>
    <navbar></navbar>
    <form>
      <h2 class="login__title">Login</h2>
      <label>
        <input required v-model="email" type="email" placeholder="Email">
      </label>
      <label>
        <input required v-model="password" type="password" placeholder="Password">
      </label>
      <p class="error-message" v-if="errorApi">{{errorApi}}</p>
      <button type="submit" v-on:click="login($event)">Login</button>
    </form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import Navbar from '../components/Navbar';
import Api from '../services/Api';
import { parseErrorsAPI } from '../utils';
import { get } from 'lodash';
const api = new Api('https://api.quwi.com/v2/');

export default {
    components: {
      Navbar
    },
  data () {
    return {
      email: '',
      password: '',
      errorApi: ''
    };
  },
  methods: {
    ...mapMutations({
        setToken: 'setToken',
    }),
    login (event) {
      event.preventDefault();
      if (!this.email || !this.password) return;
      api.post('auth/login', {
        body: JSON.stringify({
          email: this.email,
          password: this.password
        })
      }).then((res) => {
        const token = get(res, 'token');
        localStorage.setItem('api_token', token);
        this.setToken(token);
        this.$router.push('/home');
      }).catch((e) => {
        this.errorApi = parseErrorsAPI(e);
      });
    }
  }
};
</script>

<style scoped>
  .login * {
    box-sizing: border-box;
  }

  .login__title {
    font-weight: bold;
    text-transform: uppercase;
  }

  .login label:first-child {
    margin-top: 0;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: 480px;
    background: #F4F4F4;
    padding: 0 20px;
  }

  label {
    width: 100%;
    margin-top: 15px;
  }

  input {
    padding: 15px;
    width: 100%;
    outline: none;
    border: 1px solid #dadada;
    border-radius: 5px;
  }

  button {
    cursor: pointer;
    background: #395378;
    color: #fff;
    padding: 10px 45px;
    text-shadow: none;
    font-size: 18px;
    border-radius: 5px;
    font-weight: 400;
    margin-top: 15px;
    border: none;
    text-transform: uppercase;
  }

  button:focus {
    outline: none;
  }

  .error-message {
    color: #f00;
  }
</style>
