import { Semester } from "./Semester";

export interface DegreePlan {
    id: string;
    name: string;
    semesters: Semester[];
}
