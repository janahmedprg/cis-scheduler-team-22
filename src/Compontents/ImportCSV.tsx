import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
//import { DegreePlan } from "../interfaces/DegreePlan";
//import the diff levels of state needed - or try all combined;
//import { CSVToPlan } converter function;

type ImportContentButtonProps = {
    //plans: DegreePlan[];
    //setPlans: (newPlans: DegreePlan[]) => void;
    content: string;
};

function ImportContentButton({
    //plans,
    //setPlans,
    content
}: ImportContentButtonProps): JSX.Element {
    return (
        <div>
            <Button
                disabled={content === "" || content === "Data cannot be loaded"}
                //onClick={() => CSVToPlan(content, plans, setPlans)}
                onClick={() => console.log("hiiiiiii")}
            >
                Upload Plan From CSV ⬆
            </Button>
        </div>
    );
}

export function CSVImport(): JSX.Element {
    //const { plans, setPlans } = usePlanContext();
    const [content, setContent] = useState<string>("");

    function uploadFile(event: React.ChangeEvent<HTMLInputElement>) {
        // Check that the file exists
        if (event.target.files && event.target.files.length) {
            // Get the first filename
            const file = event.target.files[0];

            if (file.name.slice(-4) !== ".csv") {
                console.log("Uploaded file is not a .csv");
                setContent("");
            }

            // Create a reader
            const reader = new FileReader();
            // Callback to handle file read-in
            reader.onload = (loadEvent) => {
                const newContent =
                    loadEvent.target?.result || "Data cannot be loaded";
                // FileReader provides string or ArrayBuffer, force it to be string
                setContent(newContent as string);
            };

            // Actually reads the file
            reader.readAsText(file, "utf-8");
        }
    }

    return (
        <div>
            <div>
                <Form.Group controlId="exampleForm">
                    <Form.Label>Upload a file</Form.Label>
                    <div>
                        <Form.Control type="file" onChange={uploadFile} />
                    </div>
                </Form.Group>
            </div>
            <ImportContentButton
                //plans={plans}
                //setPlans={setPlans}
                content={content}
            />
        </div>
    );
}
