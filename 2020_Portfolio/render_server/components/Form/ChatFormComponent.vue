<template>
    <v-form class="chat-form" v-model="valid" @submit.prevent="addChat">
        <v-alert v-show="info" dense outlined type="error" width="100%">
            {{info}}
        </v-alert>
        <v-textarea v-model="message"
                    prepend-icon="mdi-image"
                    append-icon="mdi-send"
                    @click:prepend="clickImageInput"
                    @click:append="addChat"
                    @keyup.enter.exact="addChat"
                    @keydown.enter.shift.exact.prevent="enterText"
                    rows="2"
                    height="100%"
                    required solo single-line flat :dense = true hide-details />

        <input id="imageInput" type="file" accept="image/*" multiple="multiple" hidden @change.prevent="uploadChatImage">

        <div class="chat-form-image-add-delete-slide-container" v-if="imageUrls.length !== 0">
            <image-add-delete-slide-component :image-urls="imageUrls" @deleteImage="deleteChatImage"/>
        </div>
    </v-form>
</template>

<script>
    import ImageAddDeleteSlideComponent from "../Image/ImageAddDeleteSlideComponent";
    export default {
        name: "ChatFormComponent",
        components: {ImageAddDeleteSlideComponent},
        props : {
            roomId: Number
        },
        data() {
            return {
                valid:false,
                message:"",
                imageUrls : [],

                info : null,
            }
        },
        computed: {
            me () {
                return this.$store.state.user.me;
            },
        },
        methods : {
            enterText() {
                this.message = this.message+'\t'
            },
            clickImageInput() {
                if (!this.me) {
                    this.$emit('openLoginOverlay');
                    this.info = '로그인 후 채팅을 사용할 수 있습니다';
                }
                document.querySelector('#imageInput').click();
            },
            async uploadChatImage(e) {
                try {
                    const formData = new FormData();
                    Array.prototype.forEach.call(e.target.files, function (file) {
                        formData.append('images', file);
                    });
                    const res = await this.$store.dispatch('privateChat/uploadChatImages',{
                        formData
                    });
                    const {imageUrls} = res;
                    this.imageUrls = this.imageUrls.concat(imageUrls);
                } catch (e) {
                    console.error(e);
                }
            },
            async deleteChatImage(imageUrl, index) {
                try {
                    await this.$store.dispatch('privateChat/deleteChatImage',{
                        imageUrl
                    });
                    this.imageUrls.splice(index,1);
                } catch (e) {
                    console.error(e)
                }
            },
            async addChat() {
                try {
                    this.$emit('goToBottom');

                    if ( !this.me ) {
                        this.$emit('openLoginOverlay');
                        //info
                        return 0;
                    }

                    let check = this.message.replace('/\t/g','');
                    check.replace('//g','');
                    if ((this.message === "" || this.check === '') &&  this.imageUrls === []) {
                        return 0;
                    }

                    const res = await this.$store.dispatch('privateChat/addChat',{
                        roomId : this.roomId,
                        imageUrls : this.imageUrls,
                        message : this.message,
                    });

                    this.imageUrls = [];
                    this.message = "";

                } catch (e) {
                    console.error(e);
                }
            }
        }
    }
</script>

<style scoped>
    .chat-form {
        z-index: 1;
        background-color:white;
        width: 100%;
        height: 100%;
        padding: 0 10px
    }
    .chat-form-image-add-delete-slide-container {
        width: 100%;
        height: 200px;
        padding: 0 10px
    }
</style>