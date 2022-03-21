<template>
    <div ref="form" style="">
        <v-card flat
                style="color: black;">
            <v-row v-show="page===1" style="padding: 50px 30px">
                <v-col cols="12" sm="6">
                    <div>
                        <v-text-field v-model="dateRangeText"
                                      label="Project Term"
                                      prepend-icon="mdi-calendar-range"
                                      single-line
                                      :dense=true
                                      readonly/>
                    </div>
                    <v-date-picker v-model="dates" range full-width />
                </v-col>
                <v-col cols="12" sm="6">
                    <div>
                        <v-text-field v-model="gitHubLink"
                                      label="GITHUB"
                                      prepend-icon="mdi-github"
                                      single-line
                                      :dense=true
                        />
                    </div>

                    <div>
                        <v-text-field v-model="hashTag"
                                label="Tag"
                                prepend-icon="mdi-tag"
                                required
                                single-line
                                :dense= true
                                v-on:keyup.tab.exact="addHashTag"
                                v-on:keyup.spa  ce.exact="addHashTag"
                                v-on:keyup.tab.enter="addHashTag"
                        />
                    </div>

                    <div>
                        <span style="height: 40px; margin: 5px 0;">
                            <v-chip v-for="(hashTag, index) in hashTags" :key="index" color="rgb(144, 107, 255)"
                                    close outlined small text-color="rgb(212, 218, 250)" pill link
                                    @click:close="deleteHashTag('hashTags',index)" >
                                <v-icon left small>mdi-label</v-icon>
                                {{hashTag}}
                            </v-chip>
                            <v-chip v-for="(hashTag, index) in addHashTags" :key="index" color="rgb(144, 107, 255)"
                                    close outlined small text-color="rgb(212, 218, 250)" pill link
                                    @click:close="deleteHashTag('addHashTags',index)" >
                                <v-icon left small>mdi-label</v-icon>
                                {{hashTag}}
                            </v-chip>
                        </span>
                    </div>

                    <div style="padding: 10px 0">
                        <v-text-field v-model="title"
                                :rules="titleRules"
                                label="TITLE"
                                required
                                single-line
                                :dense= true
                        />
                        <v-textarea v-model="summary"
                                :rules="summaryRules"
                                label="SUMMARY"
                                required
                                single-line
                                :dense= true
                                rows="6"
                        />
                    </div>
                </v-col>

                <v-col cols="12" style="padding: 0 10px;">
                    <v-icon color="black">mdi-image</v-icon>
                    THUMBNAIL IMAGES
                </v-col>

                <input id="imageInput" type="file" accept="image/*" multiple="multiple" hidden @change.prevent="uploadImages">
                <v-col v-if="images.length !== 0" v-for="(image, index1) in images" :key="index1" cols="12" sm="6" md="4" lg="3">
                    <div style="width: 100%; position: relative">
                        <v-btn icon x-small @click="deleteImage(image.imageUrl, index1, 'images')" style="position:absolute; right: 2px; top: 2px; background-color: rgb(198, 0, 0)">
                            <v-icon small color="white"> mdi-close </v-icon>
                        </v-btn>
                        <img :src="`http://localhost:7001/${image.imageUrl}`" style="width: 100%">
                    </div>
                </v-col>
                <v-col v-if="addImageUrls !== 0" v-for="(imageUrl, index2) in addImageUrls" :key="index2+10" cols="12" sm="6" md="4" lg="3">
                    <div style="width: 100%; position: relative">
                        <v-btn icon x-small @click="deleteImage(imageUrl, index2, 'addImageUrls')" style="position:absolute; right: 2px; top: 2px; background-color: rgb(198, 0, 0)">
                            <v-icon small color="white"> mdi-close </v-icon>
                        </v-btn>
                        <img :src="`http://localhost:7001/${imageUrl}`" style="width: 100%">
                    </div>
                </v-col>
                <v-col cols="12" md="4" lg="3">
                    <div style="border: black 1px dashed; width: 100%; height: 100%;">
                        <v-btn icon width="100%" height="100%" @click="clickImageInput">
                            <div style="border: 1px dotted white; border-radius: 20px; padding: 3px">
                                <v-icon large color="black" >
                                    mdi-plus
                                </v-icon>
                            </div>
                        </v-btn>
                    </div>
                </v-col>
            </v-row>

            <v-row v-show="page===2" style="padding:50px 30px; width: 100%">
                <v-col cols="12">
                    <v-icon color="black">mdi-post</v-icon>
                    STORY
                </v-col>
                <v-card flat width="100%">
                    <toast-editor ref="toastuiEditor" :initialValue="contentMarkDown" initialEditType="markdown" :height="'500px'" :previewStyle="(this.$vuetify.breakpoint.name === 'lg' || this.$vuetify.breakpoint.name === 'xl') ? 'vertical' : 'tab'" />
                </v-card>
            </v-row>

            <v-row v-show="page===3" flat style="padding: 50px 30px">
                <v-col cols="12">
                    <v-icon color="black">mdi-post</v-icon>
                    Preview
                </v-col>
                <v-card width="100%" dark style="padding: 30px" v-html="contentHtml"></v-card>
            </v-row>
            <v-card width="100%" flat style="padding: 5px; position: fixed; bottom: 0;">
                <v-btn
                        v-show="page===1"
                        text
                        color="green"
                        style="float: right"
                        @click="page=2" >
                    next
                    <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
                <v-btn
                        v-show="page===2"
                        text
                        color="green"
                        style="float: right"
                        @click="preview" >
                    next
                    <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
                <v-btn
                        v-show="page===2 || page===3"
                        text
                        color="green"
                        style="float: left"
                        @click="page=page-1" >
                    <v-icon >mdi-chevron-left</v-icon>
                    prev
                </v-btn>
                <v-btn v-show="page===3"
                       outlined
                       text
                       color="green"
                       style="float: right"
                       @click="uploadOrUpdatePost" >
                    save
                </v-btn>
            </v-card>
        </v-card>
    </div>
