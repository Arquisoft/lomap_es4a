import Author from "./Author";

class Review {
    author: Author;
    reviewRating: number;
    datePublished: number;
    reviewBody:string;

    constructor(author: Author, reviewRating: number, date: number = Date.now(),reviewBody:string)
    {
        this.author = author;
        this.reviewRating = reviewRating;
        this.datePublished=date;
       this.reviewBody=reviewBody;
    }
}

export default Review;