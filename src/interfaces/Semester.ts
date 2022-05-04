import { Course } from "./Course";

export type SemesterSession = "winter" | "spring" | "summer" | "fall";

export const sessionTime: Record<SemesterSession, number> = {
    winter: 0,
    spring: 1,
    summer: 2,
    fall: 3
};

export interface Semester {
    id: number;
    courses: Course[];
    session: SemesterSession;
    year: number;
}

export function sortSemesters(semesters: Semester[]): Semester[] {
    // create a copy of semesters because sort mutates
    const newSemesters: Semester[] = semesters.map(
        (semester: Semester): Semester => ({
            ...semester,
            courses: semester.courses.map(
                (course: Course): Course => ({
                    ...course,
                    typ: [...course.typ],
                    prereqs: [...course.prereqs]
                })
            )
        })
    );
    newSemesters.sort((a: Semester, b: Semester): number => {
        if (a.year > b.year) {
            return 1;
        }
        if (a.year < b.year) {
            return -1;
        }
        if (sessionTime[a.session] > sessionTime[b.session]) {
            return 1;
        }
        if (sessionTime[a.session] < sessionTime[b.session]) {
            return -1;
        }
        return 0;
    });
    return newSemesters;
}
