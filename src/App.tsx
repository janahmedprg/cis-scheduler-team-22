import React, { useState } from "react";
import "./App.css";
import sketch from "./sketch.jpg";
import UDHeader from "./UDHeader.jpg";
import { DegreePlan, TEST_PLANS, EMPTY_PLAN } from "./interfaces/DegreePlan";
import { ViewDegreePlansList } from "./Compontents/viewDegreePlansList";
import { ViewDegreePlan } from "./Compontents/viewDegreePlan";
import { SearchCourses } from "./Compontents/searchCourse";

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
            <h1 style={{ backgroundColor: "gold" }}> Course Scheduler</h1>
            <SearchCourses></SearchCourses>
            <h2>Degree Plans List</h2>
            <ViewDegreePlansList
                degreePlansList={degreePlans}
                setDegreePlans={setDegreePlans}
                setSelectedPlanId={setSelectedPlanId}
                nextId={nextId}
                setNextId={setNextId}
            />
            <hr />
            <h2
                style={{
                    backgroundColor: "gold",
                    height: "60px",
                    border: "5px solid blue",
                    marginLeft: "400px",
                    marginRight: "400px"
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
            />
            <hr />
            <div>Connor Nagle</div>
            <div>Brandon Aguiar</div>
            <div>Jan Ahmed</div>
            <img src={sketch} alt="Sketch" />
            <br />
        </div>
    );
}

export default App;
