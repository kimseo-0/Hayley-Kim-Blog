<template>
    <div id="chats" class="chat-container" @scroll="onScroll">
        <div class="chat-login-info-container" v-if="!me">
            <div class="chat-login-info">
                <div class="chat-login-text">로그인 후</div>
                <div class="chat-login-text">실시간 문의가 가능합니다</div>
                <div class="chat-login-container">
                    <v-btn @click="openLoginOverlay" dark color="rgb(144, 107, 255)" width="100%">
                        login
                    </v-btn>
                </div>
            </div>
        </div>
        <div v-else>
            <div v-for="(chat, index) in chats" :key="index">
                <div class="chat-card-left" v-if="me.id !== chat.userId">
                    <chat-card-component :chat="chat" :chatMe="other"/>
                </div>
                <div class="chat-card-right" v-else>
                    <chat-card-component :chat="chat" :chatMe="me"/>
                </div>
                <div style="clear: both"></div>
            </div>
            <div id="last"></div>

            <div>
                <v-btn class="chat-floating-button" v-show="newChatBtn" fixed absolute small icon @click="goToBottom"
                       icon fab bottom right>
                    <v-icon color='border: rgb(144, 107, 255)'>
                        mdi-chat-processing
                    </v-icon>
                </v-btn>
                <v-btn class="chat-floating-button" v-show="goToBottomBtn && !newChatBtn" fixed absolute small icon @click="goToBottom"
                       icon fab bottom right>
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
            contactDrawer: Boolean
        },
        watch: {
            contactDrawer() {
                if (this.contactDrawer === true && this.me) {
                    this.goToBottom()
                }
            },
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
                    if (this.$store.state.privateChat.chats && this.$store.state.privateChat.chats.length !== 0 && this.me) {
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
            openLoginOverlay() {
                this.$emit('openLoginOverlay');
            },
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
                        return 0;
                    }

                    this.goToBottomBtn = el.scrollHeight - el.scrollTop >= 1000;
                }
            }
        },
        mounted() {
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
    .chat-container {
        overflow: auto;
        padding: 0 5px;
        height: 100%;
    }
    .chat-login-info-container {
        position: relative;
        width: 100%;
        height: 100%;
    }
    .chat-login-info {
        position: absolute;
        top: 40%;
        width: 100%;
        font-size: 20px
    }
    .chat-login-text {
        text-align: center;
    }
    .chat-login-container {
        padding: 20px;
    }

    .chat-card-left {
        float: left;
        margin-top: 5px;
    }
    .chat-card-right {
        float: right;
        margin-top: 5px;
    }

    .chat-floating-button {
        bottom: 85px;
        right: 25px;
        border: rgb(144, 107, 255) solid 2px
    }
</style>