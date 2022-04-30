import React from "react";
import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import { App } from "../App";

describe("EditQuizView Tests", () => {
    beforeEach(() => {
        render(<App />);
        const currPlan = screen.getByTestId("7-degree-plan");
        currPlan.click();
    });
    test("Check existance of degreePlan name and buttons", () => {
        expect(screen.getAllByText("Math test plan")).toHaveLength(1);
        expect(
            screen.getByTestId("7-edit-close-degree-plan")
        ).toBeInTheDocument();
        expect(
            screen.getByTestId("7-add-course-degree-plan")
        ).toBeInTheDocument();
        expect(
            screen.getByTestId("7-add-semester-degree-plan")
        ).toBeInTheDocument();
        expect(
            screen.getByTestId("7-clear-semesters-degree-plan")
        ).toBeInTheDocument();
        expect(
            screen.getByTestId("7-remove-semester-degree-plan")
        ).toBeInTheDocument();
    });
});
