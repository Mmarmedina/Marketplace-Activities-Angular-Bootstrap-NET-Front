export interface Review {
    id: number, 
    reviewText: string,   
    author: string,
    date: Date,
    activityId: number | null,
}

export interface ReviewFormatted {
    id: number, 
    reviewText: string,   
    author: string,
    date: string,
    activityId: number | null,
}
