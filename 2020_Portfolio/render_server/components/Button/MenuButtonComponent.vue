<template>
    <v-btn :color="color" icon @click.stop="click" height="100%" style="padding: 0;">
        <v-icon>mdi-menu</v-icon>
    </v-btn>
</template>

<script>
    export default {
        name: "MenuButtonComponent",
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