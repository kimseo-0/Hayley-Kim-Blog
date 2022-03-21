<template>
    <v-btn icon color="black" height="100%;" to="/">
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