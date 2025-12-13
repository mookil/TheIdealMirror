/*
CollectionCard

This represents a card in the Collection.
It can toggle being owned/unowned, 
and can be clicked to be added to Team Loadout in the page.tsx.
*/
'use client';
import React from 'react'
import Image from 'next/image';
import { UnitItem } from '@/src/types/units';
import { useTeamBuilder } from '@/src/team/TeamBuilderContext';

type Props = {
  item: UnitItem;
  owned: boolean;
  onToggle: (id: string) => void;
  
}

function CollectionCard({ item, owned, onToggle} : Props) {
  const { isOpen, assignByUnit } = useTeamBuilder();

  // Handle when this card is clicked:
  const handleClick = () => {
    // if the sidebar is open, assign it to the given sinner team slot. otherwise just toggle owned
    if (isOpen) {
      assignByUnit(item);
      return;
    }
    onToggle(item.id);
  }

  const hoverName = " hover:opacity-80 "
  const unownedClassName = "border-2 m-1 p-1 opacity-50 active:border-amber-500" + hoverName
  const ownedClassName = "border-2 m-1 p-1 border-amber-500" + hoverName


  return (
    <button className={owned ? ownedClassName : unownedClassName} onClick={handleClick}> 
      <div>
        <p>[{item.rarity}] {item.name} {item.sinner}</p>
      </div>
    </button>
  )
}

export default CollectionCard