import {buildAlertFromResponse} from '../../utils/alert';

import {
  PROJECTS_REQUEST,
  PROJECTS_SUCCESS,
  PROJECTS_FAILURE,
  PROJECTS_CREATE_REQUEST,
  PROJECTS_CREATE_SUCCESS,
  PROJECTS_CREATE_FAILURE,
  PROJECTS_UPDATE_REQUEST,
  PROJECTS_UPDATE_SUCCESS,
  PROJECTS_UPDATE_FAILURE,
  PROJECTS_DELETE_REQUEST,
  PROJECTS_DELETE_SUCCESS,
  PROJECTS_DELETE_FAILURE
} from './projectsConstants';

const initialState = {
  errors: [],
  isCreating: false,
  isDeleting: false,
  isUpdating: false,
  isFetching: false,
  items: [],
};

const projects = (state = initialState, action) => {
  switch(action.type) {
    case PROJECTS_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case PROJECTS_SUCCESS:
      return {
        ...state,
        errors: [],
        isFetching: false,
        items: action.projects.reduce((previous, project) => {
          previous[project.id] = project;
          return previous;
        }, {}),
      };

    case PROJECTS_CREATE_REQUEST:
      return {
        ...state,
        isCreating: true,
      };

    case PROJECTS_CREATE_SUCCESS:
      return {
        ...state,
        errors: [],
        isCreating: false,
        items: {
          ...state.items,
          [action.project.id]: action.project
        }
      };

    case PROJECTS_CREATE_FAILURE:
      return {
        ...state,
        errors: buildAlertFromResponse(action.errors),
        isCreating: false,
      };

    case PROJECTS_UPDATE_REQUEST:
      return {
        ...state,
        errors: [],
        isUpdating: true,
      };

    case PROJECTS_UPDATE_SUCCESS:
      return {
        ...state,
        errors: [],
        isUpdating: false,
      };

    case PROJECTS_DELETE_REQUEST:
      return {
        ...state,
        errors: [],
        isDeleting: true
      };

    case PROJECTS_DELETE_SUCCESS:
      return {
        ...state,
        errors: [],
        isDeleting: false,
        items: Object.keys(state.items).reduce((previous, key) => {
          if (action.project_id !== key) {
            previous[key] = state.items[key];
            return previous;
          }
        }, {}),
      };

    default:
      return state;
  }
};

export default projects;