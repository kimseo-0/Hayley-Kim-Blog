<template>
    <v-btn text color="#8A8A8A" nuxt :to="link">
        more
        <v-icon>
            mdi-chevron-right
        </v-icon>
    </v-btn>
</template>

<script>
    export default {
        name: "MoreButtonComponent",
        props: {
            link: String
        }
    }
</script>

<style scoped>

</style>