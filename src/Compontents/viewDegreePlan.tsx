import React from "react";
import { Semester } from "../interfaces/Semester";
import { DegreePlan } from "../interfaces/DegreePlan";
import { ViewSemester } from "./viewSemester";
import { Col, Row } from "react-bootstrap";

export function ViewDegreePlan({
    degreePlan,
    degreePlans,
    setDegreePlans
}: {
    degreePlan: DegreePlan;
    degreePlans: DegreePlan[];
    setDegreePlans: (plans: DegreePlan[]) => void;
}): JSX.Element {
    return (
        <div>
            <h3>{degreePlan.name}</h3>
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
                                />
                            </p>
                        </Col>
                    )
                )}
            </Row>
        </div>
    );
}
