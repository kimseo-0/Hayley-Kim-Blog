<template>
    <div v-if="bannerTexts.length !== 0" v-swiper:Swiper="bannerOption" style="width:100%; height: 100%;">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(slideText, index) in bannerTexts" :key="index" style="width: 100%; font-size: 15px">{{slideText}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "BannerComponent",
        data() {
            return {
                bannerTexts:[
                    '서','버',' ','테', '스', '트', ' ', '중', ' ', '입', '니', '다','.',' ',
                    '에','러','는',' ','이','메','일',',','채','팅',',','컨','택','트','를',' ',
                    '통','해',' ','문','의','신','고',' ','부','탁','드','립','니','다',
                    '서','버',' ','테', '스', '트', ' ', '중', ' ', '입', '니', '다','.',' ',
                    '에','러','는',' ','이','메','일',',','채','팅',',','컨','택','트','를',' ',
                    '통','해',' ','문','의','신','고',' ','부','탁','드','립','니','다',
                    '서','버',' ','테', '스', '트', ' ', '중', ' ', '입', '니', '다','.',' ',
                    '에','러','는',' ','이','메','일',',','채','팅',',','컨','택','트','를',' ',
                    '통','해',' ','문','의','신','고',' ','부','탁','드','립','니','다'
                ],
                bannerOption: {
                    spaceBetween: 0,
                    slidesPerView: 20,
                    freeMode: true,
                    speed: 2000,
                    loop: true,
                    allowTouchMove: false,
                    autoplay: {
                        delay: 0,
                        stopOnLastSlide: false,
                        disableOnInteraction: false,
                    },
                }
            }
        }
    }
</script>

<style scoped>

</style>