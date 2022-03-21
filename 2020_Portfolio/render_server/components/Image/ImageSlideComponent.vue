<template>
    <div v-if="images.length !== 0" class="image-slide-image-container" v-swiper:mySwiper="swiperOption">
        <div class="swiper-wrapper" style="width: 100%" @mouseover="navigationShow" @mouseout="navigationShow">
            <div class="swiper-slide"  v-for="(image, index) in images" :key="index">
                <img class="image-slide-image" :src="`http://localhost:7001/${image.imageUrl}`" alt="" width="100%;"/>
            </div>
        </div>
        <div v-if="images.length > 1" v-show="slideBtn" class="swiper-button-next swiper-button-black"></div>
        <div v-if="images.length > 1" v-show="slideBtn" class="swiper-button-prev swiper-button-black"></div>
    </div>
</template>

<script>
    export default {
        name: "ImageSlideComponent.vue",
        props : {
            images: Array
        },
        data() {
            return {
                slideBtn:false,
                swiperOption: {
                    centeredSlides: true,
                    dynamicBullets: true,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable : true,
                        renderBullet: function (index, className) {
                            return '<span class="' + className + '" style="background-color: rgb(144, 107, 255)"></span>';
                        },
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                }
            }
        },
        methods: {
            navigationShow() {
                this.slideBtn = !this.slideBtn
            },
        }
    }
</script>

<style scoped>
    .image-slide-image-container {
        z-index: 0;
        width: 100%
    }
    .image-slide-image {
        border-radius: 5px;
    }

    .swiper-button-next,
    .swiper-button-prev {
        height: 20px;
    }
</style>