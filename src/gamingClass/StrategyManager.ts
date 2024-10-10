import { Action, Strategy } from "./gamingEntity";

class StrategyManager {
    generateNextAction(strategy: Strategy, competitorActions: Action[]) {
        // if(strategy == Strategy.TitForTat){
        //     console.log('[p1.4] competitorActions', competitorActions)
        // }
        switch (strategy) {
            case Strategy.Eagle:
                return Action.Fight;
            case Strategy.Pigeon:
                return Action.Cooperate;
            case Strategy.Random:
                const digit = Math.round(Math.random())
                return digit == 0 ? Action.Cooperate : Action.Fight
            case Strategy.TitForTat:
                if (competitorActions.length > 0) {
                    return competitorActions[competitorActions.length - 1]
                }
                return Action.Cooperate;
        }
    }
}

export default new StrategyManager()