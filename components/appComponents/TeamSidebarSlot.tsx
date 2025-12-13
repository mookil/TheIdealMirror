/*
Team Sidebar Slot
[unimplemented currently]

Smaller version of team slot meant for the sidebar.
planned to have a sidebar version but i might just stick with the big icons
*/
'use client'

import { useTeamBuilder } from '@/src/team/TeamBuilderContext'
import { Sinner } from '@/src/types/units'
import React from 'react'

function TeamSidebarSlot({ sinner }: { sinner: Sinner }) {
    const { teamSlots, clearSlot } = useTeamBuilder();
    const assigned = teamSlots[sinner];

  return (
    <div className="rounded border p-1">
        <div className="flex items-center justify-between">
            <p>{sinner}</p>
            {assigned ? (
                <button className="rounded px-2 py-1 bg-neutral-700"
                onClick={() => clearSlot(sinner)}>Clear</button>
            ) : null}
        </div>
        <div className="mt-1">
            {assigned ? assigned.name : 'Empty'}
        </div>
    </div>
  )
}

export default TeamSidebarSlot