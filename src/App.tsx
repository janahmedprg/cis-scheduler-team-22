import React, { useState } from "react";
import "./App.css";
import sketch from "./sketch.jpg";
import { DegreePlan, TEST_PLANS, EMPTY_PLAN } from "./interfaces/DegreePlan";
import { ViewDegreePlansList } from "./Compontents/viewDegreePlansList";
import { ViewDegreePlan } from "./Compontents/viewDegreePlan";
import { Button } from "react-bootstrap";

/**
 * Importing Course Catalog
 * - use record nested within record
 * c:Record<string, Record<string, Course>> = "input";
 * c["Cisc"]["Cisc275"]
 */

function App(): JSX.Element {
    const [degreePlans, setDegreePlans] = useState<DegreePlan[]>(TEST_PLANS);
    const [selectedPlanId, setSelectedPlanId] = useState<number>(7);
    const [nextId, setNextId] = useState<number>(1000);
    function findDegreePlan(id: number): DegreePlan {
        const foundPlan = degreePlans.find(
            (plan: DegreePlan): boolean => plan.id === id
        );
        if (foundPlan === undefined) {
            return EMPTY_PLAN;
        }
        return foundPlan;
    }
    return (
        <div className="App">
            <header className="App-header">
                Hello, welcome to your UD CIS course scheduler!
            </header>
            <h1>Scheduler</h1>
            <h2>Degree Plans List</h2>
            <ViewDegreePlansList
                degreePlansList={degreePlans}
                setDegreePlans={setDegreePlans}
                setSelectedPlanId={setSelectedPlanId}
                nextId={nextId}
                setNextId={setNextId}
            />
            <hr />
            <h2>Degree Plan View</h2>
            <ViewDegreePlan
                degreePlan={findDegreePlan(selectedPlanId)}
                degreePlans={degreePlans}
                setDegreePlans={setDegreePlans}
            />
            <hr />
            <div>Connor Nagle</div>
            <div>Brandon Aguiar</div>
            <div>Jan Ahmed</div>
            <img src={sketch} alt="Sketch" />
            <br />
            <Button
                onClick={() => {
                    setDegreePlans(degreePlans);
                    setSelectedPlanId(selectedPlanId);
                }}
            >
                this button only exists so we don&apos;t get unused errors, will
                remove later
            </Button>
        </div>
    );
}

export default App;
