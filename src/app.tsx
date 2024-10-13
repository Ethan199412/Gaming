import * as React from "react";
import { useEffect, useState } from "react";
import "./app.less";
import axios from "axios";
// import 'antd/dist/antd.css';
import { Button, Form, Input, InputNumber, Select } from "antd";
import "./app.less";
import { Strategy } from "./gaming/types";
import { GamingEntity } from "./gaming/GamingEntity";
import battleManager from "./gaming/BattleManager";

const { Option } = Select;
const { Item } = Form;

// const strategies = [Strategy.Eagle, Strategy.Pigeon, Strategy.Random, Strategy.TitForTat];
const strategies = [
  Strategy.Eagle,
  Strategy.Eagle,
  Strategy.NeverForgive,
  Strategy.Pigeon,
  Strategy.CunningProber,
  Strategy.TitForTat,
  Strategy.TitForTat,
];

function generateEntities(stategies: Strategy[]) {
  const entities: GamingEntity[] = [];
  for (const strategy of stategies) {
    entities.push(new GamingEntity(strategy));
  }
  return entities;
}
const entities = generateEntities(strategies);
const competitors = generateEntities(strategies);

for (const entity1 of entities) {
  for (const entity2 of competitors) {
    battleManager.battle(entity1, entity2, 20);
  }
}

for (const entity1 of entities) {
  // console.log(entity1.strategy, entity1.getAllScore())
}

const strategyList = Object.values(Strategy).map((e) => {
  return {
    label: e,
    value: e,
  };
});
console.log("[p1.0] strategyList", strategyList);

const App = () => {
  useEffect(() => {
    // console.log('[p1.0]', entity1.scoreMappings[entity4.id])
    // console.log('[p1.1]', entity4.scoreMappings[entity1.id])
  }, []);

  const [gamingEntities, setGamingEntities] = useState<GamingEntity[]>([]);

  const onFinish = (value: any) => {
    console.log("[p1.0] value", value);
    const { strategy, number } = value;
    for (let i = 0; i < number; i++) {
      gamingEntities.push(new GamingEntity(strategy));
    }
    setGamingEntities([...gamingEntities]);
  };

  return (
    <div className="gaming-container">
      <h1>What is the optimal strategy in the iterated prisoner's dilemma?</h1>
      {gamingEntities.map((e) => {
        return <div>{`${e.id} ${e.strategy}`}</div>;
      })}
      <div className="flex">
        <div className="group-1-container gaming-entity-container">
          <div>group 1</div>
          {/* <div className="test"></div> */}
          <Form
            layout="inline"
            initialValues={{
              strategy: Strategy.Eagle,
              number: 1,
            }}
            onFinish={onFinish}
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
            <Button>clear</Button>
          </Form>
        </div>
        <div className="group-2-container gaming-entity-container">
          <div>group 2</div>
        </div>
      </div>
    </div>
  );
};

export default App;
