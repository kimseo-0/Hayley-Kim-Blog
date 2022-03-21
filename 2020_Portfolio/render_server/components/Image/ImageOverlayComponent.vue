<template>
    <v-overlay
            color="black"
            opacity="0.8"
            z-index="5"
            :value="imageOverlay"
            @click="close" >
        <v-card class="image-overlay-close-button-container">
            <v-btn class="image-overlay-close-button"
                   fab absolute fixed right top icon large
                   color="white"
                   @click="close">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <img class="image-overlay-image" :src="`http://localhost:6001/${imageUrl}`">
        </v-card>
    </v-overlay>
</template>

<script>
    export default {
        name: "ImageOverlayComponent",
        props: {
            imageOverlay: Boolean,
            imageUrl: String
        },
        methods: {
            close() {
                this.$emit('close');
            }
        }
    }
</script>

<style scoped>
    .image-overlay-close-button-container {
        width: 100%;
        border-radius: 5px;
    }
    .image-overlay-close-button {
        float:right;
        right: 10px;
        top: 10px
    }
    .image-overlay-image {
        width: 100%
    }
</style>