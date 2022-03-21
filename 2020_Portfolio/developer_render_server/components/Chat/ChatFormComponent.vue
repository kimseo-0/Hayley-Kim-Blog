<template>
    <v-form v-model="valid" @submit.prevent="addChat" style="z-index: 1; background-color:white; width: 100%; height: 100%; padding: 0 10px">
        <v-textarea v-model="message"
                    prepend-icon="mdi-image"
                    @click:prepend="clickImageInput"
                    append-icon="mdi-send"
                    @click:append="addChat"
                    @keyup.enter.exact="addChat"
                    @keydown.enter.shift.exact.prevent="enterText"
                    rows="2"
                    height="100%"
                    required solo single-line flat :dense = true hide-details />

        <input id="imageInput" type="file" accept="image/*" multiple="multiple" hidden @change.prevent="uploadChatImage">

        <div v-if="imageUrls.length !== 0" style="width: 100%; height: 200px; padding: 0 10px">
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
            roomId: Number,
            me: Object
        },
        data() {
            return {
                valid:false,
                message:"",
                imageUrls : [],
            }
        },
        computed: {
        },
        methods : {
            enterText() {
                this.message = this.message+'\t'
            },
            clickImageInput() {
                if (!this.me) {
                   return 0;
                }
                document.querySelector('#imageInput').click();
            },
            async uploadChatImage(e) {
                try {
                    if (!this.me) {
                        return 0;
                    }
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
                    if (!this.me) {
                        return 0;
                    }
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
                    if ( !this.me ) {
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

</style>