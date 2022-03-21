<template>
    <v-btn icon color="red" @click="clickLikePost">
        <v-icon dense>{{ likePost ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
    </v-btn>
</template>

<script>
    export default {
        name: "LikeButtonComponent",
        props: {
            postId: Number,
            likePost: Boolean
        },
        data() {
            return {
                isClickable : true
            }
        },
        methods: {
            async clickLikePost() {
                if (this.isClickable) {
                    this.isClickable = false;
                    this.$emit('clickLikePost');
                    if(this.likePost) {
                        await this.$store.dispatch('user/deleteLikePost', {
                            postId : this.postId
                        });
                    } else {
                        await this.$store.dispatch('user/addLikePost', {
                            postId : this.postId
                        });
                    }
                    this.isClickable = true;
                }
            }
        }
    }
</script>

<style scoped>

</style>