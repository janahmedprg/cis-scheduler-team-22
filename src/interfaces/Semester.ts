import { Course } from "./Course";

export type SemesterSession = "winter" | "spring" | "summer" | "fall";

export const sessionTime: Record<SemesterSession, number> = {
    winter: 0,
    spring: 1,
    summer: 2,
    fall: 3
};

export const maxCredits: Record<SemesterSession, number> = {
    winter: 7,
    spring: 21,
    summer: 14,
    fall: 21
};

export interface Semester {
    id: number;
    courses: Course[];
    session: SemesterSession;
    year: number;
}

export const EMPTY_SEMESTER: Semester = {
    id: 0,
    courses: [],
    session: "winter",
    year: 0
};

export function countCredits(semester: Semester): number {
    return semester.courses.reduce(
        (currentSum: number, course: Course): number =>
            currentSum + course.credits,
        0
    );
}

export function countCreditsArray(semesters: Semester[]): number {
    return semesters.reduce(
        (currentSum: number, semester: Semester): number =>
            currentSum + countCredits(semester),
        0
    );
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
