import { Review } from "./review.interface";
import { Schedule } from "./schedule.interface";

export interface Activity {
    id: number,
    title: string,
    description: string,
    price: number,
    schedule: Schedule[],
    review: Review[]
}
