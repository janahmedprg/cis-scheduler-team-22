import { EMPTY_REQUIREMENTS, Requirements } from "./Requirements";

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

export interface Course {
    code: string; //Given course code (ex: CISC210)
    name: string; //Actual course name (ex: Data structures)
    descr: string;
    credits: number;
    prereqs: string[];
    restrict: string;
    typ: string[];
    //additional attributes to be added to classes
    //degreeCategory: string[];
    id: number;
    requirementsFulfilled: Requirements;
}

export function convertCourse(course: ImportCourse): Course {
    let convertedCourse: Course = {
        id: 0,
        name: course.name,
        descr: course.descr,
        credits: parseInt(course.credits[course.credits.length - 1]) || 0,
        prereqs: course.preReq === "" ? [] : course.preReq.split(","),
        restrict: course.restrict,
        typ: [],
        code: course.code,
        requirementsFulfilled: EMPTY_REQUIREMENTS
    };
    if (course.typ.toLowerCase().includes("winter")) {
        convertedCourse = {
            ...convertedCourse,
            typ: [...convertedCourse.typ, "winter"]
        };
    }
    if (course.typ.toLowerCase().includes("spring")) {
        convertedCourse = {
            ...convertedCourse,
            typ: [...convertedCourse.typ, "spring"]
        };
    }
    if (course.typ.toLowerCase().includes("fall")) {
        convertedCourse = {
            ...convertedCourse,
            typ: [...convertedCourse.typ, "fall"]
        };
    }
    if (course.typ.toLowerCase().includes("summer")) {
        convertedCourse = {
            ...convertedCourse,
            typ: [...convertedCourse.typ, "summer"]
        };
    }
    if (course.breadth.toLowerCase().includes("behavioral")) {
        convertedCourse = {
            ...convertedCourse,
            requirementsFulfilled: {
                ...convertedCourse.requirementsFulfilled,
                SBSBreadth: convertedCourse.credits
            }
        };
    }
    if (course.breadth.toLowerCase().includes("creative")) {
        convertedCourse = {
            ...convertedCourse,
            requirementsFulfilled: {
                ...convertedCourse.requirementsFulfilled,
                SBSBreadth: convertedCourse.credits
            }
        };
    }
    if (course.breadth.toLowerCase().includes("history")) {
        convertedCourse = {
            ...convertedCourse,
            requirementsFulfilled: {
                ...convertedCourse.requirementsFulfilled,
                SBSBreadth: convertedCourse.credits
            }
        };
    }
    if (CIS_CORE.includes(course.code.replace(/\s/g, ""))) {
        //the replace function removes spaces from the course code, as there is inconsistency as to whether the codes have spaces or not
        convertedCourse = {
            ...convertedCourse,
            requirementsFulfilled: {
                ...convertedCourse.requirementsFulfilled,
                CSCore: convertedCourse.credits
            }
        };
    }
    if (LAB_SCIENCE.includes(course.code.replace(/\s/g, ""))) {
        convertedCourse = {
            ...convertedCourse,
            requirementsFulfilled: {
                ...convertedCourse.requirementsFulfilled,
                LabScience: convertedCourse.credits
            }
        };
    }
    if (FOREIGN_LANGUAGE.includes(course.code.replace(/\s/g, ""))) {
        convertedCourse = {
            ...convertedCourse,
            requirementsFulfilled: {
                ...convertedCourse.requirementsFulfilled,
                ForeignLanguage: convertedCourse.credits
            }
        };
    }
    if (CIS_CAPSTONE.includes(course.code.replace(/\s/g, ""))) {
        convertedCourse = {
            ...convertedCourse,
            requirementsFulfilled: {
                ...convertedCourse.requirementsFulfilled,
                CSCapstone: convertedCourse.credits
            }
        };
    }
    return convertedCourse;
}

export const CIS_CORE: string[] = [
    "CISC106",
    "CISC108",
    "CISC181",
    "CISC210",
    "CISC220",
    "CISC260",
    "CISC275",
    "CISC303",
    "CISC320",
    "MATH210",
    "MATH241"
];
export const LAB_SCIENCE: string[] = [
    "BISC207",
    "BISC208",
    "CHEM103",
    "CHEM104",
    "GEOL105",
    "GEOL107",
    "PHYS207",
    "PHYS208"
];
export const FOREIGN_LANGUAGE: string[] = [
    "ARAB107",
    "CHIN107",
    "FREN107",
    "GREK202",
    "GRMN107",
    "ITAL107",
    "JAPN107",
    "RUSS107",
    "SPAN107",
    "LATN202"
];
export const CIS_CAPSTONE: string[] = [
    "UNIV401",
    "UNIV402",
    "CISC498",
    "CISC499"
];
