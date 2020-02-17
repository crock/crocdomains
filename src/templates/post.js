import React from 'react'
import { graphql } from 'gatsby'
import SEO from '../components/seo'
import styled from 'styled-components'
import withUtterances from 'with-utterances'

const PostDate = styled.small`
  text-transform: uppercase;
  font-size: 0.85rem;
  font-weight: normal;
  color: #9e9e9e;
`

const PostTitle = styled.h1`
  font-weight: bold;
  font-size: 1.5rem;
  color: black;
  margin-bottom: 15px;
`

const ArticleBody = styled.div`
  margin-top: 15px;

  p {
    font-weight: normal;
    font-size: 1rem;
    line-height: 2rem;

    img {
      width: 100px;
      transition: width 1s;

      &:hover {
        width: 400px;
      }
    }
  }
`

const Category = styled.span`
  background-color: #d9d9d9;
  padding: 4px 8px;
  color: white;
  border-radius: 8px;
  margin: 3px;
`

const PostTemplate = function Template({ data }) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  const { categories } = frontmatter

  return (
    <>
      <SEO title={frontmatter.title} />
      <article className="post">
        <div className="post-header">
          <PostDate>{frontmatter.date}</PostDate>
          <PostTitle>{frontmatter.title}</PostTitle>
          {categories.map(cat => (
            <Category key={cat}>{cat}</Category>
          ))}
        </div>
        <ArticleBody
          className="post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>
    </>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        categories
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`

export default withUtterances(PostTemplate, 'crock/swamp-comments', 'github-light', 'pathname')
