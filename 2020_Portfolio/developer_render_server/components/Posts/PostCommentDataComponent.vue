<template>
    <v-simple-table>
        <template v-slot:default>
            <thead>
            <tr>
                <th>Id</th>
                <th>writer Id</th>
                <th>text</th>
                <th>report Num</th>
                <th>report</th>
                <th>state</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(comment, index) in Comments" :key="index">
                <td>{{ comment.id }}</td>
                <td>{{ comment.userId }}</td>
                <td>{{ comment.text }}</td>
                <td>{{comment.Reports.length}}</td>
                <td>
                    <div v-for="(report) in comment.Reports">
                        {{report.text}}
                    </div>
                </td>
                <td>
                    <v-btn icon @click="updateCommentState(comment, index)">
                        <v-icon>
                            {{comment.state ? 'mdi-check-circle' : 'mdi-minus-circle'}}
                        </v-icon>
                    </v-btn>
                </td>
                <td>
                    <v-btn icon @click="deleteComment(comment, index)">
                        <v-icon>
                            mdi-delete
                        </v-icon>
                    </v-btn>
                </td>
            </tr>
            </tbody>
        </template>
    </v-simple-table>
</template>

<script>
    export default {
        name: "PostCommentDataComponent",
        props: {
            Comments: Object
        },
        methods: {
            updateCommentState(comment, index) {
                const res = this.$store.dispatch('post/updateCommentState',{
                    postId : comment.postId,
                    commentId : comment.id,
                    state : comment.state,
                    index
                });
            },
            deleteComment(comment, index) {

            }
        }
    }
</script>

<style scoped>

</style>