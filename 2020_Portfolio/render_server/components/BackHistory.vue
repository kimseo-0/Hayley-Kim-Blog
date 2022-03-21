<template>
    <v-btn icon @click="back" height="100%">
        <v-icon large :color='color'>
            mdi-chevron-left
        </v-icon>
    </v-btn>
</template>

<script>
    export default {
        name: "BackHistory",
        props : {
            returnPage : String,
            color : String
        },
        computed : {
        },
        methods : {
            back() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style scoped>

</style>