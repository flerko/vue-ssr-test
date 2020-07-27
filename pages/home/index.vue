<template>
  <div class="home">
    <navbar></navbar>
    <div class="home-projects">
      <nuxt-link v-for="project in projects" :key="project.id" class="project-box" :to="`/home/${project.id}`">
        <img class="project-box__logo" :src="project.logo_url" alt="project logo">
        <h2 class="project-box__title">{{project.name}}</h2>
        <p :class="`project-box__status ${renderStatus(project.is_active)}`">{{renderStatus(project.is_active)}}</p>
      </nuxt-link>
    </div>
    <p v-if="errorApi">{{errorApi}}</p>
  </div>
</template>

<script>
import Navbar from '../../components/Navbar';
import Api from '../../services/Api';
import { parseErrorsAPI } from '../../utils';
import { get } from 'lodash';
const api = new Api('https://api.quwi.com/v2/');

export default {
  name: 'Home',
    components: {
        Navbar
    },
  data () {
    return {
      projects: [],
      errorApi: ''
    };
  },
  mounted () {
    const token = localStorage.getItem('api_token');
    if (!token) return this.$router.push('/login');
    api.get('projects-manage/index').then((res) => {
      this.projects = get(res, 'projects', []);
    }).catch((error) => {
      this.errorApi = parseErrorsAPI(error);
    });
  },
  methods: {
    renderStatus (status) {
      if (status) {
        return 'active';
      }
      return 'non-active';
    }
  }
};
</script>

<style scoped>
  .home {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #F4F4F4;
  }

  .home * {
    box-sizing: border-box;
  }

  .home-projects {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    padding-bottom: 15px;
  }

  .project-box {
    width: 100%;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    max-width: 768px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 15px;
    color: #000;
  }

  .project-box:hover {
    background-color: #e2e2e2;
  }

  .project-box__logo {
    width: 50px;
    height: 50px;
  }

  .project-box__title {
    width: 50%;
    margin-left: 15px;
    font-weight: bold;
  }

  .project-box__status {
    width: calc(100% - 50% - 50px - 15px);
    font-weight: bold;
    text-transform: capitalize;
  }

  .active {
    color: green;
  }

  .non-active {
    color: gray;
  }
</style>
