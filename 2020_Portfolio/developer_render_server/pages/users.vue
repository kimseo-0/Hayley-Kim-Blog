<template>
    <v-card flat style="padding: 20px; width: 100%">
        <v-card-title>
            <h3>USERS</h3>
        </v-card-title>
        <v-card-subtitle>
            <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details />
        </v-card-subtitle>
        <user-data-component :search="search" :users="users"/>
    </v-card>
</template>

<script>
    import UserDataComponent from "../components/Users/UserDataComponent";
    export default {
        name: "users",
        components: {UserDataComponent},
        data() {
          return {
              search: ''
          }
        },
        computed: {
            users() {
                return this.$store.state.user.users;
            }
        },
        created() {
            this.$store.commit('currentPage',{
                currentPage : "developerPage"
            });
        },
        methods: {

        }
    }
</script>

<style scoped>

</style>