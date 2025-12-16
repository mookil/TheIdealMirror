/* The main page of "TheIdealMirror"

Author: Mikael Ly

This is a Team Builder / Collection tracker made for the Limbus Company game.
The features are:
    - Collection Tracking with easy-to-click toggleable collection items
    - Team Building with simple on-click team management
    - Sharing through Share Links
    - Login with google OAuth and email verification
    - Supabase integration (nothing implemented from supabase database yet though)

An overview of how this system works is that it reads in a set data of Sinner ID's 
from the UNITS array over in src/data/units.ts . 

Each identity (and eventually EGO) is a UnitType, defined in src/types/units.ts . 

This page utilizes the TeamBuilderContext.tsx in src/team/TeamBuilderContext to 
handle integration with Collection + Team Building.

Utilizes supabase through the AuthProvider. (only used for login rn though)

This page tracks owned collection items using a Record<string, boolean>, where 
string = id, boolean = owned/unowned. 
Team Building is handled + tracked by the TeamBuilderContext.tsx.

There are plans to allow the ability to access this site as a
RESTful API, so you can get the info of Identities + EGO's, but 
currently out of my timeframe.

*/
'use client'

import CollectionCard from '@/components/appComponents/CollectionCard'
import TeamSlot from '@/components/appComponents/TeamSlot'
import React, { useEffect, useMemo, useState } from 'react'
import { UNITS } from '@/src/data/units'
import { UnitItem, UnitType, Sinner, SINNERS } from '@/src/types/units'
import { useTeamBuilder } from '@/src/team/TeamBuilderContext'
import TeamSidebar from '@/components/appComponents/TeamSidebar'
import { buildShareParams, applyShareParams } from '@/src/team/ShareLinkBuilder'

// unique data types
type OwnedMap = Record<string, boolean>; // sort of a dictionary detailing which id's are owned
type Rarity = '0' | '00' | '000';
type OwnedFilterType = 'all' | 'owned' | 'unowned';
type SinnerFilter = Sinner | 'all'

