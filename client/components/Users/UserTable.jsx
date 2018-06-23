import React from 'react'
import ReactTable from 'react-table'
import { getUsers } from '../../requests'
import { capitalize, splitByCapital } from '../../util'
import { getUser } from '../../auth'
import history from '../../history'
import moment from 'moment'

export class UserTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      users: []
    }
  }
  componentDidMount () {
    getUsers()
      .then((response) => {
        this.setState({ users: response })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  getColumns (users) {
    let columns = Object.keys(users[0])
    return columns.map((col) => {
      return {
        minWidth: col.length * 20,
        Header: capitalize(col),
        accessor: col,
        getProps:
          (state, rowInfo) => {
            if (col === 'active') {
              return {
                style: {
                  backgroundColor: (rowInfo.row.active === 'No' ? 'red' : 'green')
                }
              }
            } else {
              return {
                style: {
                  backgroundColor: null
                }
              }
            }
          }
      }
    })
  }

  prepareTableData () {
    let users = this.state.users.filter((user) => {
      return user.admin === 0
    })
    return users.map((user) => {
      let startDate = moment.unix(user.start_date)
      let endDate = moment.unix(user.start_date).add(user.subscription, 'months')
      let result = endDate.from(startDate)
      let active = endDate > moment()

      return {
        id: user.id,
        username: <a className='text-primary' onClick={() => { history.push('/user/' + user.id) }}> {user.username} </a>,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        active: active ? 'Yes' : 'No',
        expires: result
      }
    })
  }

  render () {
    let user = getUser()
    if (user && user.admin && this.state.users.length) {
      let users = this.prepareTableData()
      if (users.length) {
        let columns = this.getColumns(users)

        return <div>
          <ReactTable
            data={users}
            columns={columns}
            className={'-striped -highlight'}
            showPagination={false}
            defaultPageSize={users.length}
          />
        </div>
      } else {
        return <div>
          No users
        </div>
      }
    } else {
      if (!user || !user.admin) {
        return <div>
          You are not authenticated
        </div>
      } else {
        return <div>
          No users
        </div>
      }
    }
  }
}

export default UserTable
