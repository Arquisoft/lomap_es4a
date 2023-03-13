
class Point {
    id: string;
    latitude: number;
    longitude: number;
    category: string;
    score: number;
    comments: string[];

    constructor(latitude: number, longitude: number, category: string = "", score: number = 0, comments: string[] = []) {
        this.id = Date.now().toString(36) + Math.random().toString(36).substring(2);
        this.latitude = latitude;
        this.longitude = longitude;
        this.category = category;
        this.score = score;
        this.comments = comments;
    }
}

export default Point;