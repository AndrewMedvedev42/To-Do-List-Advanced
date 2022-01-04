const State = {
    userId:null,
    isLogged:false
}

export const accountReducer = (state=State, action) => {
    switch (action.type){
        default:
            return {...state}
    }
}