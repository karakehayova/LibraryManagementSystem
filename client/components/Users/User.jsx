import React from 'react'
import ReactTable from 'react-table'
import { getUserByID } from '../../requests'
import { capitalize, splitByCapital } from '../../util'
import { getUser } from '../../auth'
import history from '../../history'

import BooksTable from '../Books/BooksTable'

export class User extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			user: {},
			id: ''
		}
	}

	componentDidMount() {
		if (this.state.id) {
			getUserByID(this.state.id)
				.then((response) => {
					console.log(response)
					this.setState({ user: response })
				})
				.catch((error) => {
					console.log(error)
				})
		}
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (prevState.id !== nextProps.match.params.id) {
			return { id: nextProps.match.params.id }
		}
		return null
	}

	render() {
		return <div>
			<BooksTable userId={this.state.id} />
		</div>
	}
}

export default User
