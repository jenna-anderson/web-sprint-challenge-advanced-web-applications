import React from 'react';
import axiosWithAuth from './../helpers/axiosWithAuth';

export const editColorService = (editColor) => {
    
}

export const deleteColorService = (colorToDelete) => {

    axiosWithAuth()
    .put(`/colors/${colorToDelete}`)
}