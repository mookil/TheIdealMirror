/*
TeamBuilderContext

A helper that keeps track of which team slots are active, what is assigned, and how to assign.
*/
'use client'

import React, { useContext, useMemo, useState } from 'react'
import { Sinner, SINNERS, UnitItem } from '../types/units'
import { createContext } from 'react';

type TeamSlots = Record<Sinner, UnitItem | null>;

type TeamBuilderContextType = {
    isOpen: boolean;
    open: () => void;
    close: () => void;

    teamSlots : TeamSlots;
    setTeamSlots: React.Dispatch<React.SetStateAction<TeamSlots>>;

    assignUnitToSlot: (slot: Sinner, unit: UnitItem) => void;
    assignByUnit: (unit: UnitItem) => void;

    clearSlot: (slot: Sinner) => void;
};

const TeamBuilderContext = createContext<TeamBuilderContextType | null>(null);

export function TeamBuilderProvider({ children }: {children: React.ReactNode}) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [teamSlots, setTeamSlots] = useState<TeamSlots>(() =>
        SINNERS.reduce((acc, s) => ({ ...acc, [s]: null}), {} as TeamSlots)
    );

    const open = () => setIsOpen(true);
    const close = () => { setIsOpen(false); 
    }

    // Assign a unit to the slot.
    const assignUnitToSlot = (slot: Sinner, unit: UnitItem) => {
        if (unit.sinner !== slot) {
            return;
        }
        setTeamSlots(prev => ({ ...prev, [slot]: unit}));
    };

    const assignByUnit = (unit: UnitItem) => {
        const slot = unit.sinner as Sinner;
        assignUnitToSlot(slot, unit);
    }

    // Remove the ID from the slot.
    const clearSlot = (slot: Sinner) => {
        setTeamSlots(prev => ({ ...prev, [slot]: null}));
    };

    const value = useMemo(
        () => ({
            isOpen, open, close,
            teamSlots, setTeamSlots,
            assignUnitToSlot, assignByUnit,
            clearSlot
        }),
        [isOpen, teamSlots]
    )

    return (
        <TeamBuilderContext.Provider value={value}>
            {children}
        </TeamBuilderContext.Provider>
    )
}

export const useTeamBuilder = () => {
    const ctx = useContext(TeamBuilderContext);
    if (!ctx) {
        throw new Error('useTeamBuilder must be used within TeamBuilderProvider.')
    }
    return ctx;
}