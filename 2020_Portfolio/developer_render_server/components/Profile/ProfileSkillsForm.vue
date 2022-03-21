<template>
    <div>
        <v-simple-table>
            <tr>
                <td colspan="2">
                    <v-text-field v-model="skillName"
                            single-line
                            label="name"
                            hide-details
                            style="padding: 0px;"
                    />
                </td>
                <td>
                    <v-text-field v-model="skillLevel"
                            single-line
                            label="num"
                            hide-details
                            style="padding: 0;"
                    />
                </td>
                <td>
                    <v-btn icon style="height: 100%;" @click="addSkill">
                        <v-icon>
                            mdi-plus
                        </v-icon>
                    </v-btn>
                </td>
            </tr>

            <div v-for="(skill, index) in saveSkills">
                <skills-form :skill="skill" :index="index"/>
            </div>
        </v-simple-table>
    </div>
</template>

<script>
    import SkillsForm from "./SkillsForm";
    export default {
        name: "ProfileSkillsForm",
        components: {SkillsForm},
        props: {
            skills: Array
        },
        data() {
            return {
                saveSkills: this.skills,
                skillName: '',
                skillLevel: '',
            }
        },
        methods: {
            async addSkill() {
                await this.$store.dispatch('profile/addProfile', {
                    type: 'skills',
                    data: {num: this.saveSkills.length+1, name: this.skillName, level: this.skillLevel}
                });
                this.skillName = '';
                this.skillLevel = '';
            },
        }
    }
</script>

<style scoped>

</style>