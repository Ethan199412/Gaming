import * as React from 'react';
import { GamingEntity } from '../gaming/GamingEntity';
import { Tag } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import './CompetitorItem.less';
import { Strategy } from '../gaming/types';

const colorMapping = {
  [Strategy.Eagle]: 'red',
  [Strategy.Pigeon]: 'lime',
  [Strategy.Random]: 'orange',
  [Strategy.NeverForgive]: 'cyan',
  [Strategy.TitForTat]: 'gold',
  [Strategy.CunningProber]: 'volcano',
};

interface IProps {
  gamingEntity: GamingEntity;
  onDelete: (id: string) => any;
}

export default function CompetitorItem(props: IProps) {
  const { gamingEntity, onDelete } = props;
  return (
    <Tag
      color={colorMapping[gamingEntity.strategy]}
      className="competitior-item"
      closeIcon={<CloseCircleOutlined />}
      onClose={() => onDelete(gamingEntity.id)}
    >
      {`Id: ${gamingEntity.id} strategy: ${gamingEntity.strategy}`}
    </Tag>
  );
}
