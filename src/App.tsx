import React, { useState } from "react";
import "./App.css";
import sketch from "./sketch.jpg";
import UDHeader from "./UDHeader.jpg";
import { DegreePlan, TEST_PLANS, EMPTY_PLAN } from "./interfaces/DegreePlan";
import { ViewDegreePlansList } from "./Compontents/viewDegreePlansList";
import { ViewDegreePlan } from "./Compontents/viewDegreePlan";
import { Course } from "./interfaces/Course";
import { Button } from "react-bootstrap";
import { CSVImport } from "./Compontents/ImportCSV";

/**
 * Importing Course Catalog
 * - use record nested within record
 * c:Record<string, Record<string, Course>> = "input";
 * c["Cisc"]["Cisc275"]
 */

export function App(): JSX.Element {
    let loadedDegreePlans = TEST_PLANS;
    let loadedSelectPlanId = 107;
    let loadedNextId = 1000;

    const saveDegreePlansKey = "DEGREE-PLANS";
    const saveSelectPlanId = "SELECT-PLAN";
    const saveNextId = "NEXT-ID";

    const previousDegreePlans = localStorage.getItem(saveDegreePlansKey);
    const previousSelectPlanId = localStorage.getItem(saveSelectPlanId);
    const previousNextId = localStorage.getItem(saveNextId);

    if (previousDegreePlans !== null) {
        loadedDegreePlans = JSON.parse(previousDegreePlans);
    }
    if (previousSelectPlanId !== null) {
        loadedSelectPlanId = parseInt(previousSelectPlanId);
    }
    if (previousNextId !== null) {
        loadedNextId = parseInt(previousNextId);
    }
    const [degreePlans, setDegreePlans] =
        useState<DegreePlan[]>(loadedDegreePlans);
    const [selectedPlanId, setSelectedPlanId] =
        useState<number>(loadedSelectPlanId);
    const [nextId, setNextId] = useState<number>(loadedNextId);
    const [coursePool, setCoursePool] = useState<Course[]>([]);
    const [showSketch, setShowSketch] = useState<boolean>(false);
    function findDegreePlan(id: number): DegreePlan {
        const foundPlan = degreePlans.find(
            (plan: DegreePlan): boolean => plan.id === id
        );
        if (foundPlan === undefined) {
            return EMPTY_PLAN;
        }
        return foundPlan;
    }
    function saveData() {
        localStorage.setItem(saveDegreePlansKey, JSON.stringify(degreePlans));
        localStorage.setItem(saveSelectPlanId, JSON.stringify(selectedPlanId));
        localStorage.setItem(saveNextId, JSON.stringify(nextId));
    }
    return (
        <div
            className="App"
            style={{
                backgroundColor: "#EFF4FF"
            }}
        >
            <header
                style={{
                    backgroundImage: `url(${UDHeader})`,
                    backgroundPosition: "center",
                    backgroundSize: "1695px 300px"
                }}
                className="App-header"
            >
                <h3>Hello, welcome to your UD CIS course scheduler!</h3>
            </header>
            <h1 style={{ backgroundColor: "gold", fontSize: "300%" }}>
                Course Scheduler
            </h1>
            <CSVImport
                plans={degreePlans}
                setPlans={setDegreePlans}
                nextId={nextId}
                setNextId={setNextId}
            ></CSVImport>
            <h2
                style={{
                    fontSize: "180%",
                    marginLeft: "3%",
                    marginRight: "3%",
                    textAlign: "center",
                    borderBottom: ".5px solid black"
                }}
            >
                Degree Plans List
            </h2>
            <ViewDegreePlansList
                degreePlansList={degreePlans}
                setDegreePlans={setDegreePlans}
                selectedPlanId={selectedPlanId}
                setSelectedPlanId={setSelectedPlanId}
                nextId={nextId}
                setNextId={setNextId}
            />
            <hr />
            <h2
                style={{
                    backgroundColor: "#0C3590",
                    fontWeight: "5px solid blue",
                    marginLeft: "30%",
                    marginRight: "30%",
                    color: "white",
                    marginBottom: "20px",
                    marginTop: "20px"
                }}
            >
                See Selected Degree Plan Below
            </h2>
            <ViewDegreePlan
                degreePlan={findDegreePlan(selectedPlanId)}
                degreePlans={degreePlans}
                setDegreePlans={setDegreePlans}
                nextId={nextId}
                setNextId={setNextId}
                coursePool={coursePool}
                setCoursePool={setCoursePool}
            />
            <hr />
            <div>Connor Nagle</div>
            <div>Brandon Aguiar</div>
            <div>Jan Ahmed</div>
            <Button onClick={() => setShowSketch(!showSketch)}>
                {showSketch ? "Hide" : "Show"} sketch
            </Button>{" "}
            <br />
            {showSketch && <img src={sketch} alt="Sketch" />}
            <br />
            <Button onClick={saveData}>Save Data</Button>
        </div>
    );
}

export default App;
