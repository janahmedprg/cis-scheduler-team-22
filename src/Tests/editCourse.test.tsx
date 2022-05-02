import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("ViewCourse tests", () => {
    beforeEach(() => {
        render(<App />);
        const currPlan = screen.getByTestId("107-degree-plan");
        currPlan.click();
    });
    test("edit button exists", () => {
        const courseSwitch = screen.getByTestId("is-viewing-check110");
        courseSwitch.click();
        expect(screen.getByTestId("edit-course-button110")).toBeInTheDocument();
    });
    test("clicking edit button brings up edit menu", () => {
        const courseSwitch = screen.getByTestId("is-viewing-check110");
        courseSwitch.click();
        expect(screen.queryAllByText(/Editing MATH 241/i)).toHaveLength(0);
        const editButton = screen.getByTestId("edit-course-button110");
        editButton.click();
        expect(screen.queryAllByText(/Editing MATH 241/i)).toHaveLength(1);
        editButton.click();
        expect(screen.queryAllByText(/Editing MATH 241/i)).toHaveLength(0);
    });
});
