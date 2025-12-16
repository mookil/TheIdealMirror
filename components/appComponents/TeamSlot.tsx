/*
TeamSlot.tsx

This represents a Sinner in the Team Loadout.
Should have an image + name.
Currently, only working with a name (eventually may add images)

There are two main components in a TeamSlot, a Sinner and 'assigned'.
Sinner = sinner this slot is allocated for, from 0-11 (1-12)
Assigned = the ID currently assigned

Assigned is taken from the TeamBuilderContext.
*/

import { useTeamBuilder } from '@/src/team/TeamBuilderContext';
import { Sinner } from '@/src/types/units';
import React from 'react'

function TeamSlot({ sinner }: {sinner: Sinner}) {
  const { teamSlots, clearSlot } = useTeamBuilder();
  const assigned = teamSlots[sinner];

  const sinnerBox = "bg-amber-600 p-3 grid grid-cols-1 gap-2 w-full rounded text-center"
  const sinnerImage = ""

  return (
    <div className={sinnerBox}>
      {/* Sinner Name */}
      <p className="text-2xl mx-auto my-auto">{sinner}</p>

      {/* Sinner Image */}
      <div className="block mx-auto w-1/2">
        {assigned ? (
          // If assigned, make the image clickable to remove the ID.
          <button className="hover:opacity-80 active:opacity-60" onClick={() => clearSlot(sinner)}>
            <img src={assigned?.imageUrl} className="rounded"></img>
          </button>
          
        )
        :
        // (PlaceHolder) if not assigned, default to sinner's LCB id image (YI SANG)
        <img src={"sinnerCards/lcb_yisang.png"} className="rounded"/>}
        

      </div>
      
      
      {/* Sinner ID Name */}
      <div className="mx-auto my-auto">
            {assigned ? assigned.name : 'LCB Sinner'}
        </div>
      
      {/* Clear Button (only visible if an ID is equipped) */}
      {/* {assigned ? (
                <button className="rounded px-2 py-1 bg-neutral-700 hover:bg-neutral-500 active:opacity-60"
                onClick={() => clearSlot(sinner)}>Clear</button>
            ) : null} */}
      
      
    </div>
  )
}

export default TeamSlot