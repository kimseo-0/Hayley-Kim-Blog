<template>
    <v-data-table
            :headers="headers"
            :items="users"
            :search="search"
            hide-default-footer
            :expanded.sync="expanded"
            item-key="id"
            show-expand >
        <template v-slot:item.signUpAt="{item}">
            <div>{{$moment(item.createdAt).format('MMMM Do YYYY')}}</div>
        </template>
        <template v-slot:item.likePostNum="{item}">
            <div>{{item.UserLikePosts.length}}</div>
        </template>
        <template v-slot:item.commentNum="{item}">
            <div>{{item.Comments.length}}</div>
        </template>
        <template v-slot:item.reportNum="{item}">
            <div>{{item.Reports.length}}</div>
        </template>
        <template v-slot:item.actions="{item}">
            <v-icon @click="updateUserState(item)" >
                {{item.state ? 'mdi-account-check' : 'mdi-account-cancel'}}
            </v-icon>
        </template>

        <template v-slot:expanded-item="{ headers, item }">
            <td v-show="item.Comments.length !== 0" :colspan="headers.length" style="padding: 0; border: #eeeeee 1px solid">
                <user-comment-data-component :comments="item.Comments"/>
            </td>
        </template>
    </v-data-table>
</template>

<script>
    import UserCommentDataComponent from "./UserCommentDataComponent";
    export default {
        name: "UserDataComponent",
        components: {
            UserCommentDataComponent
        },
        props: {
            search: String,
            users: Array
        },
        data() {
            return {
                expanded: [],
                headers: [
                    { text: 'Id', value: 'id'},
                    { text: 'Email', value: 'email' },
                    { text: 'NickName', value: 'nickName' },
                    { text: 'sign Up At', value: 'signUpAt' },
                    { text: 'Like Posts Num', value: 'likePostNum'},
                    { text: 'Comment Num', value: 'commentNum'},
                    { text: 'Report Num', value: 'reportNum'},
                    { value: 'actions', sortable: false },
                    { text: '', value: 'data-table-expand' },
                ],
            }
        },
        methods: {
            updateUserState(item) {
                this.$store.dispatch('user/updateUserState', {
                    id: item.id,
                    state: item.state
                });
            },
        }
    }
</script>

<style scoped>

</style>