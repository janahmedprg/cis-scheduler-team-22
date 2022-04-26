import { Course } from "./Course";

export type SemesterSession = "winter" | "spring" | "summer" | "fall";

export interface Semester {
    id: number;
    courses: Course[];
    session: SemesterSession;
    year: number;
}
