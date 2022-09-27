<template>
    <div class="container-fluid">
        <!--Welcome Title -->
        <div class="row align-items-center justify-content-center">
            <div class="col col-12 align-items-center justify-content-center">
                <blockquote>
                    Welcome {{ validUserName }}!
                    <footer>
                        <small>
                            <em>&mdash; Every great film should seem new every time you see it.- Roger Ebert</em>
                        </small>
                    </footer>
                </blockquote>
            </div>
            <div class="col-12 col-md-10 col-lg-10 col-12 align-items-center justify-content-center">
                <div class="alert alert-success"
                     v-if="showMsg === 'new'"
                     :value="true">
                    New movie has been added.
                </div>
                <div class="alert alert-success"
                     v-if="showMsg === 'update'"
                     :value="true">
                    Movie information has been updated.
                </div>
                <div class="alert alert-success"
                     v-if="showMsg === 'deleted'"
                     :value="true">
                    Selected Movie has been deleted.
                </div>
            </div>
        </div>

        <!-- Data table -->
        <div class="row align-items-center justify-content-center">
            <div class="d-md-none" id="collapsable-card" style="width: 80%">
                <button type="button" class="btn btn-primary" @click="addNewMovie" style="background-color: white; border-color: white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#0275d8" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                    </svg>
                </button>
                <div class="card" v-for="movie in movies" v-bind:key="movie">
                    <div class="card-header" :id="'heading' + movie.pk">
                        <button class="btn btn-link collapsed" data-bs-toggle="collapse" :data-bs-target="'#collapse' + movie.pk" aria-expanded="true" :aria-controls="'collapse' + movie.pk">
                            <h6 style="color: #0275d8; float: left">{{movie.name}}</h6>
                        </button>
                    </div>

                    <div :id="'collapse' + movie.pk" class="collapse" :aria-labelledby="'heading' + movie.pk" data-bs-parent="#collapsable-card">
                        <div class="card-body">
                            <p><b>Rating:</b> {{movie.rating}}</p>
                            <p><b>Year:</b> {{movie.year}}</p>
                            <p>{{movie.description}}</p>
                            <div class="btn-group">
                            <button @click="updateMovie(movie)" style="background-color: transparent; padding: 0;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                </svg></button>
                            <button @click="deleteMovie(movie)" style="background-color: transparent; padding: 0;">
                                <svg @click="deleteMovie" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                </svg></button>
                        </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="col col-12 col-md-10 d-none d-xl-block d-lg-block d-md-block">
                <table class="table table-hover" style="overflow-y: auto"
                       :headers="headers">
                    <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Year</th>
                        <th scope="col">Rating</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for = "movie in movies" v-bind:key="movie">
                        <th scope="row">{{movie.name}}</th>
                        <td>{{movie.description}}</td>
                        <td>{{movie.year}}</td>
                        <td>{{movie.rating}}</td>
                        <td @click="updateMovie(movie)"><button style="background-color: transparent; padding: 0;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                            </svg></button>
                        </td>
                        <td @click="deleteMovie(movie)"><button style="background-color: transparent; padding: 0;">
                            <svg @click="deleteMovie" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                            </svg></button>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <button type="button" class="btn btn-primary" @click="addNewMovie">Add New Movie</button>
            </div>
        </div>
    </div>
</template>


<script>
    import { APIService } from "@/http/APIService";
    const apiService = new APIService();
    import axios from "axios";
    import router from "../router";

    export default {
        data() {
            return {
                movies: {},
                validUserName: "Guest",
                movieSize: 0,
                showMsg: '',
                isMobile: false,
                headers: [
                    {text: 'Name', sortable: false, align: 'left'},
                    {text: 'Description', sortable: false, align: 'left',},
                    {text: 'Year', sortable: false, align: 'left',},
                    {text: 'Rating', sortable: false, align: 'left',},
                    {text: 'Update', sortable: false, align: 'center',},
                    {text: 'Delete', sortable: false, align: 'center',},
                ],
            };
        },
        mounted() {
            this.getMovies();
            //   this.showMessages();
        },
        methods: {
            onResize() {
                if (window.innerWidth > 600)
                    this.isMobile = true;
                else
                    this.isMobile = false;
            },
            showMessages(){
                console.log(this.$route.params.msg)
                if (this.$route.params.msg) {
                    this.showMsg = this.$route.params.msg;
                }
            },
            getMovies() {
                apiService
                    .getMovieList()
                    .then((response) => {
                        this.movies = response.data.data;
                        this.movieSize = this.movies.length;
                        if (
                            localStorage.getItem("isAuthenticates") &&
                            JSON.parse(localStorage.getItem("isAuthenticates")) === true
                        ) {
                            this.validUserName = JSON.parse(localStorage.getItem("log_user"));
                        }
                    })
                    .catch((error) => {
                        if (error.response.status === 401) {
                            localStorage.removeItem("isAuthenticates");
                            localStorage.removeItem("log_user");
                            localStorage.removeItem("token");
                            router.push("/auth");
                        }
                    });
            },
            addNewMovie() {
                if (localStorage.getItem("isAuthenticates")
                    && JSON.parse(localStorage.getItem("isAuthenticates")) === true) {
                    router.push('/movie-create');
                } else {
                    router.push("/auth");
                }
            },
            updateMovie(movie) {
                router.push("/movie-create/" + movie.pk);
            },
            deleteMovie(movie) {
                if(confirm("Do you really want to delete?")) {
                    apiService.deleteMovie(movie.pk).then(response => {
                        if (response.status === 204) {
                            router.push('/movie-list/deleted/')
                            this.getMovies()
                        }
                    }).catch(error => {
                        if (error.response.status === 401) {
                            localStorage.removeItem('isAuthenticates');
                            localStorage.removeItem('log_user');
                            localStorage.removeItem('token');
                            router.push("/auth");
                        }
                    });
                }
            }
        },
    };
</script>

<style>
    button {
        padding: 1rem;
        border: 0;
        cursor: pointer;
    }
</style>