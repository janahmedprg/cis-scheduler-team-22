import { Section } from "./Section";

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
    id: number; //unique number being given
    name: string; //Actual course name (ex: Data structures)
    descr: string;
    credits: number;
    prereqs: string[];
    restrict: string;
    breadth: string[];
    typ: string[];
    //additional attributes to be added to classes
    code: string; //Given course code (ex: CISC210)
    requirementsFulfilled: string[];
    sections: Section[];
}

export function convertCourse(course: ImportCourse): Course {
    return {
        id: 0,
        name: course.name,
        descr: course.descr,
        credits: parseInt(course.credits[course.credits.length - 1]) || 0,
        prereqs: course.preReq === "" ? [] : course.preReq.split(","),
        breadth: course.breadth === "" ? [] : course.breadth.split(","),
        restrict: course.restrict,
        typ: course.typ === "" ? [] : course.typ.split(","),
        code: course.code,
        requirementsFulfilled: [],
        sections: []
    };
}
