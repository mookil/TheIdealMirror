import React from 'react'
// The main page of "TheIdealMirror"



function Home() {
    const sinnerBox = "bg-amber-500 flex-1 m-1 pt-10 pb-10"

    const collectionBox = "bg-amber-600 flex-1 m-1 pt-2 pb-2"
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
                <div className={sinnerBox}>Yi Sang</div> {/* This is a cube. */}
                <div className={sinnerBox}>Faust</div> {/* This is a cube. */}
                <div className={sinnerBox}>Don Quixote</div> {/* This is a cube. */}
                <div className={sinnerBox}>Ryoshu</div> {/* This is a cube. */}
                <div className={sinnerBox}>Meursault</div> {/* This is a cube. */}
                <div className={sinnerBox}>Hong Lu</div> {/* This is a cube. */}
            </div>
            <div className="flex">
                <div className={sinnerBox}>Heathcliff</div> {/* This is a cube. */}
                <div className={sinnerBox}>Ishmael</div> {/* This is a cube. */}
                <div className={sinnerBox}>Rodion</div> {/* This is a cube. */}
                <div className={sinnerBox}>Sinclair</div> {/* This is a cube. */}
                <div className={sinnerBox}>Outis</div> {/* This is a cube. */}
                <div className={sinnerBox}>Gregor</div> {/* This is a cube. */}
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