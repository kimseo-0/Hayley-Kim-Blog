<template>
    <v-card flat style="padding: 20px;">
        <v-card-title>
            <h3>CONTACTS</h3>
        </v-card-title>
        <v-card-subtitle>
            <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details />
        </v-card-subtitle>
        <contact-card-component :contacts="contacts" :search="search"/>
    </v-card>
</template>

<script>
    import ContactCardComponent from "../components/Contact/ContactCardComponent";

    export default {
        name: "contactRooms",
        components : {
            ContactCardComponent,
        },
        data() {
            return {
                search: ''
            }
        },
        computed : {
            me() {
                return this.$store.state.user.me;
            },
            contacts() {
                return this.$store.state.contact.contacts;
            },
        },
        async created() {
            this.$store.commit('currentPage',{
                currentPage : "developerPage"
            });
        },
    }
</script>

<style scoped>

</style>