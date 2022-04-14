import { Section } from "./Section";

export interface Course {
    id: number; //unique number being given
    name: string; //Actual course name (ex: Data structures)
    descr: string;
    credits: number;
    prereqs: string[];
    restrict: string[];
    breadth: string[];
    type: string[];
    //additional attributes to be added to classes
    code: string; //Given course code (ex: CISC210)
    requirementsFulfilled: string[];
    sections: Section[];
}
