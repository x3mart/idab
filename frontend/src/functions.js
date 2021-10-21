import Moment from 'moment'

export const isNotEmptyObject = obj => {
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      return true
    }
  }
  return false
}

export const proper_phone = str => {
  let ar = str.split('')
  ar.splice(10, 0, '-')
  ar.splice(8, 0, '-')
  ar.splice(5, 0, ' ')
  ar.splice(5, 0, ')')
  ar.splice(2, 0, '(')
  ar.splice(2, 0, ' ')
  return ar.join('')
}

export const proper_date = str => {
  Moment.locale('ru')
  return Moment(str).format('DD.MM.YYYY')
}
