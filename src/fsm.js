class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (!config) throw new Error();
        this.initial = config.initial;
        this.activeState = this.initial;
        this.states = config.states;
        this.transitions = config.transitions;
        this.prevState = [this.activeState];
        this.nextState = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        if (this.activeState) {
            return this.activeState;
        }
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
       if (state in this.states){
           this.prevState.push(this.activeState);
           this.activeState = state ;
           this.nextState = [];
       }
       else throw new Error();
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (this.states[this.activeState].transitions[event])
            this.changeState(this.states[this.getState()].transitions[event]);
        else throw new Error();
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.activeState = this.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (!event) return Object.getOwnPropertyNames(this.states);
        this.mas = [];
        for (var i in this.states){
            this.help = this.states[i].transitions[event]
            if (this.help) this.mas.push(i);
        }
        return this.mas;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.prevState.length <= 1) return false;
        this.nextState.push(this.activeState);
        this.activeState = this.prevState.pop();
        return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.nextState.length < 1) return false;
        this.prevState.push(this.activeState);
        this.activeState = this.nextState.pop();
        return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.prevState = [];
        this.nextState = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
