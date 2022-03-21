<template>
    <v-btn :color="color" text small @click="click">
        signUp
    </v-btn>
</template>

<script>
    export default {
        name: "SignUpButtonComponent",
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