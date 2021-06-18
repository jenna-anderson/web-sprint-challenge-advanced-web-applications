import React from 'react';
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Color from './Color';

const testColor = {
    color: "testColor",
    id:"testId",
    code:{
        hex:"testHex"
    }
}

test("Renders without errors with blank color passed into component", () => {
    render(<Color color={{color:"", id:"", code:""}}/>);
});
  
test("Renders the color passed into component", () => {
    render(<Color color={testColor}/>)
    const newColor = screen.queryByText(/testColor/i)
    expect(newColor).toBeInTheDocument();
});

test("Executes handleDelete and toggleEdit property when the 'x' icon is clicked", () => {
    const mockHandleDelete = jest.fn();
    const mockToggleEdit = jest.fn();

    // Act
    render(<Color color={testColor} deleteColor={mockHandleDelete} toggleEdit={mockToggleEdit}/>)

    // Arrange
    const xButton = screen.getByTestId("delete");
    userEvent.click(xButton)

    // Assert
    expect(mockHandleDelete).toHaveBeenCalled();
    expect(mockToggleEdit).toHaveBeenCalled();
});

test("Executes setEditColor and toggleEdit property when color div is clicked", () => {
    const mockSetEditColor = jest.fn();
    const mockToggleEdit = jest.fn();

    // Act
    render(<Color color={testColor} setEditColor={mockSetEditColor} toggleEdit={mockToggleEdit}/>)

    // Arrange
    const colorDiv = screen.getByTestId("color");
    userEvent.click(colorDiv)

    // Assert
    expect(mockSetEditColor).toHaveBeenCalled();
    expect(mockToggleEdit).toHaveBeenCalled();
});