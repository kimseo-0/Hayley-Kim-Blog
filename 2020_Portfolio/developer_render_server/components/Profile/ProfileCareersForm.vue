<template>
    <div>
        <v-simple-table style="">
            <tr>
                <td colspan="3">
                    <v-textarea v-model="careerName"
                            single-line
                            label="name"
                            hide-details
                            rows="2"
                            prepend-icon="mdi-card-text"
                            style="padding: 0;"
                    />
                </td>
            </tr>
            <tr>
                <td colspan="3">
                    <v-menu
                            ref="startMenu"
                            :close-on-content-click="false"
                            offset-y
                            min-width="290px" >
                        <template v-slot:activator="{ on }">
                            <v-text-field v-model="dates"
                                    label="term"
                                    single-line
                                    prepend-icon="mdi-calendar-range"
                                    readonly
                                    v-on="on"
                            />
                        </template>
                        <v-date-picker v-model="dates"
                                no-title
                                range
                                scrollable
                        >
                        </v-date-picker>
                    </v-menu>
                </td>
                <td>
                    <v-btn icon style="height: 100%;" @click="addCareer">
                        <v-icon>
                            mdi-plus
                        </v-icon>
                    </v-btn>
                </td>
            </tr>

            <div v-for="(career, index) in saveCareer">
                <careers-form :career="career" :index="index"/>
            </div>
        </v-simple-table>
    </div>
</template>

<script>
    import CareersForm from "./CareersForm";
    export default {
        name: "ProfileCareersForm",
        components: {CareersForm},
        props: {
            careers: Array
        },
        data() {
            return {
                saveCareer: this.careers,
                careerName: '',
                dates: [],
            }
        },
        methods: {
            async addCareer() {
                await this.$store.dispatch('profile/addProfile', {
                    type: 'careers',
                    data: {num: this.saveCareer.length+1,  name: this.careerName, term: this.dates}
                });
                this.careerName = '';
                this.dates = [];
            },
        }
    }
</script>

<style scoped>

</style>