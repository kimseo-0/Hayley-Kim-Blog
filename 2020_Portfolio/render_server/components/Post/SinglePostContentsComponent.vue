<template>
    <div class="single-post-content-container">
        <div v-for="(content, index) in contents" @click="$vuetify.goTo(content.id,{offset: 55})">
            <div v-if="index < contents.length-1" :style="(top > content.top-10 && top < contents[index+1].top-10) ? point : ''">
                <div :class="content.id" v-if="content.tagName==='H1'" :style="H1style"> {{content.text}}</div>
                <div :class="content.id" v-else-if="content.tagName==='H2'" :style="H2style">{{content.text}}</div>
                <div :class="content.id" v-else :style="H3style">{{content.text}}</div>
            </div>
            <div v-else :style="top > content.top-10 ? point : ''">
                <div :class="content.id" v-if="content.tagName==='H1'" :style="H1style"> {{content.text}}</div>
                <div :class="content.id" v-else-if="content.tagName==='H2'" :style="H2style">{{content.text}}</div>
                <div :class="content.id" v-else :style="H3style">{{content.text}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "singlePostContentsComponent",
        props: {
            contents: Array,
            top: Number
        },
        data() {
            return {
                point: {'border-left':'rgb(144, 107, 255) 2px solid', 'color':'rgb(144, 107, 255)'},
                H1style: {'padding-left':'10px'},
                H2style: {'padding-left':'20px'},
                H3style: {'padding-left':'20px'},
            }
        },
        methods: {

        }
    }
</script>

<style scoped>
    .single-post-content-container {
        height: 100%;
        width: 100%;
        cursor: pointer;
    }
</style>