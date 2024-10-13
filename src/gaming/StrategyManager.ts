import { GamingEntity } from "./gamingEntity";
import { Action, Score, Strategy } from "./types";

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
        const { length } = myScore;
        if (length >= 2) {
          if (
            myScore[length - 1] == Score.BothLose &&
            myScore[length - 2] == Score.BothLose
          ) {
            return Action.Cooperate;
          }
        }
        return Action.Fight;
    }
  }
}

export default new StrategyManager();
