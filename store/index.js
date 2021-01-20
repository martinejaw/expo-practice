import { createStore } from 'redux'

const initialState = {
    logueado: false
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "setLogueado":
            return { ...state, logueado: action.value }
        default:
            return state
    }
}

const store = createStore(reducer)

export { store }

const setLogueado = (isLogueado) => {
    return {
        type: "setLogueado",
        value: isLogueado
    }
}

export { setLogueado }