import React, { useEffect, useState } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

import { editColorService, deleteColorService } from '../services/colorServices';
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
    console.log("editColor", editColor)
    console.log("editColor.color", editColor.color)
    axiosWithAuth()
    .put(`/colors/${editColor.id}`, editColor)
    .then(res => {
        const editedColor = res.data
        console.log(editedColor)
        const newColorList = colors.filter(color => color.id != editColor.id);
        setColors(newColorList);
        console.log(colors)
        setColors([
          ...colors,
          editedColor
        ])
    })
    .catch(err => {
        console.log(err)
    })
  };

  console.log(colors)

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
