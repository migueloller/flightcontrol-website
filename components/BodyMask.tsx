import classNames from 'classnames'
import { HTMLMotionProps, motion } from 'framer-motion'
import { useLayoutEffect, ComponentPropsWithRef, useState } from 'react'
import { createPortal } from 'react-dom'

export function useDocument(): Document | null {
  const [doc, setDoc] = useState<Document | null>(null)

  useLayoutEffect(() => {
    setDoc(document)
  }, [])

  return doc
}

type Props = ComponentPropsWithRef<'div'> & HTMLMotionProps<'div'>

export function BodyMask(props: Props) {
  const doc = useDocument()

  useLayoutEffect(() => {
    if (!doc) return

    const { body } = doc
    const { overflow } = body.style

    // this is removed because in the context of a live website we don't want the scrollbars being removed
    body.style.overflow = 'hidden'

    return () => {
      body.style.overflow = overflow
    }
  }, [doc])

  return (
    doc &&
    createPortal(
      <motion.div {...props} className={classNames(props.className, 'fixed inset-0')} />,
      doc.body,
    )
  )
}
