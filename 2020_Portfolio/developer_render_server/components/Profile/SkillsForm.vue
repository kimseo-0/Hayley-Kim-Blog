<template>
    <tr>
        <td>
            <v-text-field v-model="saveSkill.num"
                          solo
                          flat
                          hide-details
                          :readonly="!skillForm"
            />
        </td>
        <td>
            <v-text-field v-model="saveSkill.name"
                          solo
                          flat
                          hide-details
                          :readonly="!skillForm"
            />
        </td>
        <td>
            <v-text-field v-model="saveSkill.level"
                          solo
                          flat
                          hide-details
                          :readonly="!skillForm"
            />
        </td>
        <td v-if="!skillForm">
            <v-btn icon @click="skillForm=!skillForm">
                <v-icon>
                    mdi-pencil
                </v-icon>
            </v-btn>
        </td>
        <td v-else>
            <v-btn icon @click="updateSkill">
                <v-icon>
                    mdi-check
                </v-icon>
            </v-btn>
            <v-btn icon @click="cancelUpdateSkill">
                <v-icon>
                    mdi-close
                </v-icon>
            </v-btn>
        </td>
        <td>
            <v-btn v-show="!skillForm" icon @click="deleteSkill(index, skill.name)">
                <v-icon>
                    mdi-delete
                </v-icon>
            </v-btn>
        </td>
    </tr>
</template>

<script>
    export default {
        name: "SkillsForm",
        props: {
            skill: Object,
            index: Number
        },
        data() {
            return {
                saveSkill: JSON.parse(JSON.stringify(this.skill)),
                skillForm: false,
            }
        },
        methods: {
            async deleteSkill(index, name) {
                await this.$store.dispatch('profile/deleteProfile', {
                    type: 'skills',
                    index: this.index,
                    data: name
                });
            },
            async updateSkill() {
                this.skillForm = false;
                await this.$store.dispatch('profile/updateProfile', {
                    type: 'skills',
                    index: this.index,
                    data: this.saveSkill
                });
            },
            cancelUpdateSkill() {
                this.skillForm = false;
                this.saveSkill = this.skills
            },
        }
    }
</script>

<style scoped>

</style>