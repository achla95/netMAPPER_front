import clsx from "clsx"

const Button = (props) => {
  const { className, ...otherProps } = props

  return <button className={clsx("rounded", className)} {...otherProps} />
}

export default Button
