<template>
    <v-form v-model="valid" @submit.prevent="updateProfile">
        <div v-show="info">
            <v-alert dense outlined type="error" width="100%">
                {{info}}
            </v-alert>
        </div>

        <table style="width: 100%;">
            <tr>
                <td style="position: relative">
                    <div v-if="profileForm">
                        <input id="imageInput" type="file" accept="image/*" hidden @change.prevent="uploadImages">
                        <div :style="{
                                'background-image' : 'url('+`http://localhost:4001/${this.previewAvatarImageUrl}`+')',
                                'background-size': 'cover',
                                'background-position': 'center center',
                                'width': '150px',
                                'height': '150px',
                                'opacity' : '30%'
                                }"/>
                        <v-btn icon width="150px" height="150px" @click="updateProfileImage" style="position: absolute; top:0; left: 0">
                            <div style="border: 1px dotted black; border-radius: 20px; padding: 3px">
                                <v-icon color="black" >
                                    mdi-image
                                </v-icon>
                            </div>
                        </v-btn>
                    </div>

                    <div v-else :style="{
                                'background-image' : 'url('+`http://localhost:4001/${me.avatarImageUrl}`+')',
                                'background-size': 'cover',
                                'background-position': 'center center',
                                'width': '150px',
                                'height': '150px'
                                }" />
                </td>

                <td style="width: 100% ;vertical-align: bottom; padding-left: 20px">
                    <div style="width: 100%">
                        <div>
                            <v-text-field v-model="email"
                                    color="black" required text :dense = true
                                    label="EMAIL"
                                    :readonly = !profileForm />
                        </div>
                        <div>
                            <v-text-field v-model="nickName"
                                    color="black" required :dense = true
                                    label="NICKNAME"
                                    :readonly = !profileForm />
                        </div>
                    </div>
                </td>
            </tr>
        </table>

        <div v-if="profileForm" style="overflow: auto; padding-top: 10px">
            <div>
                <v-text-field v-model="currentPassword"
                        type="password"
                        label="CURRENT PASSWORD"
                        required :dense = true />
            </div>
            <div>
                <v-text-field v-model="password"
                        :rules="passwordRules"
                        type="password"
                        label="PASSWORD"
                        placeholder="no input no change"
                        required :dense = true />
            </div>
            <div>
                <v-text-field v-model="checkPassword"
                        :rules="checkPasswordRules"
                        type="password"
                        label="CHECK PASSWORD"
                        placeholder="no input no change"
                        required :dense = true />
            </div>
            <div class="user-form-button" style="float: right">
                <v-btn color="green" text type="submit" :disabled="!valid">
                    저장
                </v-btn>
                <v-btn text color="red" @click="cancelUpdateProfile">
                    취소
                </v-btn>
            </div>
        </div>
    </v-form>
</template>

<script>
    export default {
        name: "ProfileFormComponent",
        props: {
            me: Object,
            profileForm : Boolean
        },
        data() {
            return {
                valid : false,

                previewAvatarImageUrl : this.me.avatarImageUrl,
                email : this.me.email,
                nickName : this.me.nickName,
                password : "",
                currentPassword: "",
                checkPassword: "",

                passwordRules: [
                    v => (v.length===0 || v.length>=4) || 'password must be valid',
                ],
                checkPasswordRules: [
                    v => this.password === v || 'password dose not match',
                ],

                info: null
            }
        },
        computed: {
        },
        methods : {
            async uploadImages(e){
                const formData = new FormData();
                Array.prototype.forEach.call(e.target.files, function (file) {
                    formData.append('images', file);
                });
                const res = await this.$store.dispatch('user/uploadPreviewAvatarImages',{
                    formData
                });

                const {imageUrl} = res;
                this.previewAvatarImageUrl = imageUrl;
            },
            updateProfileImage() {
                const imageInput = document.querySelector('#imageInput');
                imageInput.click();
            },
            async updateProfile() {
                try {
                    const res = await this.$store.dispatch('user/updateProfile',{
                        email : this.email,
                        nickName : this.nickName,
                        avatarImageUrl : this.previewAvatarImageUrl,
                        currentPassword: this.currentPassword,
                        password : this.password
                    });

                    const {info} = res;
                    if (info === 'no change') {
                        this.info="변경사항이 없습니다!";
                    } else if (info === 'currentPassword is not correct') {
                        this.info="현재비밀번호가 일치하지 않습니다";
                    } else if(info === 'updateProfile success') {
                        alert("프로필 업데이트 성공");
                        this.password = "";
                        this.currentPassword = "";
                        this.checkPassword = "";
                        this.info=null;
                        this.$emit('cancelUpdateProfile');
                    } else if(info === 'this nickName is a duplicate') {
                        this.info="이미 존재하는 닉네임 입니다.";
                    } else {
                        this.info="에러 발생"
                        //info
                    }
                } catch (e) {
                    console.error(e);
                }
            },

            async cancelUpdateProfile() {
                if (this.previewAvatarImageUrl !== this.me.avatarImageUrl) {
                    await this.$store.dispatch('user/deletePreviewAvatarImage',{
                        imageUrl : this.previewAvatarImageUrl
                    });
                }

                this.email = this.me.email;
                this.nickName = this.me.nickName;
                this.previewAvatarImageUrl = this.me.avatarImageUrl;

                this.password = "";
                this.currentPassword = "";
                this.checkPassword = "";

                this.info=null;

                this.$emit('cancelUpdateProfile');
            }
        },
        beforeDestroy() {
            this.cancelUpdateProfile();
        }
    }
</script>

<style scoped>

</style>