export type Category = {
    id: number;
    name: string;
}

export type Institute = {
    id: number;
    name: string;
}

export type Activity = {
    id: string;
    name: string;
    description: string;
    defaultPoints: number;
    startDate: Date;
    endDate: Date;
    createdAt: Date;
    images: string[];
    creatorId: string;
    category: string;
    institute: string;
}