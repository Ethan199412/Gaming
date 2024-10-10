import idManager from "./IdManager";
import strategyManager from "./StrategyManager";

export enum Action {
    Fight = 'FIGHT',
    Cooperate = 'COOPERATE'
}

export enum Strategy {
    Eagle = 'EAGLE',
    Pigeon = 'PIGEON',
    Random = 'RANDOM',
    TitForTat = 'TIT_FOR_TAT'
}

export class GamingEntity {
    id: string;
    competitorMappings: Record<string, GamingEntity> = {};
    // one's own action toward a competitor
    actionMappings: Record<string, Action[]> = {};

    // one's own store toward a competitor
    scoreMappings: Record<string, number[]> = {};
    strategy: Strategy

    constructor(strategy: Strategy) {
        this.id = String(idManager.initNewId())
        this.strategy = strategy
    }

    initBattle(competitor: GamingEntity) {
        const { id: competitorId } = competitor
        if (!this.scoreMappings[competitorId]) {
            this.scoreMappings[competitorId] = []
        }
        if (!this.actionMappings[competitorId]) {
            this.actionMappings[competitorId] = []
        }
        if (!this.competitorMappings[competitorId]) {
            this.competitorMappings[competitorId] = competitor
        }
    }

    generateNextAction(competitorId: string) {
        const competitorActions: Action[] = this.competitorMappings[competitorId].actionMappings[this.id]
        const action = strategyManager.generateNextAction(this.strategy, competitorActions)
        // this.actionMappings[competitorId].push(action)
        return action
    }

    addAction(competitorId: string, action: Action){
        this.actionMappings[competitorId].push(action)
    }

    addScore(competitorId: string, score: number) {
        this.scoreMappings[competitorId].push(score)
    }

    getAllScore() {
        const map: Record<string, number> ={}
        for (const competitorId in this.competitorMappings) {
            const scores = this.scoreMappings[competitorId]
            const score = scores.reduce((sum, next) => sum + next, 0)
            map[competitorId] = score
        }
        return map
    }
}

class BattleManager {
    private initBattle(entity1: GamingEntity, entity2: GamingEntity) {
        entity1.initBattle(entity2)
        entity2.initBattle(entity1)
        // console.log('[p1.3] entity2', entity2)
    }
    public battle(entity1: GamingEntity, entity2: GamingEntity, times: number) {
        this.initBattle(entity1, entity2)
        for (let i = 0; i < times; i++) {
            const entity1Action = entity1.generateNextAction(entity2.id)
            const entity2Action = entity2.generateNextAction(entity1.id)

            let entity1Score, entity2Score;
            if (entity1Action == Action.Cooperate && entity2Action == Action.Cooperate) {
                entity1Score = 3;
                entity2Score = 3
            }
            else if (entity1Action == Action.Fight && entity2Action == Action.Cooperate) {
                entity1Score = 5;
                entity2Score = 0
            }
            else if (entity1Action == Action.Cooperate && entity2Action == Action.Fight) {
                entity1Score = 0;
                entity2Score = 5
            }
            else {
                entity1Score = 1;
                entity2Score = 1
            }
            entity1.addScore(entity2.id, entity1Score)
            entity2.addScore(entity1.id, entity2Score)
            
            entity1.addAction(entity2.id, entity1Action)
            entity2.addAction(entity1.id, entity2Action)

        }
    }
}

export default new BattleManager()