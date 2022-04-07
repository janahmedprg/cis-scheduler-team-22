import { Degree } from "./Degree";
import { Semester } from "./Semester";

export interface DegreePlan {
    id: number;
    degree: Degree;
    name: string;
    semesters: Semester[];
}
