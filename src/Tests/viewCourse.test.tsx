import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("ViewCourse tests", () => {
    beforeEach(() => {
        render(<App />);
        const currPlan = screen.getByTestId("107-degree-plan");
        currPlan.click();
    });
    test("check if courses exist", () => {
        expect(
            screen.queryAllByText(/Analytic Geometry and Calculus A/i)
        ).toHaveLength(1);
        expect(screen.queryAllByText(/MATH 241:/i)).toHaveLength(1);
        expect(screen.queryAllByText(/Discrete Mathematics I/i)).toHaveLength(
            1
        );
        expect(screen.queryAllByText(/MATH 210:/i)).toHaveLength(1);
    });
    test("course information should be hidden by default", () => {
        expect(
            screen.queryAllByText(
                /Functions, limits, continuity, derivatives./i
            )
        ).toHaveLength(0);
        expect(screen.queryAllByText(/Reset course/i)).toHaveLength(0);
        expect(screen.queryAllByText(/Move to Pool/i)).toHaveLength(0);
    });
    test("clicking the switch makes the information and buttons appear", () => {
        const courseSwitch = screen.getByTestId("is-viewing-check110");
        courseSwitch.click();
        expect(
            screen.queryAllByText(
                /Functions, limits, continuity, derivatives./i
            )
        ).toHaveLength(1);
        expect(screen.queryAllByText(/Reset course/i)).toHaveLength(1);
        expect(screen.queryAllByText(/Move to Pool/i)).toHaveLength(1);
        courseSwitch.click();
        expect(
            screen.queryAllByText(
                /Functions, limits, continuity, derivatives./i
            )
        ).toHaveLength(0);
        expect(screen.queryAllByText(/Reset course/i)).toHaveLength(0);
        expect(screen.queryAllByText(/Move to Pool/i)).toHaveLength(0);
    });
});
