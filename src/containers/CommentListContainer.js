import React, { useEffect } from 'react';
import CommentList from '../components/CommentList';
import { connect } from 'react-redux';
import { getList, getDetail, deleteCmm } from '../redux/modules/comments';

function CommentListContainer({ commentList, onGetList, onGetDetail, onDelete }) {
  useEffect(() => {
    onGetList({ page: 1 });
  }, []);

  return <CommentList list={commentList} getList={onGetList} getDetail={onGetDetail} onDelete={onDelete} />;
}

const mapStateToProps = state => ({
  commentList: state.comments.list,
});

const mapDispatchToProps = dispatch => ({
  onGetList: params => dispatch(getList({ ...params })),
  onGetDetail: commentId => dispatch(getDetail({ commentId })),
  onDelete: commentId => dispatch(deleteCmm({ commentId })),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentListContainer);
