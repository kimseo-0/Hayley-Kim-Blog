<template>
    <div style="">
        <table v-if="chatMe!==me" style="">
            <tr>
                <td>
                    <div style=" text-align: center; width:25px; height:25px; :float: left; background-color: white; border-radius: 70%">
                        <img :src="`http://localhost:4001/${chatMe.avatarImageUrl}`" alt="" style="width: 100%; height: 100%">
                    </div>
                </td>
                <td style="vertical-align: bottom;">
                    <div style="margin-left: 5px; font-size: 15px;">
                        {{chat.nickName}}
                    </div>
                </td>
            </tr>
        </table>
        <div style="padding: 0 5px; margin: 5px 0 2px 0; display: inline-block">
            <v-card v-if="chat.message && chatMe!== me" max-width="250px" flat color="rgb(183, 193, 255)" style="border-radius: 15px;">
                <v-card-text style="padding: 5px 10px">{{chat.message}}</v-card-text>
            </v-card>
            <v-card v-if="chat.message && chatMe == me" max-width="250px" flat color="rgb(255, 247, 109)" style="border-radius: 15px;">
                <v-card-text style="padding: 5px 10px">{{chat.message}}</v-card-text>
            </v-card>
            <div v-if="chat.imageUrl && chatMe!== me" style="width: 80%; height: auto; float: left; border-radius: 8px; margin-top: 2px; padding: 4px 10px" @click="imageOverlay=true">
                <img :src="`http://localhost:6001/${chat.imageUrl}`" alt="" width="100%">
            </div>
            <div v-if="chat.imageUrl && chatMe=== me" style="width: 80%; height: auto; float: right; border-radius: 8px; margin-top: 2px; padding: 4px 10px" @click="imageOverlay=true">
                <img :src="`http://localhost:6001/${chat.imageUrl}`" alt="" width="100%">
            </div>
            <div style="clear:both;"></div>
        </div>
        <v-overlay
                color="black"
                opacity="0.8"
                absolute
                z-index="3"
                :value="imageOverlay"
                @click="imageOverlay=false"
        >
            <v-card style="width: 100%; border-radius: 5px;">
                <v-btn
                        fab
                        absolute
                        fixed
                        right
                        top
                        icon
                        large
                        color="white"
                        @click="imageOverlay=false"
                        style="float:right; right: 10px; top: 10px"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <img :src="`http://localhost:6001/${chat.imageUrl}`" alt="" style="width: 100%">
            </v-card>
        </v-overlay>
    </div>
</template>

<script>
    export default {
        name: "ChatCardComponent",
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

</style>