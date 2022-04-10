import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { DegreePlan } from "../interfaces/DegreePlan";

export function DegreePlans({
    degreePlan
}: {
    degreePlan: DegreePlan;
}): JSX.Element {
    //keep the array here?
    let degreePlansList: DegreePlan[] = [];

    return (
        <div>
            <div>
                {degreePlansList.map(
                    (degreePlanOption: DegreePlan): JSX.Element => (
                        <p key={degreePlanOption.id.toString()}>
                            {degreePlanOption.name}
                        </p>
                    )
                )}
            </div>
        </div>
    );
}
