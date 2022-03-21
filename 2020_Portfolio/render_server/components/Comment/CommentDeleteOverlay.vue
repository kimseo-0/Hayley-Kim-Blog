<template>
    <v-dialog v-model="deleteOverlay"
              class="comment-delete-overlay"
              max-width="290">
        <v-card light>
            <v-card-title class="headline">Delete Comment</v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="closeDeleteOverlay" >
                    cancel
                </v-btn>
                <v-btn color="red" text @click="deleteComment" >
                    delete
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "CommentDeleteOverlay",
        props: {
            deleteOverlay: Boolean
        },
        methods: {
            closeDeleteOverlay() {
                this.$emit('closeDeleteOverlay');
            },
            deleteComment() {
                this.$emit('deleteComment');
            },
        }
    }
</script>

<style scoped>
    .comment-delete-overlay {
        position: fixed;
        top: 0;
    }
</style>