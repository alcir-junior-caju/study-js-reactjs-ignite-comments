import { Children } from 'react';
import { Header, Post, Sidebar } from '../components'
import '../styles/global.css'
import styles from './App.module.css'

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/alcir-junior-caju.png',
      name: 'Alcir Junior',
      role: 'Web Developer'
    },
    content: [
      { type: 'paragraph', content: 'Primeira linha,' },
      { type: 'paragraph', content: 'Segunda linha com mais conteúdo' },
      { type: 'paragraph', content: 'Terceira linha com muito mais conteúdo!!!' },
      { type: 'link', content: 'jane.design/doctorcare' },
    ],
    publishedAt: new Date('2022-05-03 20:00:00')
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/alcir-junior-caju.png',
      name: 'Caju',
      role: 'FullStack Developer'
    },
    content: [
      { type: 'paragraph', content: 'Primeira linha,' },
      { type: 'paragraph', content: 'Segunda linha com mais conteúdo' },
      { type: 'paragraph', content: 'Terceira linha com muito mais conteúdo!!!' },
      { type: 'link', content: 'jane.design/doctorcare' },
    ],
    publishedAt: new Date('2022-05-15 20:00:00')
  }
];

export function App() {
  return (
    <>
      <Header />

      <section className={styles.wrapper}>
        <Sidebar />

        <main>
          {Children.toArray(posts.map(post => (
            <Post {...post} />
          )))}
        </main>
      </section>
    </>
  )
}
