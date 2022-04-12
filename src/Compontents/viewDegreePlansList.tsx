import React from "react";
import { DegreePlan } from "../interfaces/DegreePlan";

export function ViewDegreePlansList({
    degreePlansList
}: {
    degreePlansList: DegreePlan[];
}): JSX.Element {
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
