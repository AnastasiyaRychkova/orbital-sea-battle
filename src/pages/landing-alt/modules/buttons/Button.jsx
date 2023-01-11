import React from 'react'
import styles from './Button.module.scss';
import cx from 'classnames'

// export const Style = {
//   DEFAULT: 'button-primary',
// }

const Button = ({
  type='button',
  children,
  extraStyles = {},
  className = {},
  ...props
}) => {
  const buttonClassName = cx( styles[className], extraStyles)
console.log(styles.className)
  return (
    <button
      className={buttonClassName}
      type={type}
      {...props}
    >
        {children}
    </button>
  )
}

export default Button