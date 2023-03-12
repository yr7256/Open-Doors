import Burger from './Burger'

type Props = {
  children?: ChildNode
}

export default function Navbar(props: Props) {
  return (
    <>
      <Burger />
      {props.children}
    </>
  )
}