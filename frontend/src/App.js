import './App.css';
import ArticleList from './component/ArticleList';
import { useState, useEffect } from 'react';
import UpdateForm from './component/UpdateForm';
import InsertForm from './component/InsertForm';
import APIService from './component/APIServices';

function App() {
  const [articles, setArticles] = useState([])
  const [editedArticle, setEditedArticle] = useState(null)
  const [insertedArticle, setInsertedArticle] = useState(null)
  useEffect(() => {
    fetch('http://127.0.0.1:5000/get', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(resp => setArticles(resp))
      .catch(error => console.log(error));
  }, [])

  const editArticle = (article) => {
    setEditedArticle(article)
  }

  const insertArticle = () => {
    setInsertedArticle({ title: '', body: '' })
  }

  const deleteArticle = (article) => {
    APIService.DeleteArticle(article.id)
      .then(() => deleteData(article))
      .catch(error => console.log(error))
  }

  const updateData = (article) => {
    const new_articles = articles.map(my_article => {
      if (my_article.id === article.id) {
        return article
      } else {
        return my_article
      }
    })
    setEditedArticle(null)
    setArticles(new_articles)
  }

  const insertData = (article) => {
    const new_articles = [...articles, article]
    setInsertedArticle(null)
    setArticles(new_articles)
  }

  const deleteData = (article) => {
    const new_articles = articles.filter(my_article => {
      if (my_article.id === article.id) {
        return false
      } else {
        return true
      }
    })
    setArticles(new_articles)
  }

  return (
    <div className="App">
      <h1>Flask and React Test</h1>
      <button className='btn btn-success' onClick={insertArticle}>Add</button>
      <ArticleList articles={articles} editArticle={editArticle} deleteArticle={deleteArticle} />
      {editedArticle ? <UpdateForm editedArticle={editedArticle} updateData={updateData} /> : null}
      {insertedArticle ? <InsertForm insertedArticle={insertedArticle} insertData={insertData} /> : null}
    </div>
  );
}

export default App;
