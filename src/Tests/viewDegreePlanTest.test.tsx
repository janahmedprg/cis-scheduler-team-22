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
    test("Check degreePlan name", () => {
        expect(screen.getAllByText("Math test plan")).toHaveLength(1);
        expect(
            screen.getByTestId("7-edit-close-degree-plan")
        ).toBeInTheDocument();
    });
});
