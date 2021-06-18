import React from 'react';
import { render, screen} from "@testing-library/react";
import ColorList from './ColorList';

const testColors = [
    {
        color: "testColor1",
        id:"testId1",
        code:{
            hex:"testHex1"
        }
    },
    {
        color: "testColor2",
        id:"testId2",
        code:{
            hex:"testHex2"
        }
    },
    {
        color: "testColor3",
        id:"testId3",
        code:{
            hex:"testHex3"
        }
    }
]

test("Renders an empty list of colors without errors", () => {
    render(<ColorList colors={[]}/>);
});

test("Renders a list of colors without errors", () => {
    render(<ColorList colors={testColors}/>);

    const newColor = screen.getByText(/testColor1/i);

    expect(newColor).toBeInTheDocument();
});

test("Renders the EditForm when editing = true and does not render EditForm when editing = false", () => {
    const { rerender } = render(<ColorList colors={testColors} editing={false}/>);
    let editForm = screen.queryByTestId("editMenu");
    expect(editForm).not.toBeInTheDocument();

    rerender(<ColorList colors={testColors} editing={true}/>);
    editForm = screen.queryByTestId("editMenu");
    expect(editForm).toBeInTheDocument();
});
