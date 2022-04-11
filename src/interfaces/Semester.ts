import { Course } from "./Course";

export type SemesterSession =
    | "winter"
    | "spring"
    | "summer1"
    | "summer2"
    | "summer3"
    | "fall";

export interface Semester {
    id: number;
    courses: Course[];
    session: SemesterSession;
    year: number;
}
