
class Point {
    id: string;
    name: string;
    category: string;
    latitude: number;
    longitude: number;
    description: string;
    comments: string[];
    reviewScore: number;
    date: number;

    constructor(
        id: string, name: string, category: string, latitude: number, longitude: number, description: string = "",
        comments: string[] = [], reviewScore: number = 0, date: number = Date.now())
    {
        this.id = id;
        this.name = name;
        this.category = category;
        this.latitude = latitude;
        this.longitude = longitude;
        this.description = description;
        this.comments = comments;
        this.reviewScore = reviewScore;
        this.date = date;
    }
}

export default Point;