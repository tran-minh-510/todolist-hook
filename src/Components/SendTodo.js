import React from 'react'
import { useState } from 'react'

export default function SendTodo(props) {
    const { setListJobs } = props
    const [valueInput, setValueInput] = useState('')

    const handleChangeValue = (e) => {
        setValueInput(e.target.value)
    }

    const handleForm = (e) => {
        e.preventDefault()
        const data = {
            content: valueInput,
            isChecked: false
        }
        setValueInput('')
        setListJobs(prev => [...prev, data])
        fetch('http://localhost:3004/jobs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }
    return (
        <>
            <div className="w-25">
                <h2>TodoList</h2>
                <form onSubmit={handleForm}>
                    <div className="d-flex">
                        <input type="text" className="form-control mx-3" onChange={handleChangeValue} value={valueInput} />
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}
