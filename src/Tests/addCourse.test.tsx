import React from "react";
import { render, screen } from "@testing-library/react";
import { App } from "../App";
import userEvent from "@testing-library/user-event";

describe("ViewDegreePlansList Tests", () => {
    beforeEach(() => {
        render(<App />);
        screen.getByTestId("107-degree-plan").click();
        screen.getByTestId("107-add-course-degree-plan").click();
    });
    test("Testing existance of forms and buttons", () => {
        expect(screen.getByTestId("107-add-course-code")).toBeInTheDocument();
        expect(screen.getByTestId("107-add-course-number")).toBeInTheDocument();
        expect(screen.getByTestId("107-add-course-search")).toBeInTheDocument();
    });
    test("Testing search", () => {
        const code = screen.getByTestId("107-add-course-code");
        const num = screen.getByTestId("107-add-course-number");
        userEvent.type(code, "{selectall}{del}musc");
        screen.getByTestId("107-add-course-search").click();
        expect(screen.queryAllByText(/musc/i)).toHaveLength(456);
        screen.getByTestId("107-add-course-search-close").click();
        userEvent.type(num, "108");
        screen.getByTestId("107-add-course-search").click();
        // expect(screen.queryAllByText(/Course not found/)).toHaveLength(1);
    });
});