function Home() {
    const [owned, setOwned] = useState<OwnedMap>({}); // a list of all units, along with boolean detailing whether they're owned
    //const [type, setType] = useState<UnitType | 'all'>('all'); // Used for differentiating between Identity + EGO, but I don't have enough time to include both
    const [sinnerSort, setSinnerSort] = useState<SinnerFilter>('all'); // filter to sort by specific Sinners
    const [rarity, setRarity] = useState<Rarity | 'all'>('all'); // filter to sort by rarity
    const [ownedFilter, setOwnedFilter] = useState<OwnedFilterType>('all') // filter to sort by owned, unowned, or all

    const { teamSlots, setTeamSlots } = useTeamBuilder(); // team slots handler

    // look up units by ID
    const unitsById = useMemo(() => {
        const m: Record<string, UnitItem> = {};
        UNITS.forEach(u => { m[u.id] = u; });
        return m;
    }, [])

    // build a share link and copy it to clipboard
    const copyShareLink = async () => {
        const { o, t } = buildShareParams(owned, teamSlots, SINNERS);
        const base = `${window.location.origin}${window.location.pathname}`;
        const url = new URL(base);
        url.searchParams.set('o', o);
        url.searchParams.set('t', t);
        await navigator.clipboard.writeText(url.toString());
        alert('Share link copied to clipboard!')
    }

    // Function for CollectionCard to toggle owned/unowned
    const toggleOwned = (id: string) => {
        setOwned(prev => {
            const next = { ...prev };
            if (next[id]) {
                delete next[id];
            } else {
                next[id] = true;
            }
            return next;
        })
    }

    // useEffect to load collection + loadout from URL on first load
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.has('o') || params.has('t')) {
            applyShareParams(params, setOwned, setTeamSlots, SINNERS, unitsById);
        }
    }, [])

    // debug function, log the record of owned items
    useEffect(() => {
        console.log(owned)
    }, [owned])

    // Filter list by criteria
    const filtered = useMemo(() => {
        return UNITS.filter(item => {
            // Sinner filter
            const matchSinner = sinnerSort === 'all' || (item.sinner === sinnerSort);
            // Rarity filter
            const matchRarity = rarity === 'all' || (item.type === 'identity' && item.rarity === rarity);

            // Owned filter
            const isOwned = !!owned[item.id];
            const matchOwned =
                ownedFilter === 'all' ||
                (ownedFilter === 'owned' && isOwned) ||
                (ownedFilter === 'unowned' && !isOwned);

            // return all results that pass the filters
            return matchSinner && matchRarity && matchOwned;
        });
    }, [sinnerSort, rarity, ownedFilter, owned])


  return (
        <div className="mx-auto">
            {/* The sidebar, currently just the Begin Select button */}
            <TeamSidebar/> 
        {/* Header Area */}
        <div className="bg-gray-900 rounded-2xl p-3">
            <h1 className="text-3xl text-center font-bold">The Ideal Mirror</h1>
            <h1 className="text-center">~ Limbus Company Tool ~</h1>
        </div>

        {/* Team Loadout Area */}
        <div className="bg-gray-900 rounded-2xl p-3 mt-10 m-20 mb-5 text-center">
            <h1 className="text-2xl text-center">Team Loadout</h1>
            
            {/* Flex Box Container */}
            <div className="grid grid-cols-6 gap-3 p-3">
                {SINNERS.map(sinner => (
                    <TeamSlot key={sinner} sinner={sinner}/>
                ))}
            </div>

            {/* Generate Share Link Button */}
            <button className="bg-gray-500 text-center rounded-lg px-5 m-10 border border-gray-400 hover:bg-gray-400 active:bg-gray-700"
                    onClick={copyShareLink}>
                Generate Share Link
            </button>

            {/* Affinities */}
            {/* Going to be unimplemented for a bit. */}
            {/* Reasoning: i'd have to go through each ID and manually input affinities, i'm not doing that within my time period*/}
            {/* <div>
                <h1 className="underline text-2xl">Sin Affinities</h1>
                <p>Wrath: x2/5</p>
                <p>Lust: x6/8</p>
                <p>Sloth: x6/8</p>
                <p>Gluttony: x6/9</p>
                <p>Gloom: x6/7</p>
                <p>Pride: x6/7</p>
                <p>Envy: x6/7</p>

            </div> */}

        </div>
        

        {/* Collection Area */}
        <div className="bg-gray-900 rounded-2xl p-3 mt-10 m-20">
            <h1 className="text-2xl text-center">Collection</h1>
            {/* Filter Options will go here */}
            <div className="">
                {/* Search Bar */}

                
                {/* Sinner Filter */}
                <label>Sinner Filter</label>
                <select
                    value={sinnerSort}
                    onChange={(e) => setSinnerSort(e.target.value as any)}
                    className="rounded border p-1 m-1">
                        <option value="all" className="text-black">All</option>
                        <option value="YiSang" className="text-black">Yi Sang</option>
                        <option value="Faust" className="text-black">Faust</option>
                        <option value="DonQuixote" className="text-black">DonQuixote</option>
                        <option value="Ryoshu" className="text-black">Ryoshu</option>
                        <option value="Meursault" className="text-black">Meursault</option>
                        <option value="HongLu" className="text-black">HongLu</option>
                        <option value="Heathcliff" className="text-black">Heathcliff</option>
                        <option value="Ishmael" className="text-black">Ishmael</option>
                        <option value="Rodion" className="text-black">Rodion</option>
                        <option value="Sinclair" className="text-black">Sinclair</option>
                        <option value="Outis" className="text-black">Outis</option>
                        <option value="Gregor" className="text-black">Gregor</option>
                </select>

                {/* Rarity Filter */}
                <label>Rarity Filter</label>
                <select
                    value={rarity}
                    onChange={(e) => setRarity(e.target.value as any)}
                    className="rounded border p-1 m-1">
                        <option value="all" className="text-black">All</option>
                        <option value="0" className="text-black">0</option>
                        <option value="00" className="text-black">00</option>
                        <option value="000" className="text-black">000</option>
                </select>

                {/* Owned Filter */}
                <label>Owned Filter</label>
                <select
                    value={ownedFilter}
                    onChange={(e) => setOwnedFilter(e.target.value as any)}
                    className="rounded border p-1 m-1">
                        <option value="all" className="text-black">All</option>
                        <option value="owned" className="text-black">Owned</option>
                        <option value="unowned" className="text-black">Unowned</option>
                </select>

            </div>

            {/* Collection Units */}
            <div className="gap-2">
                {filtered.map(item => (
                <CollectionCard
                key={item.id}
                item={item}
                owned={!!owned[item.id]}
                onToggle={toggleOwned}
                />
                ))}
            </div>
        </div>

        {/* Footer Area */}
        <div className="bg-gray-900 rounded-2xl p-3 mt-10 text-center">
            <h1 className="text-2xl">About</h1>
            <p >This site is meant for the game Limbus Company.</p>
            <p>Anything from this website is not affiliated with ProjectMoon.</p>
            <p>Currently, the data is not up-to-date with all Limbus Company assets.</p>
            <p>All the data is currently place-holders.</p>
            <br></br>
            <h1 className="text-2xl">How to use</h1>
            <p>To use this app, click on any of the Collection Items to toggle them as owned.</p>
            <p>To build a team, press the top left "Begin Select" button.</p>
            <p>While "Begin Select" is toggled, you can click on any ID in the collection to build a team.</p>
            <p>To cancel and go back to toggling owned Identities, press "Cancel Select".</p>
            <br></br>
            <h1 className="text-2xl">How to save/load</h1>
            <p>To save your current collection + loadout, press the Generate Share Link button.</p>
            <p>It will copy your state down into a link that will copy to your clipboard.</p>
            <p>To load it back in, just paste it into your browser and go to the link.</p>

        </div>
    </div>
    
  )
}

export default Home