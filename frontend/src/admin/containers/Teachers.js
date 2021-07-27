import React, {useState, useEffect, Fragment} from 'react';
import {connect} from "react-redux";
import '../hocs/AdminLayout.scss'
import './Teachers.css'
import {Redirect} from 'react-router-dom'
import StudentTableRow from "../../components/admin/StudentTableRow";

const Teachers = ({isAuthenticated, user}) => {

  const tableData = [
    {
      id: 1,
      photo: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1609106/headshot.png',
      name: 'Thomas Hardy',
      mail: 'thomashardy@mail.com',
      phone: '(171) 555-2222',
    },
    {
      id: 2,
      photo: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1609106/headshot.png',
      name: 'Thomas Hardy',
      mail: 'thomashardy@mail.com',
      phone: '(171) 555-2222',
    },
    {
      id: 3,
      photo: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1609106/headshot.png',
      name: 'Thomas Hardy',
      mail: 'thomashardy@mail.com',
      phone: '(171) 555-2222',
    },
    {
      id: 4,
      photo: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1609106/headshot.png',
      name: 'Thomas Hardy',
      mail: 'thomashardy@mail.com',
      phone: '(171) 555-2222',
    },
    {
      id: 5,
      photo: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1609106/headshot.png',
      name: 'Thomas Hardy',
      mail: 'thomashardy@mail.com',
      phone: '(171) 555-2222',
    },
  ]

  const [itemsToDelete, setItemsToDelete] = useState([])

  const handleBunchDelete = () => {
    console.log(itemsToDelete)
    for(let i = 0; i < itemsToDelete.length; i++) {
      console.log(itemsToDelete[i])
    }
  }

  if (!isAuthenticated) {
    return <Redirect to='/login'/>
  }

  const updateRow = id => {
    console.log(id)
  }

  const deleteRow = id => {
    console.log(id)
  }

  useEffect(() => {

  })

  const collectId = n => {
    console.log(n)
    if(!itemsToDelete.includes(n)) {
      setItemsToDelete([
        ...itemsToDelete,
        n
      ])
    }
  }

  const [selectedAll, setSelectedAll] = useState(false)
  const [deleteActive, setDeleteActive] = useState(false)

  return (
    <Fragment>

      <div
        className={`modal fade ${deleteActive ? "show" : ""}`}
        style={{display: deleteActive ? "block" : "none"}}
      >
        <div className="modal-dialog">
          <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Удаление преподавателей</h4>
                <button type="button" className="close" aria-hidden="true" onClick={() => setDeleteActive(false)}>&times;</button>
              </div>
              <div className="modal-body">
                <p>Вы уверены, что хотите удалить эти записи?</p>
                <p className="text-warning"><small>Это действие нельзя отменить!</small></p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-default" onClick={() => setDeleteActive(false)}>Отменить</button>
                <button className="btn btn-danger" onClick={() => handleBunchDelete()}>Удалить</button>
              </div>
          </div>
        </div>
      </div>

      <div className="main-body__users">
        <div className="cards">
          <div className="cards__header table-title">
            <div className="cards__header-title admin-text-light">Управление <strong>преподавателями</strong>
            </div>
            <div>
              <button
                className="btn btn-success"
              ><i className="material-icons">&#xE147;</i> <span>Добавить преподаателя</span>
              </button>
              <button
                className="btn btn-danger"
                onClick={() => setDeleteActive(true)}
              ><i
                className="material-icons">&#xE15C;</i> <span>Удалить</span></button>
            </div>
          </div>
          {/*<div className="cards">*/}
          {/*  <table className="table table-striped table-hover">*/}
          {/*    <thead>*/}
          {/*    <tr>*/}
          {/*      <th>*/}
          {/*  <span className="custom-checkbox">*/}
					{/*			<input*/}
          {/*        type="checkbox"*/}
          {/*        id="selectAll"*/}
          {/*        checked={selectedAll}*/}
          {/*        onChange={e => setSelectedAll(e.target.checked)}*/}
          {/*      />*/}
					{/*			<label htmlFor="selectAll"/>*/}
					{/*		</span>*/}
          {/*      </th>*/}
          {/*      <th>Фото</th>*/}
          {/*      <th>Имя</th>*/}
          {/*      <th>Почта</th>*/}
          {/*      <th>Телефон</th>*/}
          {/*      <th>Действия</th>*/}
          {/*    </tr>*/}
          {/*    </thead>*/}
          {/*    <tbody>*/}
          {/*    {tableData.map(item => (*/}
          {/*        <StudentTableRow*/}
          {/*          key={item.id}*/}
          {/*          phone={item.phone}*/}
          {/*          id={item.id}*/}
          {/*          mail={item.mail}*/}
          {/*          name={item.name}*/}
          {/*          photo={item.photo}*/}
          {/*          is_selected={selectedAll}*/}
          {/*          pass_id={collectId}*/}
          {/*          update_modal={updateRow}*/}
          {/*          delete_modal={deleteRow}*/}
          {/*        />*/}
          {/*      ))}*/}
          {/*    </tbody>*/}
          {/*  </table>*/}
          {/*</div>*/}
        </div>
      </div>
    </Fragment>
);

}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
})

export default connect(mapStateToProps,)(Teachers);
