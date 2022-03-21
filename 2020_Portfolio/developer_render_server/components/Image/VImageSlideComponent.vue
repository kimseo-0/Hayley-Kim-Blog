<template>
    <div>
        <div v-if="images.length === 0" style="position: relative; color: #8A8A8A; height: 200px">
            <div style="position: absolute; top: 50%; text-align: center; width: 100%">
                NO IMAGE
            </div>
        </div>
        <div v-else v-swiper:mySwiper="swiperOption" style="z-index: 0; width: 100%">
            <div class="swiper-wrapper" style="width: 100%" @mouseover="navigationShow" @mouseout="navigationShow">
                <div class="swiper-slide"  v-for="(image, index) in images" :key="index">
                    <v-img :src="`http://localhost:7001/${image.imageUrl}`" alt="" width="100%;" style="border-radius: 5px; max-height: 300px"/>
                </div>
            </div>
            <div v-if="images.length > 1" v-show="slideBtn" class="swiper-button-next swiper-button-black"></div>
            <div v-if="images.length > 1" v-show="slideBtn" class="swiper-button-prev swiper-button-black"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "VImageSlideComponent.vue",
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
    .swiper-button-next,
    .swiper-button-prev {
        height: 20px;
    }
</style>