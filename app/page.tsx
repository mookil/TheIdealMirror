// The main page of "TheIdealMirror"
'use client'

import CollectionCard from '@/components/appComponents/CollectionCard'
import TeamSlot from '@/components/appComponents/TeamSlot'
import React, { useEffect, useMemo, useState } from 'react'
import { UNITS } from '@/src/data/units'
import { UnitItem, UnitType, Sinner, SINNERS } from '@/src/types/units'
import { TeamBuilderProvider, useTeamBuilder } from '@/src/team/TeamBuilderContext'
import TeamSidebar from '@/components/appComponents/TeamSidebar'
import { buildShareParams, applyShareParams } from '@/src/team/ShareLinkBuilder'

// sort of a dictionary detailing which id's are owned
type OwnedMap = Record<string, boolean>;
type Rarity = '0' | '00' | '000';
type OwnedFilterType = 'all' | 'owned' | 'unowned';
type SinnerFilter = Sinner | 'all'

function Home() {
    const [owned, setOwned] = useState<OwnedMap>({});
    const [query, setQuery] = useState('');
    //const [type, setType] = useState<UnitType | 'all'>('all'); // Used for differentiating between Identity + EGO, but I don't have enough time to include both
    const [sinnerSort, setSinnerSort] = useState<SinnerFilter>('all');
    const [rarity, setRarity] = useState<Rarity | 'all'>('all');
    const [ownedFilter, setOwnedFilter] = useState<OwnedFilterType>('all')

    const { teamSlots, setTeamSlots } = useTeamBuilder();

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

    // Filter list
    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();

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
            


            return matchSinner && matchRarity && matchOwned;
        });
    }, [sinnerSort, rarity, ownedFilter, owned])


  return (
        <div className="text-center">
            <TeamSidebar/>
        {/* Header Area */}
        <div className="bg-gray-900 rounded-2xl p-3">
            <h1 className="text-3xl text-center font-bold">The Ideal Mirror</h1>
            <h1 className="text-center">~ Limbus Company Tool ~</h1>
        </div>

        {/* Team Loadout Area */}
        <div className="bg-gray-900 rounded-2xl p-3 mt-10 m-20 mb-5">
            <h1 className="text-2xl text-center">Team Loadout</h1>
            
            {/* Flex Box Container Temporary */}
            <div className="grid grid-cols-6 gap-3">
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
                {/* Rarity Filter */}
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
        <div className="bg-gray-900 rounded-2xl p-3 mt-10">
            <h1 className="text-2xl text-center">About</h1>
            <p>This site is meant for the game Limbus Company.</p>
            <p>Anything from this website is not affiliated with ProjectMoon.</p>
            <p>Currently, the data is not up-to-date with all Limbus Company assets.</p>
            <p>All the data is currently place-holders.</p>
            <br></br>
            <p>To use this app, click on any of the Collection Items to toggle them as owned.</p>
            <p>To build a team, press the top left "Begin Select" button.</p>
            <p>While "Begin Select" is toggled, you can click on any ID in the collection to build a team.</p>
            <p>To cancel and go back to toggling owned Identities, press "Cancel Select".</p>

        </div>
    </div>
    
  )
}

export default Home