import React, { useEffect, useState } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

import fetchColorService from '../services/fetchColorService';
import axiosWithAuth from './../helpers/axiosWithAuth';

const BubblePage = () => {
  const [colors, setColors] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchColorService(setColors)
  }, [])

  const toggleEdit = (value) => {
    setEditing(value);
  };

  const saveEdit = (editColor) => {
    axiosWithAuth()
    .put(`/colors/${editColor.id}`, editColor)
    .then(res => {
        const editedColor = res.data
        const colorsIndex = colors.findIndex(color => color.id === editColor.id)
        const newArray = [...colors];
        newArray[colorsIndex] = {...newArray[colorsIndex], color: editedColor.color, code: editedColor.code}
        setColors(newArray)

    })
    .catch(err => {
        console.log(err)
    })
  };

  const deleteColor = (colorToDelete) => {
    axiosWithAuth()
    .delete(`/colors/${colorToDelete.id}`)
    .then(res => {
        const deleteId = res.data;
        const newColorList = colors.filter(color => color.id != deleteId);
        setColors(newColorList);
    })
    .catch(err => {
        console.log(err)
    })
  };

  return (
    <div className="container">
      <ColorList colors={colors} editing={editing} toggleEdit={toggleEdit} saveEdit={saveEdit} deleteColor={deleteColor}/>
      <Bubbles colors={colors}/>
    </div>
  );
};

export default BubblePage;

//Task List:
//1. When the component mounts, make an axios call to retrieve all color data and push to state.
//2. Complete saveEdit, deleteColor functions
