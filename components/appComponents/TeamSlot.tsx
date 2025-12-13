/*
TeamSlot.tsx

This represents a Sinner in the Team Loadout.
Should have an image + name.
*/

import { useTeamBuilder } from '@/src/team/TeamBuilderContext';
import { Sinner } from '@/src/types/units';
import React from 'react'

function TeamSlot({ sinner }: {sinner: Sinner}) {
  const { teamSlots, clearSlot } = useTeamBuilder();
  const assigned = teamSlots[sinner];

  const sinnerBox = "bg-amber-600 p-3 grid grid-cols-1 gap-2 m-3 w-full"

  return (
    <div className={sinnerBox}>
      <p className="text-center">{sinner}</p>
      
      <div className="mt-1">
            {assigned ? assigned.name : 'Empty'}
        </div>
      
      {assigned ? (
                <button className="rounded px-2 py-1 bg-neutral-700"
                onClick={() => clearSlot(sinner)}>Clear</button>
            ) : null}
      
      
    </div>
  )
}

export default TeamSlot