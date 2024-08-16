import { Timestamp } from "firebase/firestore";
export type LinkDetails = {
    id: string
    name: string
    link: string
    shortLink: string
    clicks: number
    createdAt: Timestamp
    customSlug?: string
}

export type CreateLink = Omit<LinkDetails, 'id'>;