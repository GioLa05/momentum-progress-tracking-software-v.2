import React from 'react'
import styles from './UploadPhotoButton.module.css'

type Props = {}

const UploadPhotoButton = (props: Props) => {
  return (
    <div className={styles.grouped}>
        <p>ავატარი*</p>
        <UploadPhotoButton />
    </div>
  )
}

export default UploadPhotoButton