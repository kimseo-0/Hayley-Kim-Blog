<template>
    <v-btn fixed absolute dark small icon fab
           @click="openContactDrawer"
           style=" bottom: 20px; right: 20px; height: 40px; border: rgb(144, 107, 255) solid 2px">
        <v-badge
                :content="newChatNum"
                :hidden="newChatNum===0"
                color="rgb(144, 107, 255)"
                left >
            <v-icon color="rgb(144, 107, 255)">mdi-chat-processing</v-icon>
        </v-badge>
        <v-icon v-if="newChatNum===0" color="rgb(144, 107, 255)">mdi-chat</v-icon>
    </v-btn>
</template>

<script>
    export default {
        name: "ContactButtonComponent",
        data() {
            return{
                contactBtn : false,
            }
        },
        computed : {
            me() {
                return this.$store.state.user.me;
            },
            newChatNum() {
                return this.$store.state.privateChat.newChatNum;
            }
        },
        methods : {
            openContactDrawer() {
                this.$emit('openContactDrawer')
            },
        }
    }
</script>

<style scoped>

</style>