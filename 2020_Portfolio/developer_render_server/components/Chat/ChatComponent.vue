<template>
    <div id="chats" @scroll="onScroll" style="overflow: auto; padding: 0 5px; height: 100%;">
        <div>
            <div v-for="(chat, index) in chats" :key="index" class="text" style="">
                <div v-if="me.id !== chat.userId" style="float: left; margin-top: 5px;">
                    <chat-card-component :chat="chat" :chatMe="other"/>
                </div>
                <div v-else style="float: right; margin-top: 5px;">
                    <chat-card-component :chat="chat" :chatMe="me"/>
                </div>
                <div style="clear: both"></div>
            </div>
            <div id="last"></div>

            <div>
                <v-btn v-show="newChatBtn" fixed absolute small icon @click="goToBottom"
                       icon fab bottom right style="bottom: 85px; right: 25px; border: rgb(144, 107, 255) solid 2px">
                    <v-icon color='border: rgb(144, 107, 255)'>
                        mdi-chat-processing
                    </v-icon>
                </v-btn>
                <v-btn v-show="goToBottomBtn && !newChatBtn" fixed absolute small icon @click="goToBottom"
                       icon fab bottom right style="bottom: 85px; right: 25px; border: rgb(144, 107, 255) solid 2px">
                    <v-icon large color='border: rgb(144, 107, 255)'>
                        mdi-chevron-down
                    </v-icon>
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script>
    import ChatCardComponent from "./ChatCardComponent";

    export default {
        name: "ChatComponent",
        components: {
            ChatCardComponent
        },
        props: {
        },
        watch: {
        },
        data() {
            return {
                init: false,
                goToBottomBtn: false,
                newChatBtn: false,

                saveChats: this.chats
            }
        },
        computed: {
            me () {
                return this.$store.state.user.me;
            },
            other() {
                return this.$store.state.privateChat.other;
            },
            chats() {
                this.$nextTick(() => {
                    if (this.$store.state.privateChat.chats.length !== 0 && this.me) {
                        if (this.$store.state.privateChat.chats[this.$store.state.privateChat.chats.length -1].userId !== this.me.id) {
                            const el = document.querySelector('#chats');
                            if (el.scrollTop !== el.clientHeight) {
                                this.newChatBtn = true;
                                this.goToBottomBtn = false;
                            }
                            this.onScroll();
                        } else {
                            this.goToBottom();
                        }
                    }
                });
                return this.$store.state.privateChat.chats;
            }
        },
        methods: {
            goToBottom() {
                const el = document.querySelector('#last');
                if(el) {
                    el.scrollIntoView();
                    this.newChatBtn = false;
                    this.goToBottomBtn = false;
                }
            },
            onScroll() {
                const el = document.querySelector('#chats');
                if (el) {
                    if (el.scrollHeight - el.scrollTop < el.clientHeight + 30) {
                        this.goToBottomBtn = false;
                        this.newChatBtn = false;
                        return 0
                    }
                    this.goToBottomBtn = el.scrollHeight - el.scrollTop >= 1000;
                }
            }
        },
        mounted() {
            this.goToBottom();
        },
        updated() {
            if (!this.init) {
                this.goToBottom();
                this.init = true;
            }
        }
    }
</script>

<style scoped>

</style>