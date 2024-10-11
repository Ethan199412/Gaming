import * as React from "react";
import { useEffect, useState } from 'react'
import "./app.less";
import { mult, pow } from './utils'
import axios from 'axios'
// import 'antd/dist/antd.css';
import { Button, Input } from 'antd'
import './app.less'

import battleManager, { GamingEntity, Strategy } from './gamingClass/gamingEntity'


// const strategies = [Strategy.Eagle, Strategy.Pigeon, Strategy.Random, Strategy.TitForTat];
const strategies = [Strategy.Eagle, Strategy.Eagle, Strategy.Eagle, Strategy.Pigeon, Strategy.TitForTat, Strategy.TitForTat, Strategy.TitForTat];

function generateEntities(stategies: Strategy[]) {
    const entities: GamingEntity[] = []
    for (const strategy of stategies) {
        entities.push(new GamingEntity(strategy))
    }
    return entities
}
const entities = generateEntities(strategies)
const competitors = generateEntities(strategies)

for (const entity1 of entities) {
    for (const entity2 of competitors) {
        battleManager.battle(entity1, entity2, 20)
    }
}

for (const entity1 of entities) {
    console.log(entity1.strategy, entity1.getAllScore())
}

const App = () => {
    useEffect(() => {
        // console.log('[p1.0]', entity1.scoreMappings[entity4.id])
        // console.log('[p1.1]', entity4.scoreMappings[entity1.id])
    }, [])
    return <div>123</div>
};


export default App;