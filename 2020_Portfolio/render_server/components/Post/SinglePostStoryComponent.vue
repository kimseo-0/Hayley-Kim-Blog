<template>
    <div v-html="contentHtml"/>
</template>

<script>
    export default {
        name: "SinglePostStoryComponent",
        props: {
            contentHtml: String,
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