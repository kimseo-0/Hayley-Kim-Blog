<template>
    <table class="single-post-menu-container">
        <tr>
            <td>
                <v-btn v-if="prevPost"
                       class="single-post-menu-prev-button"
                       text
                       color="rgb(144, 107, 255)"
                       :disabled="!prevPost"
                       nuxt :to="`${prevPost.id}`">
                    <v-icon >mdi-chevron-left</v-icon>
                    prev
                </v-btn>
                <v-btn v-else
                       class="single-post-menu-prev-button"
                       text
                       color="#8B8B8B">
                    <v-icon >mdi-chevron-left</v-icon>
                    prev
                </v-btn>
            </td>
            <td style="width: 100px; text-align: center">
                <v-btn icon color="rgb(144, 107, 255)" nuxt to="/projects">
                    <v-icon>mdi-view-headline</v-icon>
                </v-btn>
            </td>
            <td>
                <v-btn v-if="nextPost"
                       class="single-post-menu-next-button"
                       text
                       color="rgb(144, 107, 255)"
                       :disabled="!nextPost" >
                    next
                    <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
                <v-btn v-else
                       class="single-post-menu-next-button"
                       text
                       color="#8B8B8B" >
                    next
                    <v-icon >mdi-chevron-right</v-icon>
                </v-btn>
            </td>
        </tr>
    </table>
</template>

<script>
    export default {
        name: "SinglePostMenuComponent",
        computed: {
            nextPost() {
                return this.$store.state.post.nextPost;
            },
            prevPost() {
                return this.$store.state.post.prevPost;
            },
        }
    }
</script>

<style scoped>
    .single-post-menu-container {
        width: 100%;
        border-bottom: #8A8A8A solid 1px;
    }
    .single-post-menu-prev-button {
        float: left;
    }
    .single-post-menu-next-button {
        float: right;
    }
</style>