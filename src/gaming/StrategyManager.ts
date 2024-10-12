import { GamingEntity } from "./gamingEntity";
import { Action, Strategy } from "./types";

interface IOptions {
    competitorActions?: Action[],
    heFucksMe?: boolean,
    me: GamingEntity,
    competitor: GamingEntity
}

class StrategyManager {
    generateNextAction(strategy: Strategy, options: IOptions) {
        const { competitorActions, heFucksMe, me, competitor } = options
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
            case Strategy.NeverForgive:
                if (heFucksMe) {
                    return Action.Fight
                }
                return Action.Cooperate
        }
    }
}

export default new StrategyManager()