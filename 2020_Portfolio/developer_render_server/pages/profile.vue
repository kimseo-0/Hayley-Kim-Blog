<template>
    <v-card flat style="padding: 20px; width: 100%">
        <h3>Profile</h3>
        <v-row>
            <v-expansion-panels accordion multiple flat>
                <v-col cols="12" >
                    <v-expansion-panel>
                        <v-expansion-panel-header>INTRODUCTION</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <profile-intro-form :intro="intro"/>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-col>
                <v-col cols="12">
                    <v-expansion-panel>
                        <v-expansion-panel-header>CAREER</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <profile-careers-form :careers="careers"/>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-col>
                <v-col cols="12">
                    <v-expansion-panel>
                        <v-expansion-panel-header>SKILL</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <profile-skills-form :skills="skills"/>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-col>
            </v-expansion-panels>
        </v-row>
    </v-card>
</template>

<script>
    import ProfileIntroForm from "../components/Profile/ProfileIntroForm";
    import ProfileCareersForm from "../components/Profile/ProfileCareersForm";
    import ProfileSkillsForm from "../components/Profile/ProfileSkillsForm";
    export default {
        name: "profileForm",
        components: {
            ProfileSkillsForm,
            ProfileCareersForm,
            ProfileIntroForm

        },
        computed: {
            intro() {
                return this.$store.state.profile.intro;
            },
            careers() {
                return this.$store.state.profile.careers;
            },
            skills() {
                return this.$store.state.profile.skills;
            }
        },
        async fetch({store}) {
        },
        created() {
            this.$store.commit('currentPage',{
                currentPage : "developerPage"
            });
        },
    }
</script>

<style scoped>

</style>