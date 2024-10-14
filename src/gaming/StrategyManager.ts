import { GamingEntity } from './GamingEntity';
import { Action, Score, Strategy } from './types';

interface IOptions {
  // competitorActions?: Action[],
  // heFucksMe?: boolean,
  me: GamingEntity;
  competitor: GamingEntity;
}

class StrategyManager {
  generateNextAction(strategy: Strategy, options: IOptions) {
    const { me, competitor } = options;
    const competitorActions = competitor.actionMappings[me.id];
    const heFucksMe = me.heFucksMeMappings[competitor.id];
    const myScore = me.scoreMappings[competitor.id];
    const myAction = me.actionMappings[competitor.id];
    const hisAction = competitor.actionMappings[me.id];

    switch (strategy) {
      case Strategy.Eagle:
        return Action.Fight;
      case Strategy.Pigeon:
        return Action.Cooperate;
      case Strategy.Random:
        const digit = Math.round(Math.random());
        return digit == 0 ? Action.Cooperate : Action.Fight;
      case Strategy.TitForTat:
        if (competitorActions.length > 0) {
          return competitorActions[competitorActions.length - 1];
        }
        return Action.Cooperate;
      case Strategy.NeverForgive:
        if (heFucksMe) {
          return Action.Fight;
        }
        return Action.Cooperate;
      case Strategy.CunningProber:
        const { length } = myAction;
        if (length >= 2) {
          if (
            myAction[length - 1] == Action.Fight &&
            hisAction[length - 1] == Action.Fight &&
            myAction[length - 2] == Action.Fight &&
            hisAction[length - 2] == Action.Fight
          ) {
            return Action.Cooperate;
          }
        }
        return Action.Fight;
    }
  }
}

export default new StrategyManager();
