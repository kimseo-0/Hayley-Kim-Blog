<template>
    <div>
        <v-menu v-if="$vuetify.breakpoint.name === 'xs'"
                open-on-hover open-on-click bottom offset-y close-on-click>
            <template v-slot:activator="{ on }">
                <v-btn color="primary" icon v-on="on">
                    <v-icon color="#8b8b8b">mdi-dots-vertical</v-icon>
                </v-btn>
            </template>

            <v-list v-if="me.id===commentUserId">
                <v-list-item @click="getCommentUpdateForm">
                    <v-list-item-title>수정</v-list-item-title>
                </v-list-item>
                <v-list-item @click="openDeleteOverlay">
                    <v-list-item-title>삭제</v-list-item-title>
                </v-list-item>
            </v-list>
            <v-list v-else>
                <v-list-item @click="openReportOverlay">
                    <v-list-item-title>신고</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
        <div v-else>
            <div v-if="me.id===commentUserId">
                <v-btn text color="#8b8b8b" @click="getCommentUpdateForm">
                    수정
                </v-btn>
                <v-btn text color="#8b8b8b" @click="openDeleteOverlay">
                    삭제
                </v-btn>
            </div>
            <div v-else>
                <v-btn text color="#8b8b8b" @click="openReportOverlay">
                    신고
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CommentMenuComponent",
        props: {
            me: Object,
            commentUserId: Number,
            deleteOverlay: Boolean,
            reportOverlay: Boolean
        },
        data() {
          return {
          }
        },
        computed: {
        },
        methods: {
            getCommentUpdateForm() {
                this.$emit('getCommentUpdateForm')
            },
            async openDeleteOverlay() {
                this.$emit('openDeleteOverlay')
            },
            openReportOverlay() {
                this.$emit('openReportOverlay')
            }
        }
    }
</script>

<style scoped>

</style>