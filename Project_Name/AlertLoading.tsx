import React, {memo, useEffect, useState} from 'react'
// @ts-ignore
import Spinner from 'react-native-loading-spinner-overlay'
import {appEmitter} from "./eventEmitter";

export const AlertLoading: React.FC = memo(() => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const cleaner = appEmitter.on('loading', (isVisible: boolean) => {
      setTimeout(() => {
        setVisible(isVisible)
      }, 500)
    })

    return () => {
      cleaner()
    }
  }, [])

  if (!visible) return null

  return <Spinner visible={true} />
})
