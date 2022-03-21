<template>
    <tr style="width: 100%; height: 100%; overflow:auto;">
        <td>
            <v-text-field v-model="saveCareer.num"
                          solo
                          flat
                          hide-details
                          :readonly="!careerForm"
            />
        </td>
        <td>
            <v-text-field v-model="saveCareer.name"
                          solo
                          flat
                          hide-details
                          :readonly="!careerForm"
            />
        </td>
        <td>
            <v-menu
                    ref="startMenu"
                    :close-on-content-click="false"
                    offset-y
                    min-width="290px" >
                <template v-slot:activator="{ on }">
                    <v-text-field v-model="saveCareer.term"
                                  solo
                                  flat
                                  hide-details
                                  :readonly="!careerForm"
                                  v-on="on"
                    />
                </template>
                <v-date-picker v-model="saveCareer.term"
                               no-title
                               range
                               scrollable
                >
                </v-date-picker>
            </v-menu>
        </td>
        <td v-if="!careerForm">
            <v-btn icon @click="careerForm=!careerForm">
                <v-icon>
                    mdi-pencil
                </v-icon>
            </v-btn>
        </td>
        <td v-else>
            <v-btn icon @click="updateCareer">
                <v-icon>
                    mdi-check
                </v-icon>
            </v-btn>
            <v-btn icon @click="cancelUpdateCareer">
                <v-icon>
                    mdi-close
                </v-icon>
            </v-btn>
        </td>
        <td>
            <v-btn v-if="!careerForm" icon @click="deleteCareers(index, saveCareer.name)">
                <v-icon>
                    mdi-delete
                </v-icon>
            </v-btn>
        </td>
    </tr>
</template>

<script>
    export default {
        name: "CareersForm",
        props: {
            index: Number,
            career: Object,
        },
        data() {
            return {
                saveCareer: JSON.parse(JSON.stringify(this.career)),
                careerForm: false,
            }
        },
        methods: {
            async deleteCareers(index, name) {
                await this.$store.dispatch('profile/deleteProfile', {
                    type: 'careers',
                    index: this.index,
                    data: name
                });
            },
            async updateCareer() {
                this.careerForm = false;
                await this.$store.dispatch('profile/updateProfile', {
                    type: 'careers',
                    index: this.index,
                    data: this.saveCareer
                });
            },
            cancelUpdateCareer() {
                this.careerForm = false;
                this.saveCareer = this.career;
            },
        }
    }
</script>

<style scoped>

</style>