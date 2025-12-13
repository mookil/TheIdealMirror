/*
Units

This is an interface for Unit types, Identities and EGO's.
Used for organization and as a shape for items.
*/

export type UnitType = 'identity' | 'ego'

export interface UnitItem {
    id: string;                     // unique ID
    name: string;                   // display name
    sinner: string;                 // Sinner item belongs to
    type: UnitType;                 // identity or ego
    rarity?: '0' | '00' | '000'     // rarity for identites
    affinity?: string[];            // optional tag for later (how many skill types this id has)
    status?: string[];              // optional tag for later (what status this can inflict)
    imageUrl?: string;              // thumbnail url if had
}