<template>
    <div>
        <table v-if="chatMe!==me">
            <tr>
                <td>
                    <div class="chat-user-avatar-image-container">
                        <img class="chat-user-avatar-image" :src="`http://localhost:4001/${chatMe.avatarImageUrl}`" alt="">
                    </div>
                </td>
                <td class="chat-user-nickname-container">
                    <div class="chat-user-nickname">
                        {{chat.nickName}}
                    </div>
                </td>
            </tr>
        </table>
        <div class="chat-container">
            <v-card class="chat-message-container" v-if="chat.message && chatMe!== me" max-width="250px" flat color="rgb(183, 193, 255)">
                <v-card-text class="chat-message">{{chat.message}}</v-card-text>
            </v-card>
            <v-card class="chat-message-container" v-if="chat.message && chatMe == me" max-width="250px" flat color="rgb(255, 247, 109)">
                <v-card-text class="chat-message">{{chat.message}}</v-card-text>
            </v-card>
            <div class="chat-image-container" v-if="chat.imageUrl && chatMe!== me" @click="imageOverlay=true">
                <img :src="`http://localhost:6001/${chat.imageUrl}`" alt="" width="100%">
            </div>
            <div class="chat-image-container" v-if="chat.imageUrl && chatMe=== me" @click="imageOverlay=true">
                <img :src="`http://localhost:6001/${chat.imageUrl}`" alt="" width="100%">
            </div>
            <div style="clear:both;"></div>
        </div>

        <image-overlay-component v-if="chat.imageUrl" :image-url="chat.imageUrl" :image-overlay="imageOverlay" @close="closeImageOverlay"/>
    </div>
</template>

<script>
    import ImageOverlayComponent from "../Image/ImageOverlayComponent";
    export default {
        name: "ChatCardComponent",
        components: {ImageOverlayComponent},
        props : {
            chat : Object,
            chatMe : Object
        },
        data() {
            return {
                singleRow: true,

                imageOverlay: false,
            }
        },
        computed : {
            me () {
                return this.$store.state.user.me;
            }
        },
        methods: {
            closeImageOverlay() {
                this.imageOverlay = false;
            },
            showImage() {
                this.imageOverlay = true;
            }
        },
        mounted() {
        }
    }
</script>

<style scoped>
    .chat-user-avatar-image-container {
        text-align: center;
        width:25px;
        height:25px;
        float: left;
        background-color: white;
        border-radius: 70%
    }
    .chat-user-avatar-image {
        width: 100%;
        height: 100%
    }
    .chat-user-nickname-container {
        vertical-align: bottom;
    }
    .chat-user-nickname {
        margin-left: 5px;
        font-size: 15px;
    }
    .chat-container {
        padding: 0 5px;
        margin: 5px 0 2px 0;
        display: inline-block;
    }
    .chat-message-container {
        border-radius: 15px;
    }
    .chat-message {
        padding: 5px 10px;
    }
    .chat-image-container {
        width: 80%;
        height: auto;
        float: left;
        border-radius: 8px;
        margin-top: 2px;
        padding: 4px 10px;
    }
</style>