import idManager from './IdManager';
import strategyManager from './StrategyManager';
import { Action, Score, Strategy } from './types';

export class GamingEntity {
  id: string;
  competitorMappings: Record<string, GamingEntity> = {};
  // one's own action toward a competitor
  actionMappings: Record<string, Action[]> = {};

  // remember whether being fighted by a competitor
  heFucksMeMappings: Record<string, boolean> = {};

  // one's own store toward a competitor
  scoreMappings: Record<string, number[]> = {};
  strategy: Strategy;

  constructor(strategy: Strategy) {
    this.id = String(idManager.initNewId());
    this.strategy = strategy;
  }

  initBattle(competitor: GamingEntity) {
    const { id: competitorId } = competitor;
    if (!this.scoreMappings[competitorId]) {
      this.scoreMappings[competitorId] = [];
    }
    if (!this.actionMappings[competitorId]) {
      this.actionMappings[competitorId] = [];
    }
    if (!this.competitorMappings[competitorId]) {
      this.competitorMappings[competitorId] = competitor;
    }
    if (!this.heFucksMeMappings[competitorId]) {
      this.heFucksMeMappings[competitorId] = false;
    }
  }

  generateNextAction(competitorId: string) {
    const competitorActions: Action[] = this.competitorMappings[competitorId].actionMappings[this.id];
    const action = strategyManager.generateNextAction(this.strategy, {
      // competitorActions,
      // heFucksMe: this.heFucksMeMappings[competitorId],
      me: this,
      competitor: this.competitorMappings[competitorId],
    });
    // this.actionMappings[competitorId].push(action)
    return action;
  }

  addAction(competitorId: string, action: Action) {
    this.actionMappings[competitorId].push(action);
  }

  addScore(competitorId: string, score: number) {
    this.scoreMappings[competitorId].push(score);

    // used by never forgive
    if (score == Score.Loser) {
      this.heFucksMeMappings[competitorId] = true;
    }
  }

  getAllScore() {
    const map: Record<string, number> = {};
    console.log('[p2.2] competitorId', this, this.competitorMappings);
    for (const competitorId in this.competitorMappings) {
      const scores = this.scoreMappings[competitorId];
      const score = scores.reduce((sum, next) => sum + next, 0);
      map[competitorId] = score;
    }
    return map;
  }
}
