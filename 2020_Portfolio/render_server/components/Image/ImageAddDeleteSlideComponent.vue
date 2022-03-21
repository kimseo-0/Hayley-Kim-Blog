<template>
    <div class="image-add-delete-slide-container" v-if="imageUrls.length !== 0" v-swiper:mySwiper="swiperOption">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(imageUrl, index) in imageUrls" :key="index">
                <v-btn class="image-add-delete-slide-image-button" icon x-small @click="deleteImage(imageUrl, index)">
                    <v-icon small color="white"> mdi-close </v-icon>
                </v-btn>
                <img class="image-add-delete-slide-image" :src="`http://localhost:6001/${imageUrl}`">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ImageAddDeleteSlideComponent",
        props: {
            imageUrls: Array
        },
        data() {
            return {
                swiperOption: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                    freeMode: true,
                }
            }
        },
        methods: {
            async deleteImage(imageUrl, index) {
                this.$emit('deleteImage',{imageUrl, index})
            },
        }
    }
</script>

<style scoped>
    .image-add-delete-slide-container {
        width: 100%;
        height: 100%;
    }
    .image-add-delete-slide-image-button {
        position:absolute;
        right: 5px;
        top: 5px;
        background-color: rgb(198, 0, 0);
    }
    .image-add-delete-slide-image {
        width: 100%;
    }
    .swiper-slide {
        width: 100%;
        text-align: center;
        position: relative;
    }
</style>