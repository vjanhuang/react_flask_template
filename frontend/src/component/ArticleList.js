import React from 'react'

function ArticleList({ articles, editArticle, deleteArticle }) {
    return (
        articles.map(article => {
            return (
                <div key={article.id}>
                    <h2>{article.title}</h2>
                    <p>{article.body}</p>
                    <p>{article.date}</p>
                    <div className='row'>
                        <button className='btn btn-primary' onClick={() => editArticle(article)}>Update</button>
                        <button className='btn btn-danger' onClick={() => deleteArticle(article)}>Delete</button>
                    </div>
                </div>
            )
        })
    )
}

export default ArticleList