import { Button, Form, InputNumber, Select } from 'antd';
import { Strategy } from '../gaming/types';
import * as React from 'react';
import { useState } from 'react';
import { GamingEntity } from '../gaming/GamingEntity';
import CompetitorItem from './CompetitorItem';
import './BattleGroup.less';

const { Item } = Form;
const strategyList = Object.values(Strategy).map(e => {
  return {
    label: e,
    value: e,
  };
});
console.log('[p1.0] strategyList', strategyList);
interface IProps {
  title: string;
  gamingEntities: GamingEntity[];
  setGamingEntities: (gamingEntities: GamingEntity[]) => any;
  supportCopy?: boolean;
  copiedEntities: GamingEntity[];
  onCopy?: (...any) => any;
}

export default function BattleGroup(props: IProps) {
  const { title, gamingEntities, setGamingEntities } = props;
  // const [gamingEntities, setGamingEntities] = useState<GamingEntity[]>([]);

  // console.log('[p1.0] gamingEntities', gamingEntities);

  const onAdd = (value: any) => {
    console.log('[p1.0] value', value);
    const { strategy, number } = value;
    for (let i = 0; i < number; i++) {
      gamingEntities.push(new GamingEntity(strategy));
    }
    setGamingEntities([...gamingEntities]);
  };

  const onDelete = (id: string) => {
    const index = gamingEntities.findIndex(e => e.id == id);
    gamingEntities.splice(index, 1);
    setGamingEntities([...gamingEntities]);
  };

  const onClear = () => {
    setGamingEntities([]);
  };
  return (
    <div className="battle-group-container">
      <div className="title">{title}</div>
      <Form
        layout="inline"
        initialValues={{
          strategy: Strategy.Eagle,
          number: 1,
        }}
        onFinish={onAdd}
      >
        <Item label="Strategy" name="strategy" required>
          <Select
            style={{ width: 200 }}
            options={strategyList}
            // defaultValue={Strategy.Eagle}
          ></Select>
        </Item>
        <Item label="Number" name="number" required>
          <InputNumber style={{ width: 100 }} />
        </Item>
        <Item>
          <Button type="primary" htmlType="submit">
            add
          </Button>
        </Item>
        <Item>
          <Button onClick={onClear}>clear</Button>
        </Item>
      </Form>
      {gamingEntities.map(e => {
        return <CompetitorItem gamingEntity={e} key={e.id} onDelete={onDelete} />;
      })}
    </div>
  );
}
