import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import useInputs from '../hooks/useInputs';

const FormStyle = styled.div`
  & > form {
    padding: 0 10px;
    margin-bottom: 50px;
  }
  & > form > textarea {
    padding: 5px 1%;
    width: 98%;
    height: 50px;
  }
  & > form > input[type='text'] {
    padding: 5px 1%;
    width: 98%;
    margin-bottom: 10px;
  }
  & > form > button {
    padding: 0.375rem 0.75rem;
    border-radius: 0.25rem;
    border: 1px solid lightgray;
    cursor: pointer;
  }
`;

function Form({ comment, onCreate, onModify }) {
  const [{ profile_url, content, author, createdAt }, onChange, reset] = useInputs({
    profile_url: '',
    content: '',
    author: '',
    createdAt: '',
  });
  const isCreate = useMemo(() => !comment.id, [comment]);

  const handleCreate = event => {
    event.preventDefault();
    onCreate({ profile_url, content, author });
  };

  const handleModify = event => {
    event.preventDefault();
    onModify({ profile_url, content, commentId: comment.id, author: comment.author, createdAt: comment.createdAt });
  };

  useEffect(() => {
    if (comment.id) {
      const { profile_url, content, author, createdAt } = comment;
      reset({ profile_url, content, author, createdAt });
    } else {
      reset();
    }
  }, [comment]);

  return (
    <FormStyle>
      <form onSubmit={e => (isCreate ? handleCreate(e) : handleModify(e))}>
        <input
          type="text"
          name="profile_url"
          value={profile_url}
          placeholder="https://picsum.photos/id/1/50/50"
          onChange={onChange}
          required
        />
        <br />
        <input type="text" name="author" value={author} placeholder="작성자" onChange={onChange} disabled={!isCreate} />
        <br />
        <textarea name="content" value={content} placeholder="내용" onChange={onChange} required />
        <br />
        <input
          type="text"
          name="createdAt"
          value={createdAt}
          placeholder="2020-05-30"
          onChange={onChange}
          disabled={!isCreate}
          required
        />
        <br />
        {isCreate ? <button type="submit">등록</button> : <button type="submit">수정</button>}
      </form>
    </FormStyle>
  );
}

export default Form;
