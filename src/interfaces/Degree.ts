import { EMPTY_REQUIREMENTS, Requirements } from "./Requirements";
import degrees from "../OfficialDegrees.json";

export interface Degree {
    id: number;
    name: string;
    requirements: Requirements;
    requiredCourses: string[][]; //requiremed courses not covered by the requirements field
    requiredCredits: number;
}

export const EMPTY_DEGREE: Degree = {
    id: 0,
    name: "No Degree",
    requirements: EMPTY_REQUIREMENTS,
    requiredCourses: [],
    requiredCredits: 0
};

export const OFFICIAL_DEGREES = degrees as Record<string, Degree>;
