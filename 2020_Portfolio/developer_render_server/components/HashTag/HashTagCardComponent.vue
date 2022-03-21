<template>
    <v-chip :color="color" :text-color="textColor" pill link style="margin-right: 5px; margin-top: 2px; height: 25px"
            @click.prevent="searchHashTag(hashTagName)" >
            {{hashTagName}}
    </v-chip>
</template>

<script>
    export default {
        name: "HashTagCardComponent",
        props : {
            hashTagName: String,
            textColor: String,
            color: String,
        },
        methods : {
            async searchHashTag(hashTagName) {
                this.$emit('searchHashTag');
                await this.$store.dispatch('post/searchHashTag', {hashTagName});
            }
        }
    }
</script>

<style scoped>

</style>