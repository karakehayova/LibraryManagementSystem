import React from 'react'
import { connect } from 'react-redux'
import Remarkable from 'remarkable'
import { SetPosts } from '../../utils/actions/Blogs/blogs'
import {getBookById} from '../requests'
import history from '..//history'

export class PreviewBook extends React.Component {
	deletePost(id){
		deletePostById(id)
		.then(()=>{
			getPosts()
			.then((response)=>{
				this.props.SetPosts(response.data)
			})
			.catch((error)=>{
				console.log(error)
			})
	}) 
	.catch((error)=>{
		console.log(error)
	})
	}
  render () {
		let post = this.props.data
    let contentMd = markDown.render(post.content)
    let renderMd = { __html: contentMd }
    return (
      <div className='card text-center' style={{'width': '60%'}}>
        <div className='card-header'>
          {post.title}
          <span style={{'float': 'right'}}>
						<span onClick={() => { this.deletePost(post.id)
						}}> 
              <i className='material-icons'>delete</i>
            </span>
            <span onClick={() => {
              history.push(`/edit/${post.id}`)
            }}>
              <i className='material-icons'>edit</i>
            </span>
          </span>
        </div>

        <img className='media-object' src={post.url} />
        <div className='card-body'>
          <h5 className='card-title'>{'Added by: ' + post.author + ' on ' + post.date}</h5>
          <h5 className='card-subtitle text-muted'>{'Status: ' + post.status}</h5>
          <span dangerouslySetInnerHTML={renderMd} />
        </div>
      </div>
    )
  }
}
