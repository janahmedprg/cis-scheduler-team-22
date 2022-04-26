import { Semester, SemesterSession } from "../interfaces/Semester";
import { DegreePlan } from "../interfaces/DegreePlan";
import { ViewSemester } from "./viewSemester";
import { Button, Col, Row } from "react-bootstrap";
import { EditDegreePlan } from "./editDegreePlan";
import React, { useState } from "react";
import { CoursePool } from "./coursePool";
import { Course } from "../interfaces/Course";

export function ViewDegreePlan({
    degreePlan,
    degreePlans,
    setDegreePlans,
    nextId,
    setNextId,
    coursePool,
    setCoursePool
}: {
    degreePlan: DegreePlan;
    degreePlans: DegreePlan[];
    setDegreePlans: (plans: DegreePlan[]) => void;
    nextId: number;
    setNextId: (id: number) => void;
    coursePool: Course[];
    setCoursePool: (newCList: Course[]) => void;
}): JSX.Element {
    const [editing, setEditing] = useState<boolean>(false);

    function clearPlan() {
        const foundDegreePlan = degreePlans.find(
            (plan: DegreePlan): boolean => plan.id === degreePlan.id
        );
        if (foundDegreePlan === undefined) {
            return;
        }
        const newPlan: DegreePlan = {
            ...foundDegreePlan,
            semesters: foundDegreePlan.semesters.map(
                (semester: Semester): Semester => ({ ...semester, courses: [] })
            )
        };
        const newPlans: DegreePlan[] = degreePlans.map(
            (plan: DegreePlan): DegreePlan =>
                plan.id === newPlan.id ? newPlan : plan
        );
        setDegreePlans(newPlans);
    }
    function removePlan() {
        const foundDegreePlan = degreePlans.find(
            (plan: DegreePlan): boolean => plan.id === degreePlan.id
        );
        if (foundDegreePlan === undefined) {
            return;
        }
        const newPlan: DegreePlan = {
            ...foundDegreePlan,
            semesters: []
        };
        const newPlans: DegreePlan[] = degreePlans.map(
            (plan: DegreePlan): DegreePlan =>
                plan.id === newPlan.id ? newPlan : plan
        );
        setDegreePlans(newPlans);
    }
    function addNewSemester() {
        const foundDegreePlan = degreePlans.find(
            (plan: DegreePlan): boolean => plan.id === degreePlan.id
        );
        if (foundDegreePlan === undefined) {
            return;
        }
        const emptySemester = {
            id: nextId,
            courses: [],
            session: "winter" as SemesterSession,
            year: 0
        };
        const newPlan: DegreePlan = {
            ...foundDegreePlan,
            semesters: [...foundDegreePlan.semesters, emptySemester]
        };
        const newPlans: DegreePlan[] = degreePlans.map(
            (plan: DegreePlan): DegreePlan =>
                plan.id === newPlan.id ? newPlan : plan
        );
        setNextId(nextId + 1);
        setDegreePlans(newPlans);
    }
    return (
        <div
            style={{
                marginLeft: "10px",
                marginRight: "10px",
                marginTop: "10px",
                border: "3px solid black"
            }}
        >
            <h3>{degreePlan.name}</h3>
            {editing && (
                <EditDegreePlan
                    degreePlan={degreePlan}
                    degreePlans={degreePlans}
                    setDegreePlans={setDegreePlans}
                />
            )}
            {
                <Button
                    onClick={() => setEditing(!editing)}
                    style={{
                        marginRight: "20px",
                        marginBottom: "10px"
                    }}
                >
                    {editing ? "Close" : "Edit this Degree Plan"}
                </Button>
            }
            <Row>
                {degreePlan.semesters.map(
                    (semester: Semester): JSX.Element => (
                        <Col
                            key={
                                degreePlan.id.toString() +
                                "-" +
                                semester.id.toString() +
                                "-" +
                                "course"
                            }
                        >
                            <p>
                                <ViewSemester
                                    semester={semester}
                                    degreePlan={degreePlan}
                                    degreePlans={degreePlans}
                                    setDegreePlans={setDegreePlans}
                                    nextId={nextId}
                                    setNextId={setNextId}
                                />
                            </p>
                        </Col>
                    )
                )}
            </Row>
            <Button onClick={() => addNewSemester()}>Add New Semester</Button>
            <Button
                style={{ backgroundColor: "red" }}
                onClick={() => clearPlan()}
            >
                Clear All Semesters
            </Button>
            <Button
                style={{ backgroundColor: "red" }}
                onClick={() => removePlan()}
            >
                Remove All Semesters
            </Button>
            <CoursePool
                degreePlan={degreePlan}
                degreePlans={degreePlans}
                setDegreePlans={setDegreePlans}
                nextId={nextId}
                setNextId={setNextId}
                coursePool={coursePool}
                setCoursePool={setCoursePool}
            ></CoursePool>
        </div>
    );
}
