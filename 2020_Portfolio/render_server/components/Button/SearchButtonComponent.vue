<template>
    <v-btn icon height="100%" @click="click" >
        <v-icon :color="color">
            mdi-magnify
        </v-icon>
    </v-btn>
</template>

<script>
    export default {
        name: "SearchButtonComponent",
        props: {
            color: String
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