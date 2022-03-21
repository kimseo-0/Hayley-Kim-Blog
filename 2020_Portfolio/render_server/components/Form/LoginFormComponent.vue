<template>
    <v-form v-model="valid" @submit.prevent="login">
        <v-row>
            <v-col cols="12">
                <div>LOGIN</div>
            </v-col>
            <v-col v-show="info" cols="12">
                <v-alert dense outlined type="error" width="100%">
                    {{info}}
                </v-alert>
            </v-col>
            <v-col cols="12">
                <v-text-field v-model="email"
                              :rules="emailRules"
                              color="white"
                              :autofocus = true :dense = true required single-line outlined
                              label="EMAIL"
                              @keyup.esc="closeLoginOverlay"/>

                <v-text-field v-model="password"
                              :rules="passwordRules"
                              color="white"
                              :dense = true required single-line outlined
                              type="password"
                              label="PASSWORD"
                              @keyup.esc="closeLoginOverlay"/>
            </v-col>
            <v-col>
                <v-btn type="submit" width="100%" color="rgb(144, 107, 255)" light>
                    login
                </v-btn>
            </v-col>
        </v-row>
    </v-form>
</template>

<script>
    export default {
        name: "LoginComponent",
        data() {
            return {
                valid: false,

                email: '',
                password: '',

                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid',
                ],
                passwordRules: [
                    v => !!v || 'password is required',
                    v => v.length>10 || 'password must be valid',
                ],

                info : null,
            }
        },
        methods: {
            async login() {
                try {
                    if (this.email==='') {
                        this.info = '이메일을 입력해 주세요';
                        return 0;
                    }
                    if (!(/.+@.+/.test(this.email))) {
                        this.info = '이메일이 형식에 맞지 않습니다.';
                        return 0;
                    }
                    if (this.password==='') {
                        this.info = '비밀번호를 입력해 주세요';
                        return 0;
                    }

                    const res = await this.$store.dispatch('user/login', {
                        email: this.email,
                        password: this.password
                    });
                    const {info} = res;
                    if (info === "login success") {
                        this.info = null;
                        this.$emit('closeLoginOverlay');
                        await this.$store.dispatch('privateChat/loadRoom');
                    } else if (info === "this email does not exist") {
                        this.info = "존재하지 않는 이메일 입니다.";
                    } else if (info === "password dose not correct") {
                        this.info = "비밀번호가 일치하지 않습니다.";
                    } else if(info === 'isLoggedIn') {
                        alert('이미 로그인이 되어있습니다.');
                        this.$emit('closeLoginOverlay');
                    } else {
                        this.info = "ERROR: " + info;
                    }
                } catch (e) {
                    console.error(e);
                }
            },
            closeLoginOverlay() {
                this.$emit('closeLoginOverlay');
            },
        },
        mounted() {
        },
        updated() {
        }
    }
</script>

<style scoped>

</style>