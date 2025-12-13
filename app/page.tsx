// The main page of "TheIdealMirror"
'use client'

import CollectionCard from '@/components/appComponents/CollectionCard'
import TeamSlot from '@/components/appComponents/TeamSlot'
import React, { useEffect, useState } from 'react'
import { UNITS } from '@/src/data/units'

// sort of a dictionary detailing which id's are owned
type OwnedMap = Record<string, boolean>;

function Home() {

    const collectionBox = "bg-amber-600 flex-1 m-1 pt-2 pb-2"

    const [owned, setOwned] = useState<OwnedMap>({});

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

        <div className="bg-gray-900 rounded-2xl p-3 mt-10 m-20">
            <h1 className="text-2xl text-center">Collection Test</h1>
            <div className="gap-2">
                {UNITS.map(item => (
                <CollectionCard
                key={item.id}
                item={item}
                owned={!!owned[item.id]}
                onToggle={toggleOwned}
                />
                ))}
            </div>
            
            <div>
                
            </div>
        </div>

        {/* Collection Area */}
        <div className="bg-gray-900 rounded-2xl p-3 mt-10 m-20">
            <h1 className="text-2xl text-center">Collection</h1>
            <div className="flex">
                <div className={collectionBox}>1</div> {/* This is a cube. */}
                <div className={collectionBox}>1</div> {/* This is a cube. */}
                <div className={collectionBox}>1</div> {/* This is a cube. */}
                <div className={collectionBox}>1</div> {/* This is a cube. */}
                <div className={collectionBox}>1</div> {/* This is a cube. */}
                <div className={collectionBox}>1</div> {/* This is a cube. */}
                <div className={collectionBox}>1</div> {/* This is a cube. */}
                <div className={collectionBox}>1</div> {/* This is a cube. */}
                <div className={collectionBox}>1</div> {/* This is a cube. */}
                <div className={collectionBox}>1</div> {/* This is a cube. */}
            </div>
            <div className="flex">
                <div className={collectionBox}>1</div> {/* This is a cube. */}
                <div className={collectionBox}>1</div> {/* This is a cube. */}
                <div className={collectionBox}>1</div> {/* This is a cube. */}
                <div className={collectionBox}>1</div> {/* This is a cube. */}
                <div className={collectionBox}>1</div> {/* This is a cube. */}
                <div className={collectionBox}>1</div> {/* This is a cube. */}
                <div className={collectionBox}>1</div> {/* This is a cube. */}
                <div className={collectionBox}>1</div> {/* This is a cube. */}
                <div className={collectionBox}>1</div> {/* This is a cube. */}
                <div className={collectionBox}>1</div> {/* This is a cube. */}
            </div>
            <div className="flex">
                <div className={collectionBox}>1</div> {/* This is a cube. */}
                <div className={collectionBox}>1</div> {/* This is a cube. */}
                <div className={collectionBox}>1</div> {/* This is a cube. */}
                <div className={collectionBox}>1</div> {/* This is a cube. */}
                <div className={collectionBox}>1</div> {/* This is a cube. */}
                <div className={collectionBox}>1</div> {/* This is a cube. */}
                <div className={collectionBox}>1</div> {/* This is a cube. */}
                <div className={collectionBox}>1</div> {/* This is a cube. */}
                <div className={collectionBox}>1</div> {/* This is a cube. */}
                <div className={collectionBox}>1</div> {/* This is a cube. */}
            </div>

            
        </div>

        {/* Footer Area */}
        <div className="bg-gray-900 rounded-2xl p-3 mt-10">
            <h1 className="text-2xl text-center">About</h1>
            <p>This site is meant for the game Limbus Company.</p>
            <p>Anything from this website is not affiliated with ProjectMoon.</p>
            <p>Currently, the data is not up-to-date with all Limbus Company assets.</p>
            <p>All the data is currently place-holders.</p>

        </div>
    </div>
  )
}

export default Home