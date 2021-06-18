import axiosWithAuth from '../helpers/axiosWithAuth';
import axios from 'axios';

const fetchColorService = (setColors) => {
        axiosWithAuth()
        .get('/colors')
        .then(res => {
            setColors(res.data)
        })
        .catch(err => {
            console.log(err);
            return err;
        }) 
}

export default fetchColorService;