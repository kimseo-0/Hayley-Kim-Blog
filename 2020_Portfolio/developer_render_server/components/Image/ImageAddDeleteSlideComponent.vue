<template>
    <div v-if="imageUrls.length !== 0" v-swiper:mySwiper="swiperOption" style="width: 100%; height: 100%">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(imageUrl, index) in imageUrls" :key="index" style="position: relative">
                <v-btn icon x-small @click="deleteImage(imageUrl, index)" style="position:absolute; right: 5px; top: 5px; background-color: rgb(198, 0, 0)">
                    <v-icon small color="white"> mdi-close </v-icon>
                </v-btn>
                <img :src="`http://localhost:6001/${imageUrl}`" style="width: 100%">
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
    .swiper-slide {
        width: 100%;
        text-align: center;
    }
</style>