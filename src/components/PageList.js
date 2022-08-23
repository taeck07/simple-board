import React from 'react';
import styled from 'styled-components';

const PageListStyle = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

const Page = styled.button`
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid lightgray;
  margin-right: 3px;
`;

const InactivePage = styled(Page)`
  &:hover {
    cursor: pointer;
  }
`;

const ActivePage = styled(Page)`
  background: gray;
  color: #fff;
  &:hover {
    cursor: not-allowed;
  }
`;

function PageList({ page, totalPage, getCommentList }) {
  return (
    <PageListStyle>
      {totalPage.map(_page =>
        page === _page ? (
          <ActivePage key={_page} disabled>
            {_page}
          </ActivePage>
        ) : (
          <InactivePage key={_page} onClick={() => getCommentList(_page)}>
            {_page}
          </InactivePage>
        ),
      )}
    </PageListStyle>
  );
}

export default PageList;
