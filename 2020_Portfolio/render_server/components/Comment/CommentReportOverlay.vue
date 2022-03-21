<template>
    <v-dialog :value="reportOverlay"
              class="comment-report-overlay"
              max-width="400px">
        <v-card light>
            <v-card-title>Report Comment</v-card-title>
            <v-card-text>
                <v-radio-group v-model="radios" hide-details>
                    <v-radio v-for="(report, index) in reports" :key="index" :label="report" :value="report" light/>
                    <v-radio label="기타" value="text" light/>
                </v-radio-group>
                <v-text-field v-model="reportText"
                              single-line required hide-details :dense = true
                              :disabled="!reportForm" />
            </v-card-text>
            <v-card-actions>
                <div class="comment-report-overlay-button">
                    <v-btn text color="red" @click="closeReportOverlay">
                        cancel
                    </v-btn>
                    <v-btn text color="green"
                           :disabled="!((radios !== false && radios !== 'text') || (radios === 'text' && reportText !== ''))"
                           @click.prevent="reportComment" >
                        report
                    </v-btn>
                </div>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "CommentReportOverlay",
        props: {
            reportOverlay: Boolean,
            commentId: Number
        },
        data() {
            return {
                radios: false,
                reportText: '',

                reports: ['관계없는 내용','선정적인 내용','상업적인 내용','비방, 욕설, 희롱']
            }
        },
        computed: {
            reportForm() {
                return this.radios === 'text'
            }
        },
        methods: {
            closeReportOverlay() {
                this.$emit('closeReportOverlay');
            },
            reportComment() {
                this.$emit('reportComment');
            }
        }
    }
</script>

<style scoped>
    .comment-report-overlay {
        position: fixed;
        top: 0;
    }
    .comment-report-overlay-button {
        float:right;
     }
</style>