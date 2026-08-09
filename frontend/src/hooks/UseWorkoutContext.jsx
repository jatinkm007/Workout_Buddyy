import { useContext } from "react"; 
import { WorkoutContext } from "../context/WorkoutContext";

export const UseWorkoutsContext = () => {
    const context = useContext(WorkoutContext);


    if(!context) {
        throw Error('UseWorkoutsContext must be used inside a WorkoutContextProvider');
    }

    return context;
}

