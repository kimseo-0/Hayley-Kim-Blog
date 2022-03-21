<template>
    <div class="user-logout-button-container">
        로그아웃
        <v-btn class="user-logout-button" outlined color="rgb(144, 107, 255)" @click="click">
            로그아웃
        </v-btn>
    </div>
</template>

<script>
    export default {
        name: "UserLogoutButtonComponent",
        methods: {
            click() {
                this.$emit('click')
            }
        }
    }
</script>

<style scoped>
    .user-logout-button-container {
        padding: 20px 10px;
        overflow: auto;
        font-size: 20px;
        color: rgb(144, 107, 255);
    }
    .user-logout-button {
        float: right
    }
</style>