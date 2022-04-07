import { Section } from "./Section";

export interface Course {
    id: number;
    name: string;
    courseNumber: string;
    credits: number;
    prereqs: string[];
    requirementsFulfilled: string[];
    sections: Section[];
}
