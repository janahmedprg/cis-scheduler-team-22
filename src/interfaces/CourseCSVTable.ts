import { Course } from "./Course";
import { DegreePlan } from "./DegreePlan";
import { Semester, SemesterSession } from "./Semester";

export interface CourseCSVTable {
    code: string; //Given course code (ex: CISC210)
    name: string; //Actual course name (ex: Data structures)
    descr: string;
    credits: number;
    restrict: string;
    CAHBreadth: number;
    HCCBreadth: number;
    SBSBreadth: number;
    ForeignLanguage: number;
    LabScience: number;
    CSCore: number;
    TechnicalElective: number;
    CSCapstone: number;
    session: SemesterSession;
    year: number;
    planName: string;
}

export function createCSVTable(plan: DegreePlan): CourseCSVTable[] {
    return plan.semesters.reduce(
        (result: CourseCSVTable[], semester: Semester): CourseCSVTable[] => {
            return [
                ...result,
                ...semester.courses.reduce(
                    (
                        courseTable: CourseCSVTable[],
                        course: Course
                    ): CourseCSVTable[] => {
                        return [
                            ...courseTable,
                            {
                                code: course.code,
                                name: course.name,
                                descr: course.descr,
                                credits: course.credits,
                                restrict: course.restrict,
                                CAHBreadth:
                                    course.requirementsFulfilled.CAHBreadth,
                                HCCBreadth:
                                    course.requirementsFulfilled.HCCBreadth,
                                SBSBreadth:
                                    course.requirementsFulfilled.SBSBreadth,
                                ForeignLanguage:
                                    course.requirementsFulfilled
                                        .ForeignLanguage,
                                LabScience:
                                    course.requirementsFulfilled.LabScience,
                                CSCore: course.requirementsFulfilled.CSCore,
                                TechnicalElective:
                                    course.requirementsFulfilled
                                        .TechnicalElective,
                                CSCapstone:
                                    course.requirementsFulfilled.CSCapstone,
                                session: semester.session,
                                year: semester.year,
                                planName: plan.name
                            }
                        ];
                    },
                    []
                )
            ];
        },
        []
    );
}
