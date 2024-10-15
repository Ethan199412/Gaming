import * as React from 'react';
import { useEffect, useState } from 'react';
import './app.less';
import axios from 'axios';
// import 'antd/dist/antd.css';
import { Button, Form, Input, InputNumber, Select } from 'antd';
import './app.less';
import { Strategy } from './gaming/types';
import { GamingEntity } from './gaming/GamingEntity';
import battleManager from './gaming/BattleManager';
import BattleGroup from './components/BattleGroup';
import BattleConfiger from './components/BattleConfiger';
import BattleTable from './components/BattleTable';

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

const App = () => {
  const [gamingEntities1, setGamingEntities1] = useState<GamingEntity[]>([]);
  const [gamingEntities2, setGamingEntities2] = useState<GamingEntity[]>([]);
  const [battleId, setBattleId] = useState<number>(0);

  const onCopy = () => {
    const copiedEntities: GamingEntity[] = [];
    for (const gamingEntity of gamingEntities1) {
      const { strategy } = gamingEntity;
      const newEntity = new GamingEntity(strategy);
      copiedEntities.push(newEntity);
    }
    setGamingEntities2(copiedEntities);
  };

  return (
    <div className="gaming-container">
      <h1>What is the optimal strategy in the iterated prisoner's dilemma?</h1>
      <BattleConfiger
        gamingEntities1={gamingEntities1}
        gamingEntities2={gamingEntities2}
        setBattleId={setBattleId}
        battleId={battleId}
      />
      <div className="flex gaming-group-container">
        <div className="group-1-container gaming-entity-container">
          <BattleGroup title="group 1" gamingEntities={gamingEntities1} setGamingEntities={setGamingEntities1} />
        </div>
        <div className="group-2-container gaming-entity-container">
          <BattleGroup
            title="group 2"
            gamingEntities={gamingEntities2}
            setGamingEntities={setGamingEntities2}
            copiedEntities={gamingEntities1}
            copiedName="group1"
            onCopy={onCopy}
          />
        </div>
      </div>
      <BattleTable gamingEnitities={gamingEntities1} competitors={gamingEntities2} />
    </div>
  );
};

export default App;
