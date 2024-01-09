import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc"
import { JSX } from "react"

const components = {
    
}

export function CustomMDX(props: JSX.IntrinsicAttributes & MDXRemoteProps) {
    return (
      <MDXRemote
        {...props}
        components={{ ...components, ...(props.components || {}) }}
      />
    )
  }