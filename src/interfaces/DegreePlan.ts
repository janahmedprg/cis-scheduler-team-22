import { Degree } from "./Degree";
import { Semester } from "./Semester";

export interface DegreePlan {
    id: string;
    degree: Degree;
    name: string;
    semesters: Semester[];
}
