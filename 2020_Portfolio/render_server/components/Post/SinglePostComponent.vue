<template>
    <div class="single-post-container">
        <div class="single-post-top-container">
            <div class="single-post-title-container">
                <h1 class="single-post-title" id="title">{{post.title}}</h1>
<!--                <div class="single-post-period">-->
<!--                    {{post.startTime}}~{{post.endTime}}-->
<!--                </div>-->
            </div>
            <div class="single-post-summary">
                {{post.summary}}
            </div>
            <div class="single-post-hash-tags-container">
                <span class="single-post-hash-tag-container" v-for="(hashTag, index) in post.PostHashTags" :key="index">
                    <hash-tag-card-component :hash-tag-name="hashTag.tagName" :color="'rgb(144, 107, 255)'" :text-color="'white'"/>
                </span>
            </div>
        </div>

        <div>
            <span v-if="post.gitHubLink">
                <github-button-component :href="gitHubLinkAddress"/>
            </span>
            <like-button-component :post-id="post.id" :like-post="likePost" @clickLikePost="clickLikePost"/>
        </div>

        <div class="single-post-like-num-container">
            <div class="single-post-like-num">좋아요 {{likePostNum}}개</div>
            <div class="single-post-time">{{new Date(this.post.createdAt).toDateString()}}</div>
        </div>

        <div v-if="post.Images.length !== 0">
            <image-slide-component :images="post.Images"/>
        </div>

        <div class="single-post-story-container" id="content">
            <single-post-story-component :content-html="post.contentHtml"/>
        </div>

        <div>
            <span v-if="post.gitHubLink">
                <github-button-component :href="gitHubLinkAddress"/>
            </span>
            <like-button-component :post-id="post.id" :like-post="likePost" @clickLikePost="clickLikePost"/>
        </div>

        <div class="single-post-like-num-container" style="font-size: 15px; color: #8A8A8A; overflow: auto; padding: 10px 0">
            <div class="single-post-like-num" style="float: left">좋아요 {{likePostNum}}개</div>
            <div class="single-post-time" style="float: right">{{new Date(this.post.createdAt).toDateString()}}</div>
        </div>
    </div>
</template>

<script>
    import HashTagCardComponent from "../HashTag/HashTagCardComponent";
    import ImageSlideComponent from "../Image/ImageSlideComponent";
    import LikeButtonComponent from "../Button/LikeButtonComponent";
    import SinglePostStoryComponent from "./SinglePostStoryComponent";
    import GithubButtonComponent from "../Button/GithubButtonComponent";

    export default {
        name: "SinglePostComponent",
        components: {
            GithubButtonComponent,
            SinglePostStoryComponent,
            LikeButtonComponent,
            ImageSlideComponent,
            HashTagCardComponent
        },
        props : {
            post : Object,
        },
        data() {
            return  {
                gitHubLinkAddress : "https://" + this.post.gitHubLink,
                likePostNum: this.post.PostLikeUsers.length,
                contents: [],
            }
        },
        computed : {
            likePost() {
                return this.$store.state.user.userLikePostIds.indexOf(this.post.id) !== -1;
            },
        },
        methods : {
            clickLikePost() {
                if(this.likePost) {
                    this.likePostNum = this.likePostNum - 1;
                } else {
                    this.likePostNum = this.likePostNum + 1;
                }
                //info
            },
        },
        mounted() {
            document.querySelectorAll('h1').forEach((el, index) => {
                el.id = 'h1-'+ index;
                el.classList.add('content')
            });
            document.querySelectorAll('h2').forEach((el, index) => {
                el.id = 'h2-'+ index;
                el.classList.add('content')
            });
            document.querySelectorAll('h3').forEach((el, index) => {
                el.id = 'h3-'+ index;
                el.classList.add('content')
            });
            document.querySelectorAll('.content').forEach((el) => {
                this.contents.push({tagName: el.tagName, id : '#' + el.id, text : el.innerText, top: el.offsetTop})
            });
            this.$emit('getContents',{contents: this.contents})
        }
    }
</script>

<style scoped>
    .single-post-container {
        width: 100%;
        height: 100%;
    }
    .single-post-top-container {
        padding: 10px 0;
    }
    .single-post-title-container {
        overflow: auto;
        position: relative;
    }
    .single-post-title {
        float:left;
    }
    .single-post-period {
        font-size: 15px;
        position: absolute;
        top: 2px;
        right: 0;
        color: #8A8A8A;
    }
    .single-post-summary {
        color: #ababab;
        padding: 10px 0;
    }
    .single-post-hash-tags-container {
        padding: 10px 0;
    }
    .single-post-hash-tag-container {
        margin: 2px 0;
    }
    .single-post-like-num-container {
        font-size: 15px;
        color: #8A8A8A;
        overflow: auto;
        padding: 10px 0;
    }
    .single-post-like-num {
        float: left;
    }
    .single-post-time {
        float: right;
    }
    .single-post-story-container {
        padding: 20px 5px;
    }
</style>