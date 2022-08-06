import { ThumbsUp, Trash } from 'phosphor-react'
import { useState } from 'react'
import { Avatar } from '../Avatar'
import styles from './Comment.module.css'

interface CommentProps {
  content: string;
  onDeleteComment: (comment: string) => void;
}

export function Comment ({ content, onDeleteComment }: CommentProps) {
  const [likeCount, setLikeCount] = useState(0)

  const handleDeleteComment = () => onDeleteComment(content)

  const handleLikeComment = () => setLikeCount(state => state + 1)

  return (
    <section className={styles.comment}>
      <Avatar src="https://github.com/alcir-junior-caju.png" alt="Alcir Junior" />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Alcir Junior</strong>
              <time
                title="11 de maio às 08:00"
                dateTime="2022-05-11 08:00:00"
              >
                Cerca de 1h atrás
              </time>
            </div>

            <button onClick={handleDeleteComment} title="Deletar comentário">
              <Trash size={24} />
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp size={20} />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </section>
  )
}
