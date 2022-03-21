<template>
    <a :href="href" target="_blank">
        <v-btn icon :color="color" height="100%">
            <v-icon dense>mdi-github</v-icon>
        </v-btn>
    </a>
</template>

<script>
    export default {
        name: "GithubButtonComponent",
        props: {
            href: String,
            color: String,
        }
    }
</script>

<style scoped>
    a {
        text-decoration: none;
        height: 100%;
    }
</style>