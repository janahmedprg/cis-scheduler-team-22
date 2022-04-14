import React from "react";
import { Form } from "react-bootstrap";
import { DegreePlan } from "../interfaces/DegreePlan";

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
    function updateDegreePlan(newId: number, newName: string) {
        const foundDegreePlan = degreePlans.find(
            (plan: DegreePlan): boolean => plan.id === degreePlan.id
        );
        if (foundDegreePlan === undefined) {
            return;
        }
        const newDegreePlan: DegreePlan = {
            ...foundDegreePlan,
            id: newId,
            name: newName
        };
        const newPlans: DegreePlan[] = degreePlans.map(
            (plan: DegreePlan): DegreePlan =>
                plan.id === newDegreePlan.id ? newDegreePlan : plan
        );
        setDegreePlans(newPlans);
    }
    function updateDegreePlanId(event: ChangeEvent) {
        updateDegreePlan(parseInt(event.target.value) || 0, degreePlan.name);
    }
    function updateDegreePlanName(event: ChangeEvent) {
        updateDegreePlan(degreePlan.id, event.target.value);
    }

    return (
        <div>
            <h3>Editing {degreePlan.name}</h3>
            <Form.Group
                controlId="formDegreePlanId"
                style={{
                    marginLeft: "200px",
                    marginRight: "200px",
                    marginTop: "20px"
                }}
            >
                <Form.Label>New degree plan ID:</Form.Label>
                <Form.Control
                    value={degreePlan.id}
                    onChange={updateDegreePlanId}
                    type={"number"}
                />
            </Form.Group>
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
                />
            </Form.Group>
            <div>
                <h3 style={{ color: "orangered" }}>
                    How to have button open only 1 plan? How to edit numbers?
                    {"\n"}
                    Ability to edit semseters to be added
                </h3>
            </div>
        </div>
    );
}
