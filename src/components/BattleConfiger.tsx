import { Button, Form, InputNumber } from 'antd';
import * as React from 'react';
import './BattleConfiger.less';
import { GamingEntity } from '../gaming/GamingEntity';
import battleManager from '../gaming/BattleManager';

const { Item } = Form;

interface IProps {
  gamingEntities1: GamingEntity[];
  gamingEntities2: GamingEntity[];
  setBattleId: (battleId: number) => any;
  battleId: number;
}

export default function BattleConfiger(props: IProps) {
  const { gamingEntities1, gamingEntities2, setBattleId, battleId } = props;

  const onBattle = (values: any) => {
    const { battleTimes } = values;
    console.log('[p1.6] battleTimes', battleTimes);
    for (const entity1 of gamingEntities1) {
      for (const entity2 of gamingEntities2) {
        battleManager.battle(entity1, entity2, battleTimes);
      }
    }
    setBattleId(battleId + 1);
  };
  return (
    <div className="battle-configer-container">
      <Form layout="inline" onFinish={onBattle} initialValues={{ battleTimes: 1 }}>
        <Item name={'battleTimes'} label="Battle Times" required>
          <InputNumber />
        </Item>
        <Item>
          <Button type="primary" htmlType="submit">
            Start Battle
          </Button>
        </Item>
      </Form>
    </div>
  );
}
