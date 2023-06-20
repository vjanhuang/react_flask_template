import React from 'react'
import { useState } from 'react'
import APIService from './APIServices'

function InsertForm({ insertedArticle, insertData }) {
    const [title, setTitle] = useState(insertedArticle.title)
    const [body, setBody] = useState(insertedArticle.body)
    const insertArticle = () => {
        APIService.InsertArticle({ title, body })
            .then(resp => insertData(resp))
            .catch(error => console.log(error))
    }
    return (
        <div>
            {
                insertedArticle ? (
                    <div className="mb-3">
                        <label htmlform="title" className='form-label'>Title</label>
                        <input type="text" className='form-control' value={title} placeholder="please enter title" onChange={(e) => setTitle(e.target.value)} />
                        <label htmlform="body" className='form-label'>Article</label>
                        <textarea className='form-control' value={body} placeholder="please enter article" onChange={(e) => setBody(e.target.value)} />
                        <button className='btn btn-success mt-3' onClick={insertArticle}>Add</button>
                    </div>
                ) : null
            }
        </div>
    )
}

export default InsertForm