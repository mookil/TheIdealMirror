/*
TeamSlot.tsx

This represents a Sinner in the Team Loadout.
Should have an image + name.
*/

import React from 'react'

type props = {
  identityName: String;
  image: String;

}

function TeamSlot({identityName, image}: props) {
  const sinnerBox = "bg-amber-500 flex-1 m-1 pt-10 pb-10"

  return (
    <div className={sinnerBox}>
      <p>{identityName}</p>
    </div>
  )
}

export default TeamSlot