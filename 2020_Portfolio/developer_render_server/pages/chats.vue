<template>
    <v-card flat height="100%" :width="this.$vuetify.breakpoint.name === 'md' || this.$vuetify.breakpoint.name === 'lg' || this.$vuetify.breakpoint.name === 'xl' ? '40%' : '100%'" style="">
        <v-card-title>
            <h3>CHATS</h3>
        </v-card-title>
        <v-card-subtitle>
            <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details />
        </v-card-subtitle>
        <chat-rooms-component :rooms="rooms" :search="search"/>
    </v-card>
</template>

<script>
    import ChatRoomsComponent from "../components/Chat/ChatRoomsComponent";

    export default {
        name: "chat",
        components :{
            ChatRoomsComponent
        },
        data() {
            return {
                waitingRoomSocket : null,
                search: '',
            }
        },
        computed : {
            me() {
                return this.$store.state.user.me;
            },
            rooms() {
                return this.$store.state.privateChat.rooms;
            },
        },
        methods : {

        },
        async created() {
            this.$store.commit('currentPage',{
                currentPage : "developerPage"
            });
        },
        mounted() {
        }
    }
</script>

<style scoped>

</style>