import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { Semester } from "../interfaces/Semester";
import { DegreePlan } from "../interfaces/DegreePlan";

export function ViewDegreePlan({
    degreePlan
}: {
    degreePlan: DegreePlan;
}): JSX.Element {
    return (
        <div>
            {degreePlan.semesters.map(
                (semester: Semester): JSX.Element => (
                    <p
                        key={
                            degreePlan.id.toString() +
                            "-" +
                            semester.id.toString() +
                            "-" +
                            "course"
                        }
                    >
                        {semester}
                    </p>
                )
            )}
        </div>
    );
}
