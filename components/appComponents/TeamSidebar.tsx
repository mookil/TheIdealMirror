/*
Team Sidebar

Meant to show off a smaller version of the teamslots, but right now only there so you can select to open team selection
*/

"use client"

import { useTeamBuilder } from "@/src/team/TeamBuilderContext"
import { SINNERS } from "@/src/types/units";
import TeamSidebarSlot from "./TeamSidebarSlot";

export default function TeamSidebar() {
    const {isOpen, open, close} = useTeamBuilder();

    return (
        <>
        {/* Toggle Button */}
        <button onClick={isOpen ? close: open}
        className="fixed left-0 m-5 z-60 border p-2 rounded hover:opacity-60 active:opacity-90">
            {isOpen ? 'Cancel Select' : 'Begin Select'}
        </button>

        {/* Sidebar */}
        <div
            className={`fixed top-0 left-0 z-50
                transform transition-transform duration-200 ${isOpen ? 'translate-y-5 translate-x-40' : '-translate-y-full translate-x-40'}`}
            >
                <div className="p-3 border">
                    <h1>Team Builder</h1>
                    <p>Select a slot and click on a unit.</p>
                </div>

        </div>
        </>
    )
}