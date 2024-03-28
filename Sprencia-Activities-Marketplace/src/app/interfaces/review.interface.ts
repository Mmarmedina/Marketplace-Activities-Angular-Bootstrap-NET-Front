export interface Review {
    id: number, 
    reviewText: string,   
    author: string,
    date: Date,
    activityId: number | null,
}
