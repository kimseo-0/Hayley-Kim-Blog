<template>
    <v-btn icon color="black" to="/" height="100%" style="padding: 0;">
        <v-icon :color="color" style="">mdi-home</v-icon>
    </v-btn>
</template>

<script>
    export default {
        name: "HomeButtonComponent",
        props: {
            color: String
        }
    }
</script>

<style scoped>

</style>