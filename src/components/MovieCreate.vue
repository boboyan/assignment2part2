<template>
  <div class="container-fluid">
    <div class="row align-items-center justify-content-center">
      <div class=" col align-items-center">
        <div class="row align-items-center justify-content-center">
          <div class="col col-12 col-sm-10 col-md-10 col-lg-6">
            <div class="alert alert-danger shadow" role="alert"
            v-if="showMsg === 'error'">
              Please verify Movie Information
            </div>
          </div>
        </div>
        <div class="row align-items-center justify-content-center">
          <div class="col col-12 col-sm-10 col-md-10 col-lg-6 align-items-center">
            <div class="card">
              <div class="card-header">{{pageTitle}}</div>
              <div class="card-body">
                <form ref="form">
                  <div class="container-fluid">

                    <div class="form-group row justify-content-around py-2">
                      <label class="col-5">Name</label>
                      <div class="col col-7">
                        <input v-model="movie.name" type="text" class="form-control-sm form-control">
                      </div>
                    </div>

                    <div class="form-group row justify-content-around py-2">
                      <label class="col-5">Description</label>
                      <div class="col col-7">
                        <input v-model="movie.description" type="text" class="form-control-sm form-control">
                      </div>
                    </div>          

                    <div class="form-group row justify-content-around py-2">
                      <label class="col-5">Year</label>
                      <div class="col col-7">
                        <input v-model="movie.year" type="text" class="form-control-sm form-control">
                      </div>
                    </div>

                    <div class="form-group row justify-content-around py-2">
                      <label class="col-5">Rating</label>
                      <div class="col col-7">
                        <input v-model="movie.rating" type="text" class="form-control-sm form-control">
                      </div>
                    </div>   
                    <div class="row justify-content-around">
                      <div v-if="!isUpdate" type="button" class="btn btn-primary col-4" @click="createMovie">Save</div>
                      <div v-if="isUpdate" type="button" class="btn btn-primary col-4" @click="updateMovie">Update</div>
                      <div type="button" class="btn btn-secondary col-4" @click="cancelOperation">Cancel</div>   
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import router from '../router';
  import {APIService} from '../http/APIService';
  const apiService = new APIService();

export default {
  data() {
      return {
        showError: false,
        movie: {},
        pageTitle: "Add New Movie",
        isUpdate: false,
        showMsg: '',          
      };
  },
    methods: {
      createMovie() {
        apiService.addNewMovie(this.movie).then(response => {
          if (response.status === 201) {
            this.movie = response.data;
            this.showMsg = "";
            router.push('/movie-list/new');
          }else{
            this.showMsg = "error";
          }
        }).catch(error => {
          if (error.response.status === 401) {
            router.push("/auth");
          }else if (error.response.status === 400) {
            this.showMsg = "error";
          }
        });
      },
      cancelOperation(){
        router.push("/movie-list");
      },
      updateMovie() {
        apiService.updateMovie(this.movie).then(response => {
          if (response.status === 200) {
            this.movie = response.data;
            router.push('/movie-list/update');
          }else{
            this.showMsg = "error";
          }
        }).catch(error => {
          if (error.response.status === 401) {
            router.push("/auth");
          }else if (error.response.status === 400) {
            this.showMsg = "error";
          }
        });
      }
    },
    mounted() {
      if (this.$route.params.pk) {
        this.pageTitle = "Edit Movie";
        this.isUpdate = true;
        apiService.getMovie(this.$route.params.pk).then(response => {
          this.movie = response.data;
        }).catch(error => {
          if (error.response.status === 401) {
            router.push("/auth");
          }
        });
      }
    },  
}
</script>

<style>

</style>