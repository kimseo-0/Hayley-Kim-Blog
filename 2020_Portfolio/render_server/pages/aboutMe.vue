<template>
    <v-card class="about-me-container" dark color="black" flat>
        <v-row dense>
            <v-col v-if="!isMobile" cols="0" lg="2"/>
            <v-col cols="12" lg="8">
                <v-card class="about-me-card" dark color="black">
                    <h3>introduction</h3>
                    <div class="intro-card" v-if="profile">
                        {{profile.intro}}
                    </div>
                </v-card>
                <v-card class="about-me-card" dark color="black">
                    <h3>career</h3>
                    <div class="career-card" v-if="profile" v-for="(career, index) in profile.careers"
                            :key="index">
                        <v-card-title>{{career.name}}</v-card-title>
                        <v-card-subtitle>
                            {{career.term[0]}} ~ {{career.term[1]}}
                        </v-card-subtitle>
                    </div>
                </v-card>
                <v-card class="about-me-card" dark color="black">
                    <h3>skills</h3>
                    <v-simple-table class="skill-table" v-if="profile" dark>
                        <tr v-for="(skill, index) in profile.skills">
                            <td class="skill-name-text">
                                {{skill.name}}
                            </td>
                            <td class="skill-progress">
                                <v-progress-linear
                                        :value="skill.level"
                                        height="20px"
                                        rounded
                                        color="rgb(226, 216, 255)"
                                >
                                    {{skill.level}}%
                                </v-progress-linear>
                            </td>
                        </tr>
                    </v-simple-table>
                </v-card>
            </v-col>
            <v-col v-if="!isMobile" cols="0" lg="2"/>
        </v-row>
    </v-card>
</template>

<script>
    export default {
        name: "aboutMe",
        data() {
            return  {
            }
        },
        computed: {
            profile() {
                return this.$store.state.user.profile;
            },
            isMobile() {
                switch (this.$vuetify.breakpoint.name) {
                    case 'xs':
                        return true;
                    case 'sm':
                        return true;
                    case 'md':
                        return true;
                    case 'lg':
                        return false;
                    case 'xl':
                        return false;
                    default:
                        return true;
                }
            },
            color() {

            }
        },
        methods: {
        },
        created() {
            this.$store.commit('currentPage',{
                currentPage : "aboutMe"
            });
        }
    }

</script>

<style scoped>
    h3 {
        padding: 10px;
    }
    .about-me-container {
        padding: 10px 0;
    }
    .about-me-card {
        padding: 20px;
    }
    .intro-card {
        border-radius: 5px;
        background-color: #232323;
        margin: 0 10px;
        padding: 10px 15px;
    }
    .career-card {
        border-radius: 5px;
        margin: 10px;
        background-color: rgb(144, 107, 255)
    }
    .skill-table {
        background-color: black;
        color: #8B8B8B;
        padding: 0 10px;
    }
    .skill-name-text {
        font-size: 16px;
    }
    .skill-progress {
        width: 100%;
        margin: 20px 0;
        color: #8B8B8B;
    }
</style>