import { useReducer } from 'react';
import reducer, { initState } from './reducer';
import StateContext from './context';
function StateProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initState);
    return <StateContext.Provider value={[state, dispatch]}>{children}</StateContext.Provider>;
}
export default StateProvider;