</template>

<script>
    export default {
        name: "PostFormComponent",
        props : {
            post : Object,
            type : String
        },
        data() {
            return {
                page: 1,

                valid: false,
                title : "",
                dates: [],
                summary : "",
                gitHubLink : "",
                hashTag : "",
                hashTags: [],
                addHashTags: [],
                deleteHashTags: [],
                images: [],
                deleteImageUrls : [],
                deleteAddImageUrls : [],
                addImageUrls : [],
                titleRules: [
                    v => !!v || 'title is required'
                    //v => /.+@.+/.test(v) || 'title must be valid',
                ],
                summaryRules: [
                    v => !!v || 'summary is required'
                    //v => v.length>2 || 'summary must be valid',
                ],

                storyContent : '',
                contentHtml: '',
                contentMarkDown: '',

                editorHeight: '480px'
            }
        },
        computed : {
            dateRangeText () {
                return this.dates.join(' ~ ')
            },
        },
        methods : {
            preview() {
                this.contentHtml = this.$refs.toastuiEditor.invoke('getHtml');
                this.contentMarkDown = this.$refs.toastuiEditor.invoke('getMarkdown');
                this.page = 3;
            },
            successUploadPost() {
                this.dates = [];
                this.gitHubLink = "";
                this.title = "";
                this.summary = "";
                this.hashTag = "";
                this.hashTags = [];
                this.addHashTags = [];
                this.deleteHashTags = [];
                this.images = [];
                this.addImageUrls = [];
                this.deleteImageUrls = [];
                this.deleteAddImageUrls = [];
                this.contentHtml = '';
                this.contentMarkDown = '';
            },
            goCancel() {
                this.addImageUrls.forEach( async (imageUrl, index) => {
                    await this.$store.dispatch('post/deleteImage',{
                        imageUrl
                    });
                });
                this.deleteImageUrls.forEach( async (imageUrl, index) => {
                    await this.$store.dispatch('post/deleteImage',{
                        imageUrl
                    });
                });
                this.successUploadPost();
            },
            addHashTag() {
                if (this.hashTag.trim() !== "") {
                     this.addHashTags.push(this.hashTag);
                }
                this.hashTag = "";
            },
            deleteHashTag(type, index) {
                if (type === 'hashTags') {
                    const tag = this.hashTags.splice(index,1);
                    this.deleteHashTags.push(tag[0]);
                } else {
                    this.addHashTags.splice(index,1);
                }
            },
            clickImageInput() {
                const imageInput = document.querySelector('#imageInput');
                imageInput.click();
            },
            async uploadImages(e) {
                try {
                    const formData = new FormData();
                    Array.prototype.forEach.call(e.target.files, function (file) {
                        formData.append('images', file);
                    });
                    const res = await this.$store.dispatch('post/uploadImages',{
                        formData
                    });
                    const {imageUrls} = res;

                    this.addImageUrls = this.addImageUrls.concat(imageUrls);
                } catch (e) {
                    console.error(e);
                }
            },
            deleteImage(imageUrl, index, type) {
                if (type === 'images') {
                    this.images.splice(index,1);
                    this.deleteAddImageUrls.push(imageUrl);
                } else {
                    this.addImageUrls.splice(index,1);
                    this.deleteImageUrls.push(imageUrl);
                }
            },
            async uploadOrUpdatePost() {
                try {
                    if (!this.post) {
                        const res = await this.$store.dispatch('post/uploadPost',{
                            startTime : this.dates[0],
                            endTime : this.dates[1],
                            gitHubLink : this.gitHubLink,
                            title : this.title,
                            summary : this.summary,
                            imageUrls :  this.addImageUrls,
                            hashTags : this.addHashTags,
                            contentHtml: this.contentHtml,
                            contentMarkDown: this.contentMarkDown,
                        });
                    } else {
                        this.deleteImageUrls = [...this.deleteImageUrls,...this.deleteAddImageUrls];
                        const res = await this.$store.dispatch('post/updatePost',{
                            startTime : this.dates[0],
                            endTime : this.dates[1],
                            gitHubLink : this.gitHubLink,
                            postId : this.post.id,
                            title : this.title,
                            summary : this.summary,
                            imageUrls :  this.addImageUrls,
                            deleteImageUrls : this.deleteImageUrls,
                            hashTags : this.addHashTags,
                            deleteHashTags : this.deleteHashTags,
                            contentHtml: this.contentHtml,
                            contentMarkDown: this.contentMarkDown,
                        });
                    }

                    for (const imageUrl of this.deleteImageUrls) {
                        await this.$store.dispatch('post/deleteImage',{
                            imageUrl
                        });
                    }
                    for (const imageUrl of this.deleteAddImageUrls) {
                        await this.$store.dispatch('post/deleteImage',{
                            imageUrl
                        });
                    }

                    this.successUploadPost();
                    this.$router.replace('/posts');
                } catch (e) {
                    console.error(e);
                }
            },
        },
        fetch() {
        },
        created() {
            if (this.post) {
                this.dates = [this.post.startTime, this.post.endTime];
                this.gitHubLink = this.post.gitHubLink;
                this.title =  this.post.title;
                this.summary = this.post.summary;
                this.images = [...this.post.Images];
                this.contentHtml = this.post.contentHtml;
                this.contentMarkDown = this.post.contentMarkDown;

                const hashTags = [];
                if (!this.post) {
                    return [];
                } else {
                    this.post.PostHashTags.forEach((hashTag) => {
                        hashTags.push(hashTag.tagName);
                    });
                }
                this.hashTags = hashTags;
            }
        },
        mounted() {
            document.querySelectorAll('p').forEach((el) => {
                el.style.margin='10px 0';
                el.style.fontSize='16px';
            });
            document.querySelectorAll('img').forEach((el) => {
                el.style.width= 'auto';
                el.style.maxWidth= '100%';
                el.style.minWidth= '350px';
                el.style.maxHeight = '350px';
                el.style.display = 'block';
                el.style.margin = '20px auto';
            });
            document.querySelectorAll('blockquote').forEach((el) => {
                el.style.backgroundColor = 'rgb(178, 181, 255)';
                el.style.borderLeft = '4px solid rgb(144, 107, 255)';
                el.style.padding= '5px 15px';
                el.style.margin= '20px 0';
                el.style.fontSize='20px'
            });
            document.querySelectorAll('pre').forEach((el) => {
                el.style.backgroundColor = 'rgb(226, 216, 255)';
                el.style.borderRadius= '10px';
                el.style.margin= '20px 0';
                el.style.fontSize='20px'
            });
            document.querySelectorAll('code').forEach((el) => {
                el.style.color = 'black';
                el.style.backgroundColor = 'rgba(144, 107, 255, 0)';
                el.style.borderColor = 'rgba(144, 107, 255, 0)';
                el.style.boxShadow = '0 0 0 0 rgba(144, 107, 255, 0)';
                el.style.margin='auto'
            });
        },
        destroyed() {
            this.goCancel();
        }
    }
</script>

<style scoped>
    h1 {
        display: block;
        font-size: 2em;
        margin-top: 0.67em;
        margin-bottom: 0.67em;
        margin-left: 0;
        margin-right: 0;
        font-weight: bold;
    }
    h2 {
        display: block;
        font-size: 1.5em;
        margin-top: 0.83em;
        margin-bottom: 0.83em;
        margin-left: 0;
        margin-right: 0;
        font-weight: bold;
    }
    h3 {
        display: block;
        font-size: 1.17em;
        margin-top: 1em;
        margin-bottom: 1em;
        margin-left: 0;
        margin-right: 0;
        font-weight: bold;
    }
</style>