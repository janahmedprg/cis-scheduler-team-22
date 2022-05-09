import { Form } from "react-bootstrap";
import { DegreePlan } from "../interfaces/DegreePlan";
import React from "react";
import { Degree, OFFICIAL_DEGREES } from "../interfaces/Degree";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

export function EditDegreePlan({
    degreePlan,
    degreePlans,
    setDegreePlans
}: {
    degreePlan: DegreePlan;
    degreePlans: DegreePlan[];
    setDegreePlans: (plans: DegreePlan[]) => void;
}) {
    //When component called, when editing a degree plan, offer live updates to id and name and call
    //...component that Jan writes to allow to insert or delete semesters to a plan
    function updateDegreePlan(
        newId: number,
        newName: string,
        newDegree: Degree
    ) {
        const foundDegreePlan = degreePlans.find(
            (plan: DegreePlan): boolean => plan.id === degreePlan.id
        );
        if (foundDegreePlan === undefined) {
            return;
        }
        const newDegreePlan: DegreePlan = {
            ...foundDegreePlan,
            name: newName,
            degree: newDegree
        };
        const newPlans: DegreePlan[] = degreePlans.map(
            (plan: DegreePlan): DegreePlan =>
                plan.id === newDegreePlan.id ? newDegreePlan : plan
        );
        setDegreePlans(newPlans);
    }
    function updateDegreePlanName(event: ChangeEvent) {
        updateDegreePlan(degreePlan.id, event.target.value, degreePlan.degree);
    }
    function updateDegreePlanDegree(event: ChangeEvent) {
        const newDegree = OFFICIAL_DEGREES.find(
            (degree: Degree): boolean => degree.name === event.target.value
        );
        if (newDegree !== undefined) {
            updateDegreePlan(degreePlan.id, degreePlan.name, newDegree);
        }
    }

    return (
        <div>
            <h4>Editing: {degreePlan.name} </h4>
            <Form.Group
                controlId="formDegreePlanName"
                style={{
                    marginLeft: "200px",
                    marginRight: "200px",
                    marginTop: "20px"
                }}
            >
                <Form.Label>New degree plan Name:</Form.Label>
                <Form.Control
                    value={degreePlan.name}
                    onChange={updateDegreePlanName}
                    data-testid={degreePlan.id + "-degreeplan"}
                />
            </Form.Group>
            <Form.Group
                controlId="formDegreePlanDegree"
                style={{
                    marginLeft: "200px",
                    marginRight: "200px",
                    marginTop: "20px"
                }}
            >
                <Form.Label>Select an option:</Form.Label>
                <Form.Select
                    value={degreePlan.degree.name}
                    onChange={updateDegreePlanDegree}
                >
                    {OFFICIAL_DEGREES.map(
                        (option: Degree): JSX.Element => (
                            <option value={option.name} key={option.name}>
                                {option.name}
                            </option>
                        )
                    )}
                </Form.Select>
            </Form.Group>
        </div>
    );
}
