import React, { useState } from "react";
import { Course } from "../interfaces/Course";
import { DegreePlan } from "../interfaces/DegreePlan";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Semester } from "../interfaces/Semester";

export function ViewC({
    course,
    degreePlan,
    degreePlans,
    setDegreePlans,
    coursePool,
    setCoursePool
}: {
    course: Course;
    degreePlan: DegreePlan;
    degreePlans: DegreePlan[];
    setDegreePlans: (newDegPlan: DegreePlan[]) => void;
    coursePool: Course[];
    setCoursePool: (newCPool: Course[]) => void;
}): JSX.Element {
    const [chooseSemesterID, setChooseSemesterID] = useState(-1);
    function addCourseToSemester() {
        const foundDegreePlan = degreePlans.find(
            (plan: DegreePlan): boolean => plan.id === degreePlan.id
        );
        if (foundDegreePlan === undefined) {
            return;
        }
        let indexOfS = 0;
        if (chooseSemesterID !== -1) {
            indexOfS = degreePlan.semesters.findIndex(
                (s: Semester): boolean => s.id === chooseSemesterID
            );
        }
        const newCourseList = [
            ...degreePlan.semesters[indexOfS].courses,
            course
        ];
        const newSemester = {
            ...degreePlan.semesters[indexOfS],
            courses: newCourseList
        };
        const newSemesterList: Semester[] = degreePlan.semesters.map(
            (s: Semester): Semester =>
                s.id === newSemester.id ? newSemester : s
        );
        const newCoursePoolList: Course[] = [...coursePool];
        const indexOfC = newCoursePoolList.findIndex(
            (c: Course): boolean => c.id === course.id
        );
        newCoursePoolList.splice(indexOfC, 1);
        const newPlan = { ...degreePlan, semesters: newSemesterList };
        const newPlans: DegreePlan[] = degreePlans.map(
            (plan: DegreePlan): DegreePlan =>
                plan.id === newPlan.id ? newPlan : plan
        );
        setDegreePlans(newPlans);
        setCoursePool(newCoursePoolList);
    }
    function updateChoice(event: React.ChangeEvent<HTMLSelectElement>) {
        setChooseSemesterID(parseInt(event.target.value));
    }
    return (
        <div
            style={{
                border: "1px solid black",
                fontSize: "small",
                marginBottom: "5px"
            }}
        >
            <b>{course.code}: </b>
            {course.name} <br />
            <b>Description: </b>
            {course.descr} <br />
            Credits: {course.credits}
            {course.prereqs.length > 0 && (
                <div>
                    Prerequisites:{" "}
                    <ul>
                        {course.prereqs.map(
                            (prereq: string[]): JSX.Element => (
                                <li key={prereq.join(" or ") + "-prerequisite"}>
                                    {prereq.join(" or ")}
                                </li>
                            )
                        )}
                    </ul>
                </div>
            )}
            <Form.Label>Add to Semester:</Form.Label>
            <Form.Select
                value={chooseSemesterID}
                onChange={updateChoice}
                data-testid={"semester-dropdown"}
            >
                {degreePlan.semesters.map(
                    (s: Semester): JSX.Element => (
                        <option key={s.id + "-semester"} value={s.id}>
                            {s.session + " " + s.year + " semester"}
                        </option>
                    )
                )}
            </Form.Select>
            <Button
                onClick={() => addCourseToSemester()}
                data-testid={degreePlan.id + "-add-to-semester"}
            >
                Add to semester
            </Button>
        </div>
    );
}

export function ViewCoursePool({
    degreePlan,
    degreePlans,
    setDegreePlans,
    coursePool,
    setCoursePool
}: {
    degreePlan: DegreePlan;
    degreePlans: DegreePlan[];
    setDegreePlans: (newDegreePlan: DegreePlan[]) => void;
    coursePool: Course[];
    setCoursePool: (newCList: Course[]) => void;
}): JSX.Element {
    function removeCoursePool() {
        setCoursePool([]);
    }
    return (
        <div
            style={{
                border: "2px solid black",
                backgroundColor: "white",
                marginLeft: "20px",
                marginRight: "20px",
                marginBottom: "20px",
                marginTop: "20px"
            }}
        >
            {<h4>Course Pool</h4>}
            {coursePool.map(
                (course: Course): JSX.Element => (
                    <ViewC
                        course={course}
                        degreePlan={degreePlan}
                        degreePlans={degreePlans}
                        setDegreePlans={setDegreePlans}
                        coursePool={coursePool}
                        setCoursePool={setCoursePool}
                        key={course.id + "-course"}
                    ></ViewC>
                )
            )}
            <Button
                onClick={() => removeCoursePool()}
                style={{ backgroundColor: "#BAC9EB", color: "black" }}
                data-testid={degreePlan.id + "-clear-pool"}
            >
                ❌ Clear Course Pool
            </Button>
        </div>
    );
}
