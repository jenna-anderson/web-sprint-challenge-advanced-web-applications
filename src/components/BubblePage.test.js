import React from 'react';
import { render, screen, waitFor} from "@testing-library/react";
import BubblePage from './BubblePage';

import fetchColorService from './../services/fetchColorService';
jest.mock('./../services/fetchColorService');

test("Renders without errors", ()=> {
    render(<BubblePage />);
});

test("Renders appropriate number of colors passed in through mock", async ()=> {
    const { rerender } = render(<BubblePage />);
    fetchColorService.mockResolvedValueOnce(
        [
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
    )

    rerender(<BubblePage />);

    await waitFor(() => {
        const colors = screen.queryAllByTestId("color");
        // const colors = screen.queryByText(/testColor1/i)

        expect(colors).toHaveLength(3);
        // expect(colors).toBeInTheDocument();
    })
});