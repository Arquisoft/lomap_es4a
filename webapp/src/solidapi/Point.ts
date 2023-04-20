import Review from "./Review";

class Point {
    id: string;
    name: string;
    category: string;
    latitude: number;
    longitude: number;
    description: string;
    //comments: string[];
    //reviewScore: number;
    logo:string[];
    date: number;
    review:Review[];
    

    constructor(
        id: string, name: string, category: string, latitude: number, longitude: number, description: string = "",
        /*comments: string[] = [], reviewScore: number = 0,*/logo:string[]=[], date: number = Date.now(),review:Review[]=[])
    {
        this.id = id;
        this.name = name;
        this.category = category;
        this.latitude = latitude;
        this.longitude = longitude;
        this.description = description;
        //this.comments = comments;
        //this.reviewScore = reviewScore;
        this.logo=logo;
        this.date = date;
        this.review=review;
    }

    public getId(): string {
        return this.id;
    }

}

export default Point;