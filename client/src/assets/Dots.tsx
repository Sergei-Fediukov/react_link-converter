import * as React from 'react'

const Dots = ({ fill, ...props }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M10 8C10 6.89539 9.10461 6 8 6C6.89539 6 6 6.89539 6 8C6 9.10461 6.89539 10 8 10C9.10461 10 10 9.10461 10 8Z" fill="black" />
      <path d="M10 14C10 12.8954 9.10461 12 8 12C6.89539 12 6 12.8954 6 14C6 15.1046 6.89539 16 8 16C9.10461 16 10 15.1046 10 14Z" fill="black" />
      <path d="M10 2C10 0.895386 9.10461 0 8 0C6.89539 0 6 0.895386 6 2C6 3.10461 6.89539 4 8 4C9.10461 4 10 3.10461 10 2Z" fill="black" />
    </svg>
  )
}

export default Dots
