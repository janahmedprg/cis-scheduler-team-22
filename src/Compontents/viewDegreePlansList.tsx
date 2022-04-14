import React from "react";
import { Button } from "react-bootstrap";
import { DegreePlan } from "../interfaces/DegreePlan";

export function ViewDegreePlansList({
    degreePlansList,
    setSelectedPlanId
}: {
    degreePlansList: DegreePlan[];
    setSelectedPlanId: (id: number) => void;
}): JSX.Element {
    return (
        <div>
            <div>
                {degreePlansList.map(
                    (degreePlanOption: DegreePlan): JSX.Element => (
                        <p key={degreePlanOption.id.toString()}>
                            {degreePlanOption.name}{" "}
                            <Button
                                onClick={() =>
                                    setSelectedPlanId(degreePlanOption.id)
                                }
                            >
                                View Plan
                            </Button>
                        </p>
                    )
                )}
            </div>
        </div>
    );
}
