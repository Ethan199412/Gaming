import { Table } from 'antd';
import * as React from 'react';
import { GamingEntity } from '../gaming/GamingEntity';

interface IProps {
  gamingEnitities?: GamingEntity[];
  competitors?: GamingEntity[];
}
export default function BattleTable(props: IProps) {
  const { gamingEnitities = [], competitors = [] } = props;
  console.log('[p2.5]');
  if (!gamingEnitities.length || !competitors.length) {
    console.log('[p2.4]', gamingEnitities, competitors);
    return <></>;
  }

  //   for(const ga)

  const columns = [{ title: '', dataIndex: 'gamingEntityName', key: 'gamingEntityName' }];

  for (const competitior of competitors) {
    const { strategy, id } = competitior;
    columns.push({
      title: `id: ${id} ${strategy}`,
      dataIndex: id,
      key: id,
    });
  }
  const dataSource: any[] = [];
  for (const gamingEntity of gamingEnitities) {
    console.log('[p2.0] gamingEntity', gamingEntity);
    const { id, strategy } = gamingEntity;
    const row: any = {
      gamingEntityName: `id: ${id} ${strategy}`,
      key: id,
    };

    const scoreMappings = gamingEntity.getAllScore();
    console.log('[p2.1] scoreMappings', { scoreMappings, gamingEnitities, myScore: gamingEntity.scoreMappings });
    for (const id in scoreMappings) {
      row[id] = scoreMappings[id];
    }

    dataSource.push(row);
  }

  console.log('[p2.3] columns', columns, 'dataSource', dataSource);

  return (
    <div>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
}
