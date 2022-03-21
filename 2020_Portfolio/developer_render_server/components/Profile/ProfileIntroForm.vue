<template>
    <div>
        <v-textarea v-model="saveIntro"
                    solo
                    flat
                    :readonly="!introForm">
        </v-textarea>

        <v-card-actions style="float: right">
            <div v-if="!introForm">
                <v-btn text @click="introForm=true">
                    edit
                </v-btn>
            </div>
            <div v-else>
                <v-btn text color="red" :disabled="saveIntro === intro" @click="updateIntro">
                    save
                </v-btn>
                <v-btn text color="green" @click="cancelUpdateIntro">
                    cancel
                </v-btn>
            </div>
        </v-card-actions>
    </div>
</template>

<script>
    export default {
        name: "ProfileIntroForm",
        props: {
            intro: String
        },
        data(){
            return {
                saveIntro: this.intro,
                introForm : false,
            }
        },
        methods: {
            async updateIntro() {
                this.introForm = false;
                await this.$store.dispatch('profile/updateProfile', {
                    type: 'intro',
                    data: this.saveIntro
                });
            },
            cancelUpdateIntro() {
                this.introForm = false;
                this.saveIntro = this.intro;
            }
        }
    }
</script>

<style scoped>

</style>