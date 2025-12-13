'use client';
import React from 'react'
import Image from 'next/image';
import { UnitItem } from '@/src/types/units';

type Props = {
  item: UnitItem;
  owned: boolean;
  onToggle: (id: string) => void;
  
}

function CollectionCard({ item, owned, onToggle} : Props) {
  const unownedClassName = "border-2 m-1 p-1"
  const ownedClassName = "border-2 bg-amber-500 m-1 p-1"


  return (
    <button className={owned ? ownedClassName : unownedClassName} onClick={() => onToggle(item.id)}> 
      <div>
        {item.name} {item.sinner}
      </div>
      <div>
        {owned}
      </div>
    </button>
  )
}

export default CollectionCard