import React, {useEffect} from "react";
import {connect} from 'react-redux'
import {load_groups_list} from "../../../redux/actions/admin/groups";

const SelectGroup = ({action, load_groups_list, groups_list}) => {

  useEffect(() => {
    load_groups_list()
  }, [])

  const handleAction = e => {
    action(e.target.value)
  }

  return (
    <div className='form-group group-select'>
      <select
        className='form-select'
        aria-label='Выберите группу'
        onChange={handleAction}
      >
        <option defaultValue>Выберите группу</option>
        {groups_list &&
          groups_list.map(item => (
            <option
              key={item.id}
              name={item.name}
              value={item.id}
            >
              {item.name}
            </option>
          ))}
      </select>
    </div>
  )
}

const mapStateToProps = state => ({
  groups_list: state.groups.groups,
})

export default connect(mapStateToProps, {load_groups_list})(SelectGroup)
