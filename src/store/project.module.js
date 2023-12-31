import ProjectService from "@/services/project.service";

const initialState = {
    project: {},
    projectList: [],
}
export const project = {
    namespaced: true,
    state: initialState,
    actions: {
        setProjectList({ commit }, recaptchaToken) {
            return ProjectService.getProjects(recaptchaToken).then(
                function (response) {
                    const projectList = response.data.data;
                    commit('setProjectList', projectList);
                    // Initialize "default" project
                    commit('setProject', projectList.find(project => project.name === 'default'));
                    return Promise.resolve(projectList);
                },
                function (error) {
                    return Promise.reject(error);
                }
            );
        },
        setProject({ commit }, project) {
            commit('setProject', project);
        },
        addProject({ commit }, {projectName, userId}) {
            return ProjectService.createProject(projectName, userId).then(
                function (response) {
                    const project = response.data.data;
                    commit('addToProjectList', project);
                    commit('setProject', project);
                    return Promise.resolve(project);
                },
                function (error) {
                    return Promise.reject(error);
                }
            );
        },
        deleteProject({ commit }, projectId) {
            return ProjectService.deleteProject(projectId).then(
                function (response) {
                    commit('removeFromProjectList', projectId);
                    return Promise.resolve(response);
                },
                function (error) {
                    return Promise.reject(error);
                }
            );
        }
    },
    mutations: {
        setProjectList(state, projects) {
            state.projectList = projects;
        },
        addToProjectList(state, project) {
            state.projectList.push(project);
        },
        removeFromProjectList(state, projectId) {
            if (state.project.id === projectId) {
                state.project = state.projectList.find(project => project.name === 'default');
            }
            state.projectList = state.projectList.filter(project => project.id !== projectId);
        },
        setProject(state, project) {
            state.project = project;
        }
    }
}