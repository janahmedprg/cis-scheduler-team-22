import { Section } from "./Section";

export interface Course {
    code: string; //Given course code (ex: CISC210)
    name: string; //Actual course name (ex: Data structures)
    descr: string;
    credits: number;
    prereqs: string[];
    restrict: string[];
    breadth: string[];
    type: string[];
    //additional attributes to be added to classes
    id: number;
    requirementsFulfilled: string[];
    sections: Section[];
}
