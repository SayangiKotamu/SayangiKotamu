import {
    SET_REPORTS_LIST,
    SET_LOADING_REPORTS,
    SET_DETAIL_REPORT,
    SET_LOADING_DETAIL,
    SET_LOADING_SEND_REPORT,
    SET_LOADING_UPVOTE_REPORT,
    SET_LOADING_DOWNVOTE_REPORT,
    SET_LOADING_RATE_REPORT,
} from './actionType'

const initialState = {
    reports: [],
    loadingReports: false,
    detailReport: [], // Fetch By ID
    loadingDetailReport: false,
    loadingSendReport: false,
    loadingUpVote: false,
    loadingDownVote: false,
    loadingRateReport: false,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_REPORTS_LIST:
            return {
                ...state,
                reports: action.payload,
            }
        case SET_LOADING_REPORTS:
            return {
                ...state,
                loadingReports: action.payload,
            }
        case SET_DETAIL_REPORT:
            return {
                ...state,
                detailReport: action.payload,
            }
        case SET_LOADING_DETAIL:
            return {
                ...state,
                loadingDetailReport: action.payload,
            }
        case SET_LOADING_SEND_REPORT:
            return {
                ...state,
                loadingSendReport: action.payload,
            }
        case SET_LOADING_UPVOTE_REPORT:
            return {
                ...state,
                loadingUpVote: action.payload,
            }
        case SET_LOADING_DOWNVOTE_REPORT:
            return {
                ...state,
                loadingDownVote: action.payload,
            }
        case SET_LOADING_RATE_REPORT:
            return {
                ...state,
                loadingRateReport: action.payload,
            }
        default:
            return state
    }
}
