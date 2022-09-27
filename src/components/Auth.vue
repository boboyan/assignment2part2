<template>
  `
  <div class="container">
    <div class="row align-items-center justify-content-center">
      <div class="col-12 col-sm-6 col-md-4 col-lg-4">
        <div class="card mx-auto shadow">
          <div class="card-body">
            <div class="card-title"><span>Login</span></div>
            <div
              v-if="showMsg === 'error'"
              close-icon="mdi-close-circle"
              :value="true"
              class="alert alert-danger"
              role="alert"
              dense
            >
              Invalid username or password. Please Try again.
            </div>
            <div class="card-text pt-2">
              <div
                class="row align-items-center justify-content-center"
                v-if="loading"
              >
                <div class="progress">
                  <div
                    class="
                      progress-bar progress-bar-striped progress-bar-animated
                    "
                    role="progressbar"
                    aria-valuenow="75"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style="width: 75%"
                  ></div>
                </div>
              </div>

            

              <div class="col-md-10 mb-3">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">@</span>
                  </div>
                  <input
                    
                    v-model="credentials.username"
                    :counter="70"
                    label="Username"
                    :rules="rules.username"
                    maxlength="70"
                    required
                    type="text"
                    class="form-control mb-3"
                    placeholder="Username"
                    aria-describedby="inputGroupPrepend2"
                  />

                  <div class="w-100"></div>

                  <div class="input-group-prepend">
                    <span class="input-group-text">***</span>
                  </div>
                  <input
                    :type="showPassword ? 'text' : 'Password'"
                    v-model="credentials.password"
                    label="Password"
                    :rules="rules.password"
                    maxlength="20"
                    required
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword = ! showPassword"
                    class="form-control"
                    placeholder="Password"
                    aria-describedby="inputGroupPrepend2"

                  />
                </div>
              </div>

              <button ref ="form" @click.prevent="login" class="btn btn-primary">Login</button>


            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `
</template>

<script>
import router from "../router";
import { APIService } from "../http/APIService";
const apiService = new APIService();

export default {
  name: "Auth",

  data: () => ({
    credentials: {},
    valid: true,
    showMsg: "",
    loading: false,
    rules: {
      username: [
        (v) => !!v || "Username is required",
        (v) =>
          (v && v.length > 3) ||
          "A username must be more than 3 characters long",
        (v) =>
          /^[a-z0-9_]+$/.test(v) ||
          "A username can only contain letters and digits",
      ],
      password: [
        (v) => !!v || "Password is required",
        (v) =>
          (v && v.length > 7) ||
          "The password must be longer than 7 characters",
      ],
    },
    showPassword: false,
  }),
  methods: {
    login() {
      // checking if the input is valid
      console.log("IS THIS THING WORKING")
      if (this.$refs.form) {
        this.loading = true;
        apiService
          .authenticateLogin(this.credentials)
          .then((res) => {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("isAuthenticates", JSON.stringify(true));
            localStorage.setItem(
              "log_user",
              JSON.stringify(this.credentials.username)
            );
            //router.push("/");
            //router.go(-1);
            window.location = "/";
          })
          .catch((e) => {
            this.loading = false;
            localStorage.removeItem("isAuthenticates");
            localStorage.removeItem("log_user");
            localStorage.removeItem("token");
            // router.go(-1);
            this.showMsg = "error";
          });
      }
    },
    testMethod() {
      console.log(this.$refs.form);
      console.log("hey");
    },
  },
};
</script>

<style>
input {
  padding: 1rem;
}

form {
  display: flex;
  justify-content: center;
  flex-direction: vertical;
}
</style>