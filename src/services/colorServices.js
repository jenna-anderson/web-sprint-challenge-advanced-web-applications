import axiosWithAuth from './../helpers/axiosWithAuth';

export const editColorService = (editColor) => {
    axiosWithAuth()
    .put(`/colors/${editColor.id}`, editColor)
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    })
}

export const deleteColorService = (id, colors, setColors) => {

}