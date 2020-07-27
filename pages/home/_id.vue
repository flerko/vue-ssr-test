<template>
  <div>
    <loader v-if="loading"></loader>
    <div v-else>
      <navbar-back></navbar-back>
      <form class="project-edit">
        <label class="project-edit-block">
          <span>Name</span>
          <input type="text" v-model="projectName" placeholder="Project name:">
          <button type="submit" v-on:click="submit">Ok</button>
        </label>
      </form>
    </div>
    <p v-if="errorApi">{{errorApi}}</p>
  </div>
</template>

<script>
  import Loader from "../../components/Loader";
  import NavbarBack from "../../components/NavbarBack";
  import Api from '../../services/Api';
  import { get } from 'lodash';
  import { parseErrorsAPI } from '../../utils';
  const api = new Api('https://api.quwi.com/v2/');

  export default {
      components: {Loader, NavbarBack},
      data() {
          return {
              loading: true,
              errorApi: '',
              projectName: '',
          };
      },
      mounted () {
          api.get(`projects-manage/${this.$route.params.id}`).then((res) => {
              this.projectName = get(res, 'project.name', '');
          }).catch((error) => {
              this.errorApi = parseErrorsAPI(error);
          }).finally(() => {
              this.loading = false;
          });
      },
      methods: {
          submit(event) {
              event.preventDefault();
              this.loading = true;
              api.post(`projects-manage/update?id=${this.$route.params.id}`, {
                  body: JSON.stringify({name: this.projectName})
              }).then((res) => {
                  this.projectName = get(res, 'project.name', '');
              }).catch((error) => {
                  this.errorApi = parseErrorsAPI(error);
              }).finally(() => {
                  this.loading = false;
              });
          }
      }
  };
</script>

<style scoped>
  .project-edit {
    padding: 40px;
    background-color: #F4F4F4;
  }

  .project-edit * {
    box-sizing: border-box;
  }

  .project-edit-block {
    background-color: #fff;
    padding: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 768px;
    width: 100%;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
  }

  input {
    padding: 10px 20px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }

  button {
    padding: 12px 20px;
    background-color: #395378;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  button:hover {
    background-color: #86b8ec;
  }

  .error-message {
    color: #f00;
  }
</style>
