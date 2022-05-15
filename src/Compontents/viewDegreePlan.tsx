import { Semester, SemesterSession } from "../interfaces/Semester";
import { DegreePlan } from "../interfaces/DegreePlan";
import { ViewSemester } from "./viewSemester";
import { Button, Col, Row } from "react-bootstrap";
import { EditDegreePlan } from "./editDegreePlan";
import React, { useState } from "react";
import { ViewCoursePool } from "./viewCoursePool";
import { Course } from "../interfaces/Course";
import { SearchCoursesSemesterView } from "./addCourse";

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
    const [addingCourse, setAddingCourse] = useState<boolean>(false);

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
                        marginBottom: "10px",
                        backgroundColor: "#BAC9EB",
                        color: "black"
                    }}
                    data-testid={degreePlan.id + "-edit-close-degree-plan"}
                >
                    {editing ? "Close" : "✏️ Edit Plan Name or Degree"}
                </Button>
            }
            {degreePlan.semesters.length === 0 && (
                <div>
                    This plan has no semesters. Click the &quot;Add New
                    Semester&quot; button to add a semester.
                </div>
            )}
            <Row>
                {degreePlan.semesters.map(
                    (semester: Semester): JSX.Element => (
                        <Col
                            style={{
                                minWidth: 450,
                                maxWidth: 600,
                                margin: "0 auto"
                            }}
                            key={
                                degreePlan.id.toString() +
                                "-" +
                                semester.id.toString() +
                                "-" +
                                "course"
                            }
                        >
                            <div>
                                <ViewSemester
                                    semester={semester}
                                    degreePlan={degreePlan}
                                    degreePlans={degreePlans}
                                    setDegreePlans={setDegreePlans}
                                    nextId={nextId}
                                    setNextId={setNextId}
                                    coursePool={coursePool}
                                    setCoursePool={setCoursePool}
                                />
                            </div>
                        </Col>
                    )
                )}
            </Row>
            <div style={{ marginTop: "20px" }}>
                {addingCourse === false ? (
                    <div>
                        <Button
                            onClick={() => setAddingCourse(!addingCourse)}
                            style={{ backgroundColor: "#373DBE" }}
                            data-testid={
                                degreePlan.id + "-add-course-degree-plan"
                            }
                        >
                            ✅ Add Courses To Plan
                        </Button>
                    </div>
                ) : (
                    <div>
                        <Button
                            onClick={() => setAddingCourse(!addingCourse)}
                            data-testid={
                                degreePlan.id + "-close-add-course-degree-plan"
                            }
                        >
                            Close Course Search
                        </Button>
                    </div>
                )}
                {addingCourse && (
                    <SearchCoursesSemesterView
                        degreePlan={degreePlan}
                        degreePlans={degreePlans}
                        setDegreePlans={setDegreePlans}
                        nextId={nextId}
                        setNextId={setNextId}
                    />
                )}
                <Button
                    onClick={() => addNewSemester()}
                    style={{ backgroundColor: "#FFF9FF", color: "black" }}
                    data-testid={degreePlan.id + "-add-semester-degree-plan"}
                >
                    ➕ Add New Semester
                </Button>
                <Button
                    style={{ backgroundColor: "#FFF9FF", color: "black" }}
                    onClick={() => clearPlan()}
                    data-testid={degreePlan.id + "-clear-semesters-degree-plan"}
                >
                    ❌ Clear All Semesters
                </Button>
                <Button
                    style={{ backgroundColor: "#FFF9FF", color: "black" }}
                    onClick={() => removePlan()}
                    data-testid={degreePlan.id + "-remove-semester-degree-plan"}
                >
                    🗑 Remove All Semesters
                </Button>
                <ViewCoursePool
                    degreePlan={degreePlan}
                    degreePlans={degreePlans}
                    setDegreePlans={setDegreePlans}
                    coursePool={coursePool}
                    setCoursePool={setCoursePool}
                ></ViewCoursePool>
            </div>
        </div>
    );
}
