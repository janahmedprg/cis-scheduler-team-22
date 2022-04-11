import { Section } from "./Section";

export interface Course {
    id: number;
    name: string;
    descr: string;
    credits: number;
    prereqs: string[];
    restrict: string[];
    breadth: string[];
    type: string[];
    //additional attributyes
    code: string;
    requirementsFulfilled: string[];
    sections: Section[];
}
