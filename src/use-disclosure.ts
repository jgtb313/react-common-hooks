import { useState } from 'react'

export const useDisclosure = (defaultValue = false): [boolean, { open: () => void; close: () => void; toggle: () => void }] => {
  const [value, setValue] = useState(defaultValue)

  const open = () => {
    setValue(true)
  }

  const close = () => {
    setValue(false)
  }

  const toggle = () => {
    setValue((value) => !value)
  }

  return [value, { open, close, toggle }]
}
