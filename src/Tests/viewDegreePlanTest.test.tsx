import React from "react";
import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import { App } from "../App";

describe("EditQuizView Tests", () => {
    beforeEach(() => {
        render(<App />);
        const currPlan = screen.getByTestId("107-degree-plan");
        currPlan.click();
    });
    test("Check existance of degreePlan name and buttons", () => {
        expect(screen.getAllByText("Math test plan")).toHaveLength(1);
        expect(
            screen.getByTestId("107-edit-close-degree-plan")
        ).toBeInTheDocument();
        expect(
            screen.getByTestId("107-add-course-degree-plan")
        ).toBeInTheDocument();
        expect(
            screen.getByTestId("107-add-semester-degree-plan")
        ).toBeInTheDocument();
        expect(
            screen.getByTestId("107-clear-semesters-degree-plan")
        ).toBeInTheDocument();
        expect(
            screen.getByTestId("107-remove-semester-degree-plan")
        ).toBeInTheDocument();
    });
    test("Test Edit this Degree Plan button", () => {
        expect(screen.queryAllByText("Editing: Math test plan")).toHaveLength(
            0
        );
        expect(screen.queryAllByText("New degree plan Name:")).toHaveLength(0);
        screen.getByTestId("107-edit-close-degree-plan").click();
        expect(screen.getAllByText("Editing: Math test plan")).toHaveLength(1);
        expect(screen.getAllByText("New degree plan Name:")).toHaveLength(1);
        screen.getByTestId("107-edit-close-degree-plan").click();
        expect(screen.queryAllByText("Editing: Math test plan")).toHaveLength(
            0
        );
        expect(screen.queryAllByText("New degree plan Name:")).toHaveLength(0);
    });
    test("Test Add Courses To Plan button", () => {
        expect(
            screen.queryByTestId("107-close-add-course-degree-plan")
        ).toBeFalsy();
        expect(screen.queryAllByText("Course Adder")).toHaveLength(0);
        expect(
            screen.queryAllByText("Enter course Code: (Ex: CISC)")
        ).toHaveLength(1);
        expect(
            screen.queryAllByText("Enter course Number: (Ex: 108)")
        ).toHaveLength(1);
        screen.getByTestId("107-add-course-degree-plan").click();
        expect(screen.getAllByText("Course Adder")).toHaveLength(1);
        expect(
            screen.getAllByText("Enter course Code: (Ex: CISC)")
        ).toHaveLength(2);
        expect(
            screen.getAllByText("Enter course Number: (Ex: 108)")
        ).toHaveLength(2);
        expect(
            screen.getByTestId("107-close-add-course-degree-plan")
        ).toBeInTheDocument();
        screen.getByTestId("107-close-add-course-degree-plan").click();
        expect(screen.queryAllByText("Course Adder")).toHaveLength(0);
        expect(
            screen.queryAllByText("Enter course Code: (Ex: CISC)")
        ).toHaveLength(1);
        expect(
            screen.queryAllByText("Enter course Number: (Ex: 108)")
        ).toHaveLength(1);
    });
});
