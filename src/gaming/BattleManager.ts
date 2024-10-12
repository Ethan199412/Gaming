import { GamingEntity } from "./GamingEntity"
import { Action, Score } from "./types"

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
                entity1Score = Score.BothWin;
                entity2Score = Score.BothWin
            }
            else if (entity1Action == Action.Fight && entity2Action == Action.Cooperate) {
                entity1Score = Score.WinOther;
                entity2Score = Score.Loser
            }
            else if (entity1Action == Action.Cooperate && entity2Action == Action.Fight) {
                entity1Score = Score.Loser;
                entity2Score = Score.WinOther
            }
            else {
                entity1Score = Score.BothLose;
                entity2Score = Score.BothLose
            }
            entity1.addScore(entity2.id, entity1Score)
            entity2.addScore(entity1.id, entity2Score)

            entity1.addAction(entity2.id, entity1Action)
            entity2.addAction(entity1.id, entity2Action)

        }
    }
}

export default new BattleManager()