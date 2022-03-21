<template>
    <div v-show="!profileForm" style="overflow: auto;">
        <v-btn text @click="click" style="float:right;">
            수정
        </v-btn>
    </div>
</template>

<script>
    export default {
        name: "EditButtonComponent",
        props: {
            profileForm: Boolean
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