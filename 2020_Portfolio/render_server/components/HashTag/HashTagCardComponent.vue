<template>
    <v-chip class="hash-tag-card" :color="color" :text-color="textColor" pill link
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
                this.$emit('closeSearchOverlay');
                if (hashTagName === 'all') {
                    this.$router.push('/projects')
                } else {
                    this.$router.push(`/tags/${this.hashTagName}`)
                }
            }
        }
    }
</script>

<style scoped>
    .hash-tag-card {
        margin-right: 5px;
        margin-top: 2px;
        height: 25px;
    }
</style>