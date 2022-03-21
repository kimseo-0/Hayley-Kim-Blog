<template>
    <v-form @submit.prevent="addContact">
        <v-row>
            <v-col cols="12">
                <div>
                    CONTACT
                </div>
            </v-col>
            <v-col v-show="info" cols="12">
                <v-alert dense outlined type="error" width="100%">
                    {{info}}
                </v-alert>
            </v-col>
            <v-col cols="12">
                <v-text-field v-model="name"
                              label="NAME"
                              required
                              dark
                              :dense = true
                              single-line
                              outlined
                              color="white" />
                <v-text-field v-model="email"
                              label="EMAIL"
                              required
                              dark
                              :dense = true
                              single-line
                              outlined
                              color="white" />
                <v-textarea v-model="content"
                            label="CONTENT"
                            required
                            dark
                            :dense = true
                            single-line
                            outlined
                            color="white"/>
                <div>
                    <v-btn type="submit" style="width: 100%; margin: 0 auto" outlined color="#9977ff">
                        submit
                    </v-btn>
                </div>
            </v-col>
        </v-row>
    </v-form>
</template>

<script>
    export default {
        name: "ContactFormComponent",
        data() {
            return {
                name : "",
                email : "",
                content:"",

                info: null,
            }
        },
        methods: {
            addContact() {
                if (!this.name) {
                    this.info='이름을 입력해 주세요';
                    return 0;
                }
                if (!this.email) {
                    this.info='이메일을 입력해 주세요';
                    return 0;
                }
                if (!(/.+@.+/.test(this.email))) {
                    this.info='이메일 형식에 맞게 입력해 주세요';
                    return 0;
                }
                if (!this.content) {
                    this.info = '문의 내용을 입력해 주세요';
                    return 0;
                }

                const res = this.$store.dispatch('contact/addContact', {
                    email : this.email,
                    name : this.name,
                    content : this.content
                });
                const { info } = res;
                if ( info === 'success addContact') {
                    this.info = null
                } else {
                    this.info = '에러발생'
                    //info
                }
            },
        },
    }
</script>

<style scoped>

</style>