import React from "react";
import { DegreePlan } from "../interfaces/DegreePlan";

export function DegreePlans({
    degreePlansList
}: {
    degreePlansList: DegreePlan[];
}): JSX.Element {
    //keep the array here?
    //no - array will be a useState in app and be passed into this component
    //let degreePlansList: DegreePlan[] = [];

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
