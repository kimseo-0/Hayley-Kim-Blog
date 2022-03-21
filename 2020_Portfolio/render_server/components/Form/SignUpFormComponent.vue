<template>
    <v-form v-model="valid" @submit.prevent="signUp">
        <v-row>
            <v-col cols="12">
                <div>SIGN UP</div>
            </v-col>
            <v-col v-show="info" cols="12">
                <v-alert dense outlined type="error" width="100%">
                    {{info}}
                </v-alert>
            </v-col>
            <v-col cols="12">
                <v-text-field v-model="email"
                              ref="input"
                              :rules="emailRules"
                              label="email"
                              :autofocus = true :dense = true required single-line
                              @keyup.esc="closeSignUpOverlay"/>
                <v-text-field v-model="password"
                              :rules="passwordRules"
                              type="password"
                              label="password"
                              required :dense = true single-line
                            @keyup.esc="closeSignUpOverlay"/>
                <v-text-field v-model="checkPassword"
                              :rules="checkPasswordRules"
                              type="password"
                              label="check password"
                              required :dense = true single-line
                              @keyup.esc="closeSignUpOverlay"/>
                <v-text-field v-model="nickName"
                              :rules="nickNameRules"
                              label="nickName"
                              required :dense = true single-line
                              @keyup.esc="closeSignUpOverlay"/>
            </v-col>
            <v-col cols="12">
                <v-btn type="submit" width="100%" outlined>
                    sign up
                </v-btn>
            </v-col>
        </v-row>
    </v-form>
</template>

<script>
    export default {
        name: "SignUpComponent",
        data () {
            return {
                valid : false,

                email: '',
                password : '',
                checkPassword: "",
                nickName : '',

                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid',
                ],
                passwordRules: [
                    v => !!v || 'password is required',
                    v => v.length>10 || 'password must be more than 10 letters',
                ],
                checkPasswordRules: [
                    v => this.password === v || 'password dose not match',
                ],
                nickNameRules: [
                    v => !!v || 'nickName is required',
                ],

                info: null,
            }
        },
        methods : {
            async signUp() {
                try {
                    if (this.email==='') {
                        return 0;
                    }

                    const res = await this.$store.dispatch('user/signUp', {
                        email : this.email,
                        password :  this.password,
                        nickName :  this.nickName
                    });

                    const {info} = res;
                    if (info === 'signUp success') {
                        this.$emit('closeSignUpOverlay');
                        await this.$store.dispatch('privateChat/loadRoom');
                    } else if (info === 'duplicated email') {
                        this.info = "이미 존재하는 이메일 입니다!";
                    } else if (info === 'this nickName is a duplicate') {
                        this.info = "이미 존재하는 닉네임 입니다.";
                    } else {
                        this.info = "ERROR: "+info;
                    }
                } catch (e) {
                    console.error(e)
                }
            },
            closeSignUpOverlay() {
                this.$emit('closeSignUpOverlay');
            },
        },
        mounted() {
            if (this.$refs.input) {
                this.$refs.input.onFocus();
            }
        },
        updated() {
        }
    }
</script>

<style scoped>

</style>