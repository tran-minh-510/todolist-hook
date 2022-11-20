import React from 'react'
import SendTodo from './SendTodo'
import ShowComments from './ShowComments/ShowComments'
import { useState, useEffect } from 'react'

export default function TodoList() {
    const [listJobs, setListJobs] = useState([])

    useEffect(() => {
        async function fetchData() {
            const res = await fetch('http://localhost:3004/jobs?_sort=id,isChecked&_order=desc,asc')
            let data = await res.json()
            const arrIsCheckedFalse = data.filter(({ isChecked }) => isChecked === false)
            const arrIsCheckedTrue = data.filter(({ isChecked }) => isChecked === true)
            data = [...arrIsCheckedFalse, ...arrIsCheckedTrue]
            if (listJobs.length !== data.length || JSON.stringify(listJobs) !== JSON.stringify(data)) {
                setListJobs(data)
            }
        }
        fetchData()
    }, [listJobs])
    return (
        <>
            <SendTodo setListJobs={setListJobs} />
            <ShowComments listJobs={listJobs} setListJobs={setListJobs} />
        </>
    )
}
