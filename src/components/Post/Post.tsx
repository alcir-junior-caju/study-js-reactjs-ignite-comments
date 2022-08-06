import { ChangeEvent, Children, FormEvent, InvalidEvent, useState } from 'react'
import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Avatar } from '../Avatar'
import { Comment } from '../Comment'
import styles from './Post.module.css'

type Author = {
  name: string;
  role: string;
  avatarUrl: string;
}

type Content = {
  type: 'paragraph' | 'link';
  content: string;
}

interface PostProps {
  author: Author;
  content: Content[];
  publishedAt: Date;
}

export function Post ({ author, content, publishedAt }: PostProps) {
  const [comments, setComments] = useState([
    'Post muito bacana, hein?!'
  ]);
  const [newCommentText, setNewCommentText] = useState('');
  const isNewCommentEmpty = newCommentText.length === 0

  const publishedDateFormatted = format(
    publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    {
      locale: ptBR
    }
  )

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true
  })

  const handleCreateNewComment = (event: FormEvent) => {
    event.preventDefault();

    setComments([...comments, newCommentText]);
    setNewCommentText('')
  };

  const handleNewComment = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.target.setCustomValidity('')
    setNewCommentText(event.target.value);
  }

  const deleteComment = (commentToDelete: string) => {
    const commentsWithoutDeleteOne = comments.filter(
      comment => {
        return comment !== commentToDelete
      }
    )

    setComments(commentsWithoutDeleteOne)
  }

  const handleNewCommentInvalid = (event: InvalidEvent<HTMLTextAreaElement>) => {
    event.target.setCustomValidity('Esse campo é obrigatório')
  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar
            src={author.avatarUrl}
            alt={author.name}
            hasBorder
          />
          <div className={styles.info}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time
          title={publishedDateFormatted}
          dateTime={publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>

      <section className={styles.content}>
        {Children.toArray(content.map(line => {
          if (line.type === 'paragraph') return (<p>{line.content}</p>)
          if (line.type === 'link') return (<p><a href="#">{line.content}</a></p>)
        }))}
      </section>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          name="comment"
          placeholder="Deixe um comentário"
          onChange={handleNewComment}
          value={newCommentText}
          onInvalid={handleNewCommentInvalid}
          required
        />

        <footer>
          <button
            disabled={isNewCommentEmpty}
            type="submit"
          >
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {Children.toArray(comments.map(comment => (
          <Comment content={comment} onDeleteComment={deleteComment} />
        )))}
      </div>
    </article>
  )
}
