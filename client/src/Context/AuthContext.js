import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import BASE_URL from '../config'


export const DataContext = createContext(null)

const AuthContext = (props) => {

    const [user, setUser] = useState(null) // null = no user
    const [loading, setLoading] = useState(true)
    const [creatingRepo, setCreatingRepo] = useState(false)
    const [problems, setProblems] = useState([])

    useEffect(() => {
        // axios.get('http://localhost:4060/auth/me', {
        axios.get(`http://${BASE_URL}/auth/me`, {
            withCredentials: true // this sends session cookie automaticallly
        })
            .then(res => {
                setUser(res.data)
                setLoading(false)
            })
            .catch(() => {
                setUser(null)
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        // axios.get('http://localhost:4060/problems')
        axios.get(`http://${BASE_URL}:4060/problems`)
            .then(res => setProblems(res.data))
            .catch(error => console.log(error))
    }, [])

    return (
        <DataContext.Provider value={{ user, setUser, loading, setLoading, problems, setProblems, creatingRepo, setCreatingRepo }}>
            {props.children}
        </DataContext.Provider>
    )
}

export default AuthContext