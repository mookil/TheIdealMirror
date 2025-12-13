// The main page of "TheIdealMirror"
'use client'

import CollectionCard from '@/components/appComponents/CollectionCard'
import TeamSlot from '@/components/appComponents/TeamSlot'
import React, { useEffect, useMemo, useState } from 'react'
import { UNITS } from '@/src/data/units'
import { UnitItem, UnitType } from '@/src/types/units'

// sort of a dictionary detailing which id's are owned
type OwnedMap = Record<string, boolean>;
type Rarity = '0' | '00' | '000';
type OwnedFilterType = 'all' | 'owned' | 'unowned';

function Home() {
    const [owned, setOwned] = useState<OwnedMap>({});
    const [query, setQuery] = useState('');
    //const [type, setType] = useState<UnitType | 'all'>('all');
    const [rarity, setRarity] = useState<Rarity | 'all'>('all');
    const [ownedFilter, setOwnedFilter] = useState<OwnedFilterType>('all')

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

    // debug function, log the record of owned items
    useEffect(() => {
        console.log(owned)
    }, [owned])

    // Filter list
    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();

        return UNITS.filter(item => {
            // Rarity filter
            const matchRarity = rarity === 'all' || (item.type === 'identity' && item.rarity === rarity);

            // Owned filter
            const isOwned = !!owned[item.id];
            const matchOwned =
                ownedFilter === 'all' ||
                (ownedFilter === 'owned' && isOwned) ||
                (ownedFilter === 'unowned' && !isOwned);

            return matchRarity && matchOwned;
        });
    }, [rarity, ownedFilter, owned])


  return (
    <div className="text-center">
        {/* Header Area */}
        <div className="bg-gray-900 rounded-2xl p-3">
            <h1 className="text-3xl text-center font-bold">The Ideal Mirror</h1>
            <h1 className="text-center">~ Limbus Company Tool ~</h1>
        </div>

        {/* Team Loadout Area */}
        <div className="bg-gray-900 rounded-2xl p-3 mt-10 m-20">
            <h1 className="text-2xl text-center">Team Loadout</h1>
            <p>~ Currently not implemented ~</p>
            {/* Flex Box Container Temporary */}
            <div className="flex">
                <TeamSlot identityName={"Yi Sang"} image={"sinnerCards/lcb_yisang.png"}/>
                <TeamSlot identityName={"Faust"} image={""}/>
                <TeamSlot identityName={"Don Quixote"} image={""}/>
                <TeamSlot identityName={"Ryoshu"} image={""}/>
                <TeamSlot identityName={"Meursault"} image={""}/>
                <TeamSlot identityName={"Hong Lu"} image={""}/>
            </div>
            <div className="flex">
                <TeamSlot identityName={"Heathcliff"} image={""}/>
                <TeamSlot identityName={"Ishmael"} image={""}/>
                <TeamSlot identityName={"Rodion"} image={""}/>
                <TeamSlot identityName={"Sinclair"} image={""}/>
                <TeamSlot identityName={"Outis"} image={""}/>
                <TeamSlot identityName={"Gregor"} image={""}/>
            </div>

            {/* Affinities */}
            <div>
                <h1 className="underline text-2xl">Sin Affinities</h1>
                <p>Wrath: x2/5</p>
                <p>Lust: x6/8</p>
                <p>Sloth: x6/8</p>
                <p>Gluttony: x6/9</p>
                <p>Gloom: x6/7</p>
                <p>Pride: x6/7</p>
                <p>Envy: x6/7</p>

            </div>

        </div>

        {/* Collection Area */}
        <div className="bg-gray-900 rounded-2xl p-3 mt-10 m-20">
            <h1 className="text-2xl text-center">Collection</h1>
            {/* Filter Options will go here */}
            <div className="">
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

        </div>
    </div>
  )
}

export default Home