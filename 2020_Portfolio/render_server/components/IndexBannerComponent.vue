<template>
    <div style="display: flex; width: 100%; height: 100%">
        <div style="margin: auto;font-size: 30px">
            <div style="margin: 20px 0">
                <div v-if="slideTexts.length !== 0" v-swiper:mySwiper="swiperOption" style="width: 300px; height: 50px;">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(slideText, index) in slideTexts" :key="index" style="width: 100%; text-align: center">{{slideText}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "IndexBannerComponent",
        data() {
            return {
                slideTexts:[],
                swiperOption: {
                    centeredSlides: true,
                    loop: true,
                    // autoplay: {
                    //     delay: 2500,
                    //     disableOnInteraction: false,
                    // },
                },
            }
        },
        created() {

            this.slideTexts = ["Hayley Kim's blog"];
        }
    }
</script>

<style scoped>
    .swiper-slide {
        width: 100%;
        text-align: center;
    }
</style>