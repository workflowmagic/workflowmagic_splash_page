import React, {useContext,createContext,useState} from 'react';

const Context = createContext();

export function Provider(props){

	const [state, setState] = useState()

	return(
		<Context.Provider value={{
			state:state
		}}>
          
         {props.children}
		</Context.Provider>
	)
}



export default Context