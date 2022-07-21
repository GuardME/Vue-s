import {createStore} from "vuex";
import axiosClient from "../axios";


const store = createStore({
  state: {
    user: {
      data: null,
      token: sessionStorage.getItem('TOKEN')
    },
    currentSurvey: {
      data: {},
      loading: false,
    },
    surveys: {
      loading: false,
      data: [],
      links: [],
    },
    dashboard: {
      loading: false,
      data: {}
    },
    // cara ambil dari fake json
    // surveys: [...tmpSurveys],
    questionTypes: ["text","select","radio","checkbox","textarea"],
    notification: {
      show: false,
      message: null,
      type: null,
    }
  },
  getters: {},
  actions: {
    getSurvey({commit}, id) {
      commit("setCurrentSurveyLoading", true);
      return axiosClient.get(`/survey/${id}`)
      .then(res => {
        commit("setCurrentSurvey", res.data);
        commit("setCurrentSurveyLoading", false);
        return res;
      })
      .catch((err) => {
        commit("setCurrentSurveyLoading", false);
        throw err;
      });
    },
    getSurveys({commit}, {url = null } = {}) {
      url = url || '/survey'
      commit('setSurveysLoading', true)
      return axiosClient.get(url).then((res) => {
        commit("setSurveys", res.data)
        commit("setSurveysLoading", false)
        return res;
      });
    },
    saveSurvey({ commit }, survey) {
      delete survey.image_url;
      let response;
      if(survey.id) {
        response = axiosClient.put(`/survey/${survey.id}`, survey)
        .then((res) => {
          commit("setCurrentSurvey", res.data);
          return res;
        });
      } else {
        response = axiosClient.post("/survey", survey).then((res) => {
          commit("saveSurvey", res.data);
          return res;
        });
      }
      return response;
    },
    saveSurveyAnswer({commit}, {surveyId, answers}) {
      return axiosClient.post(`/survey/${surveyId}/answer`, {answers});
    },
    deleteSurvey({}, id) {
      return axiosClient.delete(`/survey/${id}`);
    },
    getSurveyBySlug({ commit }, slug) {
      commit("setCurrentSurveyLoading", true);
      return axiosClient.get(`survey-by-slug/${slug}`)
      .then((res) => {
        commit("setCurrentSurvey", res.data);
        commit("setCurrentSurveyLoading", false);
        return res;
      })
      .catch((err) => {
        commit("setCurrentSurveyLoading", false);
        throw err;
      })
    },
    getDashboardData({commit}) {
      commit('dashboardLoading', true);
      return axiosClient.get(`/dashboard`)
      .then((res) => {
        commit('dashboardLoading', false)
        commit('setDashboardData', res.data)
        return res;
      })
      .catch(error => {
        commit('dashnoardLoading', false)
        throw error;
      })
    },

    register({commit}, user) {
      return axiosClient.post('/register', user)
        .then((response) => {
          commit('setUser', data.user);
          commit('setToken', data.token)
          return data;
        })
    },
    login({commit}, user) {
      return axiosClient.post('/login', user)
        .then(({data}) => {
          commit('setUser', data.user);
          commit('setToken', data.token)
          return data;
        })
    },
    logout({commit}) {
      return axiosClient.post('/logout')
        .then(response => {
          commit('logout')
          return response;
        })
    },
    getUser({commit}) {
      return axiosClient.get('/user')
      .then(res => {
        console.log(res);
        commit('setUser', res.data)
      })
    },
  },
  mutations: {
    setCurrentSurveyLoading(state, loading) {
      state.currentSurvey.loading = loading;
    },
    setSurveysLoading: (state, loading) => {
      state.surveys.loading = loading;
    },
    setCurrentSurvey(state, survey) {
    state.currentSurvey.data = survey.data;
    },
    setSurveys(state, surveys) {
      state.surveys.links = surveys.meta.links;
      state.surveys.data = surveys.data;
    },
    saveSurvey: (state, survey) => {
      state.surveys = [...state.surveys, survey.data];
    },
    updateSurvey: (state, survey) => {
      state.surveys = state.surveys.map((s) => {
        if(s.id == survey.data.id) {
          return survey.data;
        }
        return s;
      });
    },
    logout: (state) => {
      state.user.token = null;
      state.user.data = {};
      sessionStorage.removeItem("TOKEN");
    },
    setUser: (state, user) => {
      state.user.data = user;
    },
    setToken: (state, token) => {
      state.user.token = token;
      sessionStorage.setItem('TOKEN', token);
    },
    notify: (state, {message, type}) => {
      state.notification.show = true;
      state.notification.type = type;
      state.notification.message = message;
      setTimeout(() => {
        state.notification.show = false;
      }, 3000)
    },
    dashboardLoading: (state, loading) => {
      state.dashboard.loading = loading;
    },
    setDashboardData: (state, data) => {
      state.dashboard.data = data
    },
  },
  modules: {},
})

export default store;
