const initialState = {}
export const profileReducer = (state= initialState, action: any) => {
    switch (action.type) {
        case "": {
            return {}
        }
        default:
            return state;
    }
};