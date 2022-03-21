<template>
    <v-data-table
            :headers="headers"
            :items="searchTag ? searchPosts : posts"
            :search="search"
            hide-default-footer
            :expanded.sync="expanded"
            item-key="id"
            show-expand >
        <template v-slot:item.id="{item}">
            <v-btn text @click="goSinglePost(item.id)">
                {{item.id}}
            </v-btn>
        </template>
        <template v-slot:item.tag="{item}">
            <span v-for="(hashTag, index) in item.PostHashTags" :key="index" style="margin: 2px 0">
                <hash-tag-card-component :hash-tag-name="hashTag.tagName" :color="'rgb(144, 107, 255)'" @searchHashTag="searchHashTag"/>
            </span>
        </template>
        <template v-slot:item.commentNum="{item}">
            <div>{{item.Comments.length}}</div>
        </template>
        <template v-slot:item.state="{item}">
            <v-btn icon @click="updatePostState(item)">
                <v-icon>
                    {{item.state == true ? 'mdi-lock-open' : 'mdi-lock'}}
                </v-icon>
            </v-btn>
        </template>
        <template v-slot:item.action="{item}">
            <v-btn icon nuxt :to="`/postForm/${item.id}`">
                <v-icon>
                    mdi-pencil
                </v-icon>
            </v-btn>
            <v-btn icon @click="deletePost(item)">
                <v-icon>
                    mdi-delete
                </v-icon>
            </v-btn>
        </template>

        <template v-slot:expanded-item="{ headers, item }">
            <td v-show="item.Comments.length !== 0" :colspan="headers.length" style="padding: 0; border: #eeeeee 1px solid">
                <post-comment-data-component :comments="item.Comments"/>
            </td>
        </template>
    </v-data-table>
</template>

<script>
    import PostCommentDataComponent from "./PostCommentDataComponent";
    import HashTagCardComponent from "../HashTag/HashTagCardComponent";
    export default {
        name: "PostDataComponent",
        components: {HashTagCardComponent, PostCommentDataComponent},
        props: {
            search: String,
            searchTag: Boolean,
            posts: Array,
            searchPosts: Array,
        },
        data() {
            return {
                headers: [
                    { text: 'Id', value: 'id', },
                    { text: 'Tag', value: 'tag'},
                    { text: 'Title', value: 'title'},
                    { text: 'Summary', value: 'summary'},
                    { text: 'Start Time', value: 'startTime'},
                    { text: 'End Time', value: 'endTime'},
                    { text: 'gitHub Link', value: 'gitHubLink'},
                    { text: 'Comment Num', value: 'commentNum'},
                    { text: 'state', value: 'state'},
                    { value: 'action'},
                    { text: '', value: 'data-table-expand' },
                ],
                expanded: [],
            }
        },
        methods: {
            updatePostState(item) {
                const res = this.$store.dispatch('post/updatePostState',{
                    postId : item.id,
                    state : item.state
                });
            },
            deletePost(item){
                this.$store.dispatch('post/deletePost',{
                    post : item
                });
            },
            searchHashTag() {
                this.$emit('searchHashTag');
            },
            goSinglePost(id) {
                window.open("localhost:3001/project/"+id);
            }
        }
    }
</script>

<style scoped>

</style>