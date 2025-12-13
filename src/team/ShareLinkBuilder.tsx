/*
ShareLinkBuilder

This is to help build a sharelink that contains all the saved context for a user.
in short: you can share what identities you have and your current team loadout
*/

import { Sinner, UnitItem } from "../types/units";

// create a parameter for owned collection items + current team loadout
export function buildShareParams(
    owned: Record<string, boolean>,
    teamSlots: Record<Sinner, UnitItem | null>,
    order: readonly Sinner[]
) {
    const ownedIds = Object.keys(owned).filter(id => owned[id]).sort();

    const teamIds = order.map(sinner => {
        const u = teamSlots[sinner];
        return u && u.type === 'identity' ? u.id : '-';
    });

    return {
        o: ownedIds.join('.'),
        t: teamIds.join('.'),
    };
}

// apply and read in owned collection items + current team loadout from the given URL
export function applyShareParams(
    params: URLSearchParams,
    setOwned: React.Dispatch<React.SetStateAction<Record<string, boolean>>>,
    setTeamSlots: React.Dispatch<React.SetStateAction<Record<Sinner, UnitItem | null>>>,
    order: readonly Sinner[],
    unitsById: Record<string, UnitItem>
) {
    const oParam = params.get('o');
    const tParam = params.get('t');

    // read in Owned collection
    if (oParam) {
        const ownedIds = oParam.split('.').filter(Boolean);
        setOwned(() => {
            const next: Record<string, boolean> = {};
            for (const id of ownedIds) {
                next[id] = true;
            }
            return next;
        });
    }

    // read in Team loadout
    if (tParam) {
        const teamIds = tParam.split('.');
        setTeamSlots(prev => {
            const next = { ...prev };
            order.forEach((sinner, idx) => {
                const uid = teamIds[idx];
                if (!uid || uid === '-') {
                    next[sinner] = null;
                    return;
                } 
                
                const unit = unitsById[uid];
                // validate existence, type, and match sinner
                if (unit && unit.type === 'identity' && unit.sinner === sinner) {
                    next[sinner] = unit;
                } else {
                    next[sinner] = null;
                }
            })
            return next;
        })
    }
}