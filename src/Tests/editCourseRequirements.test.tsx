import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("edit course requirements tests", () => {
    beforeEach(() => {
        render(<App />);
        const currPlan = screen.getByTestId("0-degree-plan");
        currPlan.click();
    });
    test("course requirements render", () => {
        const numText = screen.queryAllByText(/requirements:/i).length;
        const numBoxes = screen.queryAllByRole("checkbox").length;
        screen.getByTestId("is-viewing-check5").click();
        screen.getByTestId("edit-course-button5").click();
        expect(screen.queryAllByText(/requirements:/i)).toHaveLength(
            numText + 1
        );
        expect(screen.queryAllByRole("checkbox")).toHaveLength(numBoxes + 8);
    });
    test("all buttons exist and are clickable", () => {
        screen.getByTestId("is-viewing-check5").click();
        screen.getByTestId("edit-course-button5").click();
        expect(screen.getByTestId("cah-check5")).toBeInTheDocument;
        expect(screen.getByTestId("hcc-check5")).toBeInTheDocument;
        expect(screen.getByTestId("sbs-check5")).toBeInTheDocument;
        expect(screen.getByTestId("lang-check5")).toBeInTheDocument;
        expect(screen.getByTestId("lab-check5")).toBeInTheDocument;
        expect(screen.getByTestId("core-check5")).toBeInTheDocument;
        expect(screen.getByTestId("elec-check5")).toBeInTheDocument;
        expect(screen.getByTestId("cap-check5")).toBeInTheDocument;
        screen.getByTestId("cah-check5").click();
        screen.getByTestId("hcc-check5").click();
        screen.getByTestId("sbs-check5").click();
        screen.getByTestId("lang-check5").click();
        screen.getByTestId("lab-check5").click();
        screen.getByTestId("core-check5").click();
        screen.getByTestId("elec-check5").click();
        screen.getByTestId("cap-check5").click();
    });
    test("updating requirements causes waning text to change", () => {
        expect(
            screen.queryAllByText(
                /This degree requires 6 credits of technical electives. Your plan has 3 credits./i
            )
        ).toHaveLength(1);
        expect(
            screen.queryAllByText(
                /This degree requires 12 credits of lab science. Your plan has 8 credits./i
            )
        ).toHaveLength(1);
        screen.getByTestId("is-viewing-check5").click();
        screen.getByTestId("edit-course-button5").click();
        screen.getByTestId("lab-check5").click();
        screen.getByTestId("elec-check5").click();
        expect(
            screen.queryAllByText(
                /This degree requires 6 credits of technical electives. Your plan has 3 credits./i
            )
        ).toHaveLength(0);
        expect(
            screen.queryAllByText(
                /This degree requires 12 credits of lab science. Your plan has 8 credits./i
            )
        ).toHaveLength(0);
    });
});
