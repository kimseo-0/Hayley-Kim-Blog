<template>
    <div class="user-delete-container">
        <div class="user-delete-button-container">
            회원탈퇴
            <v-btn class="user-delete-button" outlined color="red" @click="click">
                회원탈퇴
            </v-btn>
        </div>
        <div class="user-delete-alert-container">
            <v-alert dense type="error" >
                탈퇴 시 작성하신 댓글은 삭제되지 않습니다.
            </v-alert>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UserDeleteButtonComponent",
        methods: {
            click() {
                this.$emit('click');
            }
        }
    }
</script>

<style scoped>
    .user-delete-container {
        color: red;
        padding: 20px 10px;
        overflow:auto;
    }
    .user-delete-button-container {
        font-size: 20px;
    }
    .user-delete-button {
        float: right;
    }
    .user-delete-alert-container {
        padding: 20px 0;
    }
</style>