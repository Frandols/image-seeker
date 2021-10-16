import { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import './header.css'
import './content.css'
import './article.css'

function App(){
  const [images, setImages] = useState([])
  
  const open = url => window.open(url)
  return (
    <div>
      <header>
        <Formik
        initialValues={{ search: '' }}
        onSubmit={async values => {
          const response = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`, {
            headers: {
              'Authorization': 'Client-ID zGzgl404xH1Eio1uuLlCk6VkQvIca1vMN3m08Vt1_K4'
            }
          })
          const data = await response.json()

          setImages(data.results)
        }}>
          <Form>
            <Field name='search' />
          </Form>
        </Formik>
      </header>
      <div className='container'>
        <div className='center'>
          {
            images.map(
              image => 
              <article key={image.id} onClick={() => open(image.links.html)}>
                <img src={image.urls.regular} />
                <p>{[image.description, image.alt_description].join(' - ')}</p>
              </article>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default App
