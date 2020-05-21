import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Layout from '../layouts/'
import SEO from '../components/seo'
import { kebabCase } from 'lodash'

const IndexPage = () => {
  const postData = useStaticQuery(graphql`
    {
      allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}, filter: {frontmatter: {type: {eq: "blog"}}}) {
        edges {
          node {
            id
            html
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              title
            }
          }
        }
      }
    }
  `)
  const posts = postData.allMarkdownRemark.edges.map(edge => edge.node)

  return (
    <Layout>
      <SEO title="Croc's Swamp" description="Where Alex Crocker shares his throughts and knowledge on tech, design, coding, and domain names." />
      <main className="container mx-auto px-4 md:p-0">
        <h1 className="page-title">Welcome to Croc's Swamp!</h1>
        <section>
          <h2>About Me</h2>
          <p>Hi, <strong>my name is Alex</strong>, it's nice to meet you! I am a passionate <strong>full-stack web developer</strong> with countless ideas to make the world a better place through my work. When I'm not <strong>helping my clients fulfill their visions</strong> and <strong>mentoring aspiring young developers</strong> on the <a href="https://devcord.com">Devcord Discord server</a>, I can be found learning new techniques and building new things to further my career. I have a <strong>commitment to lifelong learning</strong>, which is especially important in the tech industry.</p>
        </section>

        <section>
          <h2>The Blog</h2>
          <ul>
            {posts.map(post => (
              <li key={post.id} className="article-list-item">
                <time dateTime={post.frontmatter.date}>{post.frontmatter.date}</time>
                <Link to={`/blog/${ kebabCase(post.frontmatter.title.replace(/&/g,'-and-')) }`}>
                {post.frontmatter.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Projects</h2>
          <ul>
            <li></li>
          </ul>
        </section>
      </main>
    </Layout>
  )
}

export default IndexPage