<template>
    <v-card class="chat-top-container" color="rgb(144, 107, 255)" dark flat tile>
        <div class="chat-top">
            <close-button-component :color="'white'" @click="closeContactDrawer"/>
            CONTACT CHAT
        </div>
    </v-card>
</template>

<script>
    import InfoComponent from "../InfoComponent";
    import CloseButtonComponent from "../Button/CloseButtonComponent";
    export default {
        name: "ContactTopComponent",
        components: {CloseButtonComponent, InfoComponent},
        data() {
            return {
                topInfoBar: false,
            }
        },
        methods: {
            closeContactDrawer() {
                this.$emit('closeContactDrawer');
            }
        }
    }
</script>

<style scoped>
    .chat-top-container {
        width: 100%;
        height: 100%;
    }
    .chat-top {
        height: 100%;
        font-size: 20px;
        padding: 10px;
    }
</style>