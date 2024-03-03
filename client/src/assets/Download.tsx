import * as React from 'react'

const Download = ({ fill, ...props }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg height="100" width="100" xmlns="http://www.w3.org/2000/svg" {...props}>
      <ellipse cx="49.93" cy="50.11" fill={fill} id="svg_2" rx="49.63" ry="49.5" transform="matrix(1 0 0 1 0 0)" />
      <g>
        <title>Layer 2</title>
        <path d="m60.02,43.37l-10.02,18.13l-10.02,-18.13l5.01,0l0,-18.22l10.02,0l0,18.22z" fill="#E0E0E2" id="svg_6" strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="m29.24,70.98l1.3,1.4c0.46,0.5 2.13,0.85 4.05,0.85l15.55,0l15.55,0c1.92,0 3.59,-0.35 4.05,-0.85l1.3,-1.4"
          fill="#56565C"
          id="svg_3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          transform="matrix(1 0 0 1 0 0)"
        />
      </g>
    </svg>
  )
}

export default Download
