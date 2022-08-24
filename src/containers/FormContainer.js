import React from 'react';
import Form from '../components/Form';
import { connect } from 'react-redux';
import { create, modify, setDetail } from '../redux/modules/comments';

function FormContainer({ detail, onCreate, setModify, onModify }) {
  return <Form comment={detail.data} onCreate={onCreate} setModify={setModify} onModify={onModify} />;
}

const mapStateToProps = state => ({
  detail: state.comments.detail,
});

const mapDispatchToProps = dispatch => ({
  onCreate: ({ author, profile_url, content }) => dispatch(create({ author, profile_url, content })),
  setModify: ({ author, profile_url, content, createdAt }) =>
    dispatch(setDetail({ author, profile_url, content, createdAt })),
  onModify: ({ commentId, profile_url, content, author, createdAt }) =>
    dispatch(modify({ commentId, profile_url, content, author, createdAt })),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);
