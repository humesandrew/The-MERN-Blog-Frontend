import { useAuthContext } from "./useAuthContext";


export const useLogout = () => {
const { dispatch } = useAuthContext();
// we destructure dispatch from context b/c dispatch can't have the same name twice//
const { dispatch: blogsDispatch } = useAuthContext();
    const logout = () => {
        //remove user from storage//
        localStorage.removeItem('user');

        // dispatch logout action//
        dispatch({type: 'LOGOUT'});
        blogsDispatch({type: 'SET_BLOGS', payload: null})
    }

    return {logout}
}