<template>
    <v-btn :color="color" text small @click="click">
        login
    </v-btn>
</template>

<script>
    export default {
        name: "LoginButtonComponent",
        props: {
            color: String
        },
        methods: {
            click() {
                this.$emit('click');
            }
        }
    }
</script>

<style scoped>

</style>