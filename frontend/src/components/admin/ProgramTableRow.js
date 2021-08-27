import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import '../../admin/containers/Students.css'
import dummy_avatar from '../../assets/man.svg'
import { load_lk_programs_list } from '../../redux/actions/admin/adminPrograms'

const ProgramTableRow = props => {
  console.log(props)
  const {
    category,
    update_modal,
    delete_modal,
    programs_list,
    load_lk_programs_list,
  } = props

  const { id, name } = category

  const [programVisible, setProgramVisible] = useState('')
  const [programsList, setProgramsList] = useState([])


  useEffect(() => {
    setProgramsList(programs_list)
  }, [programs_list])

  const groupToggle = slug => {
    if (slug === programVisible) {
      setProgramsList([])
      setProgramVisible('')
    } else {
      load_lk_programs_list(slug)
      setProgramVisible(slug)
    }
  }

  return (
    <tr>
      <td>
        <div
          onClick={() => groupToggle(category.slug)}
          style={{ cursor: 'pointer' }}
        >
          {name}
        </div>
        {programVisible === category.slug && (
          <table className='table table-striped table-hover'>
            <tbody>
              {programsList.length > 1 &&
                programsList.map(item => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>
                      <a
                        className='edit'
                        data-toggle='modal'
                        onClick={() => program_update_modal(item.id)}
                      >
                        <i
                          className='material-icons'
                          data-toggle='tooltip'
                          title='Edit'
                        >
                          &#xE254;
                        </i>
                      </a>
                      <a
                        className='delete'
                        data-toggle='modal'
                        onClick={() => program_delete_modal(item.id)}
                      >
                        <i
                          className='material-icons'
                          data-toggle='tooltip'
                          title='Delete'
                        >
                          &#xE872;
                        </i>
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </td>
      <td>
        <a
          className='edit'
          data-toggle='modal'
          onClick={() => update_modal(id)}
        >
          <i className='material-icons' data-toggle='tooltip' title='Edit'>
            &#xE254;
          </i>
        </a>
        <a
          className='delete'
          data-toggle='modal'
          onClick={() => delete_modal(id)}
        >
          <i className='material-icons' data-toggle='tooltip' title='Delete'>
            &#xE872;
          </i>
        </a>
      </td>
    </tr>
  )
}

const mapStateToProps = state => {
  programs_list: state.adminPrograms.lk_categories
}

export default connect(mapStateToProps, { load_lk_programs_list })(
  ProgramTableRow
)
