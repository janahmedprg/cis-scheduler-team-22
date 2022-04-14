import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Course } from "../interfaces/Course";
import { DegreePlan } from "../interfaces/DegreePlan";
import { Semester, SemesterSession } from "../interfaces/Semester";

const EMPTY_COURSE: Course = {
    id: 0,
    name: "New Course",
    descr: "Description",
    credits: 0,
    prereqs: [],
    restrict: [],
    breadth: [],
    type: [],
    code: "CODE",
    requirementsFulfilled: [],
    sections: []
};

export function EditSemester({
    degreePlans,
    degreePlan,
    semester,
    setDegreePlans
}: {
    degreePlans: DegreePlan[];
    degreePlan: DegreePlan;
    semester: Semester;
    setDegreePlans: (plans: DegreePlan[]) => void;
}): JSX.Element {
    const [course] = useState<Course>(EMPTY_COURSE);
    function updateSemesterSession(event: React.ChangeEvent<HTMLInputElement>) {
        const indexOfDegreePlan = degreePlans.findIndex(
            (idxDegPlan: DegreePlan): boolean => idxDegPlan.id === degreePlan.id
        );
        const newSemesterArray = [...degreePlan.semesters];
        const indexOfSemester = newSemesterArray.findIndex(
            (idxSemester: Semester): boolean => idxSemester.id === semester.id
        );
        const newSemester = {
            ...newSemesterArray[indexOfSemester],
            session: event.target.value as SemesterSession
        };
        newSemesterArray.splice(indexOfSemester, 1, newSemester);
        const newDegreePlan = { ...degreePlan, semesters: newSemesterArray };
        const newDegreePlans = [...degreePlans];
        newDegreePlans.splice(indexOfDegreePlan, 1, newDegreePlan);
        setDegreePlans(newDegreePlans);
    }
    function updateSemesterYear(event: React.ChangeEvent<HTMLInputElement>) {
        const indexOfDegreePlan = degreePlans.findIndex(
            (idxDegPlan: DegreePlan): boolean => idxDegPlan.id === degreePlan.id
        );
        const newSemesterArray = [...degreePlan.semesters];
        const indexOfSemester = newSemesterArray.findIndex(
            (idxSemester: Semester): boolean => idxSemester.id === semester.id
        );
        const newSemester = {
            ...newSemesterArray[indexOfSemester],
            year: parseInt(event.target.value)
        };
        newSemesterArray.splice(indexOfSemester, 1, newSemester);
        const newDegreePlan = { ...degreePlan, semesters: newSemesterArray };
        const newDegreePlans = [...degreePlans];
        newDegreePlans.splice(indexOfDegreePlan, 1, newDegreePlan);
        setDegreePlans(newDegreePlans);
    }
    return (
        <div>
            <Form.Label>Change Semester Session</Form.Label>
            <Form.Control
                key={semester.id.toString() + "-semester"}
                onChange={updateSemesterSession}
                id={semester.id.toString() + "-semester"}
                data-testid={semester.id.toString() + "-semester"}
            ></Form.Control>
            <Form.Label>Change Semester Year</Form.Label>
            <Form.Control
                key={semester.id.toString() + "-semester"}
                onChange={updateSemesterYear}
                id={semester.id.toString() + "-semester"}
                data-testid={semester.id.toString() + "-semester"}
            ></Form.Control>
        </div>
    );
}
