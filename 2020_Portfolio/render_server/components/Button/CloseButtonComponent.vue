<template>
    <v-btn icon large :color="color" @click.prevent="click" style="padding: 0;">
        <v-icon>mdi-close</v-icon>
    </v-btn>
</template>

<script>
    export default {
        name: "CloseButtonComponent",
        props: {
          color: String,
        },
        methods: {
            click() {
                this.$emit('click')
            }
        }
    }
</script>

<style scoped>

</style>