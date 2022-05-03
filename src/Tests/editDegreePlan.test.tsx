import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

describe("ViewCourse tests", () => {
    beforeEach(() => {
        render(<App />);
        const currPlan = screen.getByTestId("107-degree-plan");
        currPlan.click();
    });
    test("Edit name button exists", () => {
        expect(
            screen.getByTestId("107-edit-close-degree-plan")
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
    test("Editing the name changes the value", () => {
        screen.getByTestId("107-edit-close-degree-plan").click();
        expect(screen.getAllByText("Editing: Math test plan")).toHaveLength(1);
        expect(screen.getAllByText("New degree plan Name:")).toHaveLength(1);
        expect(screen.getByTestId("107-degreeplan")).toBeInTheDocument();
        expect(screen.queryAllByText("Math test plan")).toHaveLength(1);
        const degreeName = screen.getByTestId("107-degreeplan");
        userEvent.type(degreeName, "{selectall}{delete}new name");
        screen.getByTestId("107-edit-close-degree-plan").click();
        expect(screen.queryAllByText(/Math test plan/i)).toHaveLength(0);
        expect(screen.queryAllByText(/new name/i)).toHaveLength(2);
    });
});
