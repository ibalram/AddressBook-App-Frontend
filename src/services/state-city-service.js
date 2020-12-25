import stateCity from './state-city.json';

class StateCityService{

    constructor(){
        this.stateCity = stateCity;
        this.states = Object.keys(stateCity);
    }
    getCitiesByState(state){
        return this.stateCity[state];
    }
    getStateByCity(city){
        const states = this.states.filter(state=> stateCity.includes(city));
        if (states.length>0){
            return states[0];
        }
        return "Others";
    }
    getStatesObject(){
        return this.stateCity;
    }
    getStates(){
        return this.states;
    }
}

export default (new StateCityService());