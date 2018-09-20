import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Header, Card, Dropdown, Divider, Button } from 'semantic-ui-react'
import PostForm from './PostForm'


class Posts extends React.Component {
  state = { author: '', showForm: false }

  toggleForm = () => {
    this.setState({ showForm: !this.state.showForm }) 
  }

authorOptions = () => {
    const { authors } = this.props
    return authors.map( (a) => { return { key: a, text: a, value: a } } )
  }

  posts = () => {
    const { posts } = this.props
    const { author } = this.state

    let visible = posts

    if (author) 
      visible = posts.filter( p => p.author === author )

    return visible.map( post => {
      const { title, id, mood, author } = post
      return (
        <Card key={id}>
          <Card.Content>
            <Card.Header>
              {title}
            </Card.Header>
            <Card.Meta>
              <span>Author: {author}</span>
            </Card.Meta>
            <Card.Description>
              Mood: {mood}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Link to={`/posts/${post.id}`}>
              View Post
            </Link>
          </Card.Content>
        </Card>
      )
    })
  }

  handleChange = (_, { value }) => {
    this.setState({ author: value })
  }

  render() {
    const { author, showForm } = this.state

    return (
      <Container>
        <Header as="h3" textAlign="center">Posts</Header>
        <Button color='green' fluid onClick={this.toggleForm}>
          { showForm ? 'Hide Form' : 'Create a Post' }
        </Button>
        <Divider />
        { showForm ?
            <PostForm closeForm={this.toggleForm} />
            :
            <Fragment>
              <Dropdown
                placeholder="Filter by Author..."
                fluid
                selection
                options={this.authorOptions()}
                value={author}
                onChange={this.handleChange}
              />
              { author && 
                  <Button
                    fluid
                    basic
                    onClick={ () => this.setState({ author: '' }) }
                  >
                    Clear Filter: {author}
                  </Button>
              }
              <Divider />
              <Card.Group itemsPerRow={1} stackable>
                { this.posts() }
              </Card.Group>
            </Fragment>
          }
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  const { posts } = state
  const authors = [...new Set(posts.map( p => p.author ))]
  return { posts, authors }
}

export default connect(mapStateToProps)(Posts)