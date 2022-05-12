import { Course } from "./Course";
import { DegreePlan } from "./DegreePlan";
import { Semester, SemesterSession } from "./Semester";

export interface CourseCSVTable {
    code: string; //0
    name: string; //1
    descr: string; //2
    credits: number; //3
    restrict: string; //4
    CAHBreadth: number; //5
    HCCBreadth: number; //6
    SBSBreadth: number; //7
    ForeignLanguage: number; //8
    LabScience: number; //9
    CSCore: number; //10
    TechnicalElective: number; //11
    CSCapstone: number; //12
    session: SemesterSession; //13
    year: number; //14
    planName: string; //15
    degreeName: string; //16
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
                                planName: plan.name,
                                degreeName: plan.degree.name
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
