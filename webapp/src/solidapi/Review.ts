import Author from "./Author";
import ReviewRating from "./ReviewRating";

class Review {
    author: Author;
    reviewRating: ReviewRating;
    datePublished: number;
    reviewBody:string;

    constructor(author: Author, reviewRating: ReviewRating, date: number = Date.now(),reviewBody:string)
    {
        this.author = author;
        this.reviewRating = reviewRating;
        this.datePublished=date;
        this.reviewBody=reviewBody;
    }
}

export default Review;