import { EMPTY_REQUIREMENTS, Requirements } from "./Requirements";
import categories from "../courseCategories.json";

const categoryData = categories as Record<string, string[]>;

export interface ImportCourse {
    code: string;
    name: string;
    descr: string;
    credits: string;
    preReq: string;
    restrict: string;
    breadth: string;
    typ: string;
}

export const EMPTY_COURSE: Course = {
    code: "",
    name: "",
    descr: "",
    credits: 0,
    prereqs: [],
    restrict: "",
    typ: [],
    id: 0,
    requirementsFulfilled: EMPTY_REQUIREMENTS
};

export interface Course {
    code: string; //Given course code (ex: CISC210)
    name: string; //Actual course name (ex: Data structures)
    descr: string;
    credits: number;
    prereqs: string[][];
    restrict: string;
    typ: string[];
    //additional attributes to be added to classes
    //degreeCategory: string[];
    id: number;
    requirementsFulfilled: Requirements;
}

export function convertCourse(course: ImportCourse): Course {
    const convertedCourse: Course = {
        id: 0,
        name: course.name,
        descr: course.descr,
        credits: parseInt(course.credits) || 1,
        prereqs: [],
        restrict: course.restrict,
        typ: ["winter", "spring", "summer", "fall"].filter(
            (season: string): boolean =>
                course.typ.toLowerCase().includes(season)
        ),
        code: course.code,
        requirementsFulfilled: EMPTY_REQUIREMENTS
    };
    const newRequirements: Requirements = {
        CAHBreadth: course.breadth.toLowerCase().includes("creative")
            ? convertedCourse.credits
            : 0,
        HCCBreadth: course.breadth.toLowerCase().includes("history")
            ? convertedCourse.credits
            : 0,
        SBSBreadth: course.breadth.toLowerCase().includes("behavioral")
            ? convertedCourse.credits
            : 0,
        ForeignLanguage: categoryData["Foreign Language"].includes(
            course.code.replace(/\s/g, "")
        )
            ? convertedCourse.credits
            : 0,
        LabScience: categoryData["Lab Science"].includes(
            course.code.replace(/\s/g, "")
        )
            ? convertedCourse.credits
            : 0,
        CSCore: categoryData["CISC Core"].includes(
            course.code.replace(/\s/g, "")
        )
            ? convertedCourse.credits
            : 0,
        TechnicalElective: 0,
        CSCapstone: categoryData["CISC Capstone"].includes(
            course.code.replace(/\s/g, "")
        )
            ? convertedCourse.credits
            : 0
    };
    return { ...convertedCourse, requirementsFulfilled: newRequirements };
}
