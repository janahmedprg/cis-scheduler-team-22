import React, { useState } from "react";
import { Semester } from "../interfaces/Semester";
import { Course } from "../interfaces/Course";
import { ViewCourse } from "./viewCourse";
import { DegreePlan } from "../interfaces/DegreePlan";
import { Button } from "react-bootstrap";
import { EditSemester } from "./editSemester";

export function ViewSemester({
    semester,
    degreePlan,
    degreePlans,
    setDegreePlans
}: {
    semester: Semester;
    degreePlan: DegreePlan;
    degreePlans: DegreePlan[];
    setDegreePlans: (plans: DegreePlan[]) => void;
}): JSX.Element {
    const [editing, setEditing] = useState<boolean>(false);
    function clearSemester() {
        const foundDegreePlan = degreePlans.find(
            (plan: DegreePlan): boolean => plan.id === degreePlan.id
        );
        if (foundDegreePlan === undefined) {
            return;
        }
        const foundSemester = foundDegreePlan.semesters.find(
            (semester1: Semester): boolean => semester1.id === semester.id
        );
        if (foundSemester === undefined) {
            return;
        }
        const newSemester = { ...foundSemester, courses: [] };
        const newPlan: DegreePlan = {
            ...foundDegreePlan,
            semesters: foundDegreePlan.semesters.map(
                (semester: Semester): Semester =>
                    semester.id === newSemester.id ? newSemester : semester
            )
        };
        const newPlans: DegreePlan[] = degreePlans.map(
            (plan: DegreePlan): DegreePlan =>
                plan.id === newPlan.id ? newPlan : plan
        );
        setDegreePlans(newPlans);
    }
    function removeSemester() {
        const foundDegreePlan = degreePlans.find(
            (plan: DegreePlan): boolean => plan.id === degreePlan.id
        );
        if (foundDegreePlan === undefined) {
            return;
        }
        const foundSemester = foundDegreePlan.semesters.findIndex(
            (semester1: Semester): boolean => semester1.id === semester.id
        );
        if (foundSemester === undefined) {
            return;
        }
        const newSemesterList = [...foundDegreePlan.semesters];
        newSemesterList.splice(foundSemester, 1);
        const newPlan: DegreePlan = {
            ...foundDegreePlan,
            semesters: [...newSemesterList]
        };
        const newPlans: DegreePlan[] = degreePlans.map(
            (plan: DegreePlan): DegreePlan =>
                plan.id === newPlan.id ? newPlan : plan
        );
        setDegreePlans(newPlans);
    }
    return (
        <div>
            <h4>
                {semester.session} {semester.year} semester
            </h4>
            {semester.courses.map(
                (course: Course): JSX.Element => (
                    <p
                        key={
                            semester.id.toString() +
                            "-" +
                            course.id.toString() +
                            "-" +
                            "course"
                        }
                    >
                        <ViewCourse
                            course={course}
                            semester={semester}
                            degreePlan={degreePlan}
                            degreePlans={degreePlans}
                            setDegreePlans={setDegreePlans}
                        />
                    </p>
                )
            )}
            <Button
                style={{ backgroundColor: "red" }}
                onClick={() => clearSemester()}
            >
                Clear Semester
            </Button>
            <Button
                style={{ backgroundColor: "red" }}
                onClick={() => removeSemester()}
            >
                Remove Semester
            </Button>
            <br />
            {editing && (
                <EditSemester
                    degreePlans={degreePlans}
                    degreePlan={degreePlan}
                    semester={semester}
                    setDegreePlans={setDegreePlans}
                />
            )}
            <Button onClick={() => setEditing(!editing)}>
                {editing ? "Close" : "Edit Semester"}
            </Button>
        </div>
    );
}
