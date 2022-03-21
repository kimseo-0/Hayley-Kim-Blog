import Vue from 'vue'

export const state = () => ({
    reports : [],
});
export const mutations = {
    loadReports(state, payload) {
        const {reports} = payload;
        state.reports = reports;
    },

    logout(state) {
        state.reports = [];
    },
};
export const actions = {
    loadReports({commit},payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await this.$axios.get('http://localhost:7001/report/loadReports',{
                    withCredentials : true
                });
                const {reports, info} = res.data;
                commit('loadReports',{reports});
                return resolve({info})
            } catch (e) {
                console.error(e);
                return reject();
            }
        });
    },
    updateReportState({commit},payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await this.$axios.get('http://localhost:7001/comment/updateReportState',{
                    withCredentials : true
                });
                const {reports, info} = res.data;
                commit('loadReports',{reports});
                return resolve({info})
            } catch (e) {
                console.error(e);
                return reject();
            }
        });
    },
    deleteReport({commit},payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await this.$axios.get('http://localhost:7001/comment/loadReports',{
                    withCredentials : true
                });
                const {reports, info} = res.data;
                commit('loadReports',{reports});
                return resolve({info})
            } catch (e) {
                console.error(e);
                return reject();
            }
        });
    },
};