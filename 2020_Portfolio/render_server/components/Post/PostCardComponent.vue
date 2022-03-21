<template>
    <div class="post-card-container">
        <v-image-slide-component :images="post.Images"/>

        <div class="post-card-top-container">
            <nuxt-link class="post-card-title" :to="`project/${post.id}`">
                {{post.title}}
            </nuxt-link>
            <div class="post-card-period">
                {{post.startTime}}~{{post.endTime}}
            </div>
        </div>
        <div class="post-card-summary">
            {{post.summary}}
        </div>

        <div class="post-card-bottom-container">
            <div>
                <span class="post-card-hash-tag-container" v-for="(hashTag, index) in post.PostHashTags" :key="index">
                    <hash-tag-card-component :hash-tag-name="hashTag.tagName" :color="'rgb(144, 107, 255)'"/>
                </span>
            </div>
            <div class="post-card-bottom" >
                <div class="post-card-time">
                    {{new Date(this.post.createdAt).toDateString()}} · 댓글 {{post.Comments.length}} · 좋아요 {{likePostNum}}
                </div>
                <div class="post-card-button-container">
                    <github-button-component :href="gitHubLinkAddress"/>
                    <like-button-component :post-id="post.id" :like-post="likePost" @clickLikePost="clickLikePost"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import VImageSlideComponent from "../Image/VImageSlideComponent";
    import HashTagCardComponent from "../HashTag/HashTagCardComponent";
    import LikeButtonComponent from "../Button/LikeButtonComponent";
    import GithubButtonComponent from "../Button/GithubButtonComponent";

    export default {
        name: "PostCardComponent",
        components: {
            GithubButtonComponent,
            LikeButtonComponent,
            HashTagCardComponent,

            VImageSlideComponent
        },
        props: {
            color : String,
            post: Object
        },
        data() {
            return {
                gitHubLinkAddress : "https://" + this.post.gitHubLink,

                likePostNum: this.post.PostLikeUsers.length,
            }
        },
        computed : {
            likePost() {
                return this.$store.state.user.userLikePostIds.indexOf(this.post.id) !== -1;
            }
        },
        methods : {
            clickLikePost() {
                if(this.likePost) {
                    this.likePostNum = this.likePostNum - 1;
                } else {
                    this.likePostNum = this.likePostNum + 1;
                }
                // info
            },
        },
    }
</script>

<style scoped>
    .post-card-container {
        z-index:1;
        border-radius: 5px;
        width: 100%;
        height: 100%
    }
    .post-card-top-container {
        overflow: auto;
        position: relative;
        padding: 10px;
    }
    .post-card-title {
        color: rgb(144, 107, 255);
        float:left;
        text-decoration: none;
        font-size: 20px;
    }
    .post-card-period {
        float:right;
        font-size: 12px;
        position: absolute;
        top: 0;
        right: 0;
        color:  #8A8A8A;
    }
    .post-card-summary {
        clear: both; font-size: 14px; color: #ababab; padding: 0 12px;
    }
    .post-card-bottom-container {
        width: 100%;
        padding: 10px;
        position: absolute;
        bottom: 0;
    }
    .post-card-hash-tag-container {
        margin: 2px 0;
    }
    .post-card-bottom {
        overflow: auto;
        position: relative;
    }
    .post-card-time {
        float: left;
        position: absolute;
        bottom: 0;
        color: #8A8A8A;
        font-size: 12px;
    }
    .post-card-button-container {
        float:right;
    }
</style>