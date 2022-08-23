import React, { useMemo } from 'react';
import PageList from '../components/PageList';
import { connect } from 'react-redux';
import { getList } from '../redux/modules/comments';

function PageListContainer({ paging, getCommentList }) {
  const { page, totalPage } = useMemo(
    () => ({ page: paging.page, totalPage: Array.from({ length: paging.totalPage }, (v, i) => i + 1) }),
    [paging],
  );

  return <PageList page={page} totalPage={totalPage} getCommentList={getCommentList} />;
}

const mapStateToProps = state => ({
  paging: state.comments.paging,
});

const mapDispatchToProps = dispatch => ({
  getCommentList: page => dispatch(getList({ page })),
});

export default connect(mapStateToProps, mapDispatchToProps)(PageListContainer);
