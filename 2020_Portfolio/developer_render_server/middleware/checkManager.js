import axios from 'axios'

export default function ({ route }) {
    return axios.get('http://localhost:4001/user/checkManager', {
        url: route.fullPath
    })
}