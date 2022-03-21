<template>
    <v-btn :color="color" icon height="100%" @click.stop="click">
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