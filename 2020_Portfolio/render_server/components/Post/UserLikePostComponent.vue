<template>
    <div>
        <div style="font-size: 20px;"> LIKE PROJECT </div>

        <div v-if="userLikePosts.length === 0">NO LIKE POST</div>
        <div v-else>
            <v-row dense>
                <v-col cols="12" sm="6" md="4" v-for="(userLikePost, index) in userLikePosts" :key="index">
                    <v-card flat color="#F3F3F3" width="100%" height="300px">
                        <small-post-card-component :post="userLikePost" :color="'white'"/>
                    </v-card>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
    import PostCardComponent from "./PostCardComponent";
    import SmallPostCardComponent from "./SmallPostCardComponent";

    export default {
        name: "myInfo",
        components : {
            SmallPostCardComponent,
            PostCardComponent
        },
        props : {
            userLikePosts : Array
        }
    }
</script>

<style scoped>

</style>