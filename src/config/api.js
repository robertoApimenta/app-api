import axios from 'axios'

export default axios.create({
    //baseURL: 'http://localhost:5000/'
    baseURL: 'https://senai-back.herokuapp.com/',    
})