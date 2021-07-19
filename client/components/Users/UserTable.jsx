import React, { useState, useEffect } from 'react'
import ReactTable from 'react-table'
import { getUsers } from '../../requests'
import { capitalize } from '../../utils/util'
import { getUser } from '../../auth'
import history from '../../utils/history'

export default function UserTable() {

  const [users, setUsers] = useState([])

  useEffect(() => {
    getUsers()
      .then((response) => {
        setUsers(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }, []);

  function getColumns(users) {
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

  function prepareTableData() {
    let userData = users.filter((user) => {
      return user.admin === 0
    })
    return userData.map((user) => {
      return {
        id: user.id,
        username: <a className='text-primary' onClick={() => { history.push('/user/' + user.id) }}> {user.username} </a>,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        subscription: <a className='text-primary' onClick={() => { history.push('/user/edit/' + user.id) }}> Edit</a>
      }
    })
  }

  let user = getUser()
  if (user && user.admin && users.length) {
    let userData = prepareTableData()
    if (userData.length) {
      let columns = getColumns(userData)

      return <div>
        <ReactTable
          data={userData}
          columns={columns}
          className={'-striped -highlight'}
          showPagination={false}
          defaultPageSize={userData.length}
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
