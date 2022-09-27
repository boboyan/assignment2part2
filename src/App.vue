<template>

  <ul class="nav justify-content-center">
  <li class="nav-item active">
    <router-link to="/">Home</router-link> |  
  </li>
  <li class="nav-item">
    <router-link :to="{name: 'MovieList'}">Movies</router-link>  
  </li>
  <li class="nav-item" v-if="!authenticated" @click="login" >
   | <router-link :to="{name: 'Auth'}">Log in</router-link>
  </li>
  <li class="nav-item" v-if="!authenticated" @click="register" >
   | <router-link :to="{name: 'Register'}">Register</router-link>
  </li>
    <li class="nav-item  .justify-content-end" v-if="authenticated" @click="logout" >
   | <router-link :to="{name: 'Auth'}">Logout</router-link>
  </li>
</ul>


  <router-view/>
</template>



<script>

import router from "./router";
import { APIService } from "./http/APIService";
const apiService = new APIService();

export default {
  name: 'App',
  props: {
    msg: String
  },
  data: () => ({
    authenticated: false,
    dialog: false,
    uName: "Guest",
    menu: [],
  }),
  mounted() {
    this.fillMenu();
    apiService
      .getMovieList()
      .then((response) => {
        this.authenticated = true;
      })
      .catch((error) => {
        if (error.response.status === 401) {
          localStorage.removeItem("isAuthenticates");
          localStorage.removeItem("log_user");
          localStorage.removeItem("token");
          this.authenticated = false;
        }
      });
    console.log("this.authenticated--" + this.authenticated);
  },
  methods: {
    fillMenu() {
      if (
        localStorage.getItem("isAuthenticates") &&
        JSON.parse(localStorage.getItem("isAuthenticates")) === true
      ) {
        console.log("IS AUTH");
        this.uName = JSON.parse(localStorage.getItem("log_user"));
      } else {
        console.log("IS NOT AUTH");
      }
      this.menu = [{ title: "Movies", url: "/movie-list" }];
    },
    getUser() {
      if (
        localStorage.getItem("isAuthenticates") &&
        JSON.parse(localStorage.getItem("isAuthenticates")) === true
      ) {
        console.log("IS AUTH");
        this.validUserName = JSON.parse(localStorage.getItem("log_user"));
      } else {
        console.log("IS NOT AUTH");
      }
    },
    logout() {
      localStorage.removeItem("isAuthenticates");
      localStorage.removeItem("log_user");
      localStorage.removeItem("token");
      this.authenticated = false;
      // router.push('/');
      window.location = "/";
    },
    home() {
      window.location = "/";
    },
    register() {
      router.push("/register");
    },
    login() {
      router.push("/auth");
    },
  },
}
</script>



<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  background-color: cadetblue;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.nav {
  padding: 1em;
  background-color: cadetblue;

  li {
    font-weight: bold;
    color: #2c3e50;
  }
  a {
    color: black;
    padding: .5em;

    &.router-link-exact-active {
      color: #42b983;
    }
  }


}
</style>
