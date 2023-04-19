export type User = {
    name:string;
    email:string;
}

export type Point = {
    id: string;
    name: string;
    category: string;
    latitude: number;
    longitude: number;
    description: string;
    comments: string[];
    reviewScore: number;
    date: number;
}