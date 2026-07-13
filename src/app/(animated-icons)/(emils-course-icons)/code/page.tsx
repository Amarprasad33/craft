
import { motion } from "motion/react"


export default function CodeAnimation() {
    return (
        <div>
            oi oi oi code
        </div>
    )
}


const CodeIcon = () => {
    return (
        <motion.g
    >
      <g className="will-change-transform">
        <g data-animate="whole">
          <g className="filter-[url(#filter8_i_359_1453)] dark:filter-[url(#filter8_i_368_1560)]">
            <path
              d="M425.217 236.652C443.467 233.369 460.923 245.503 464.206 263.753C467.489 282.003 455.355 299.459 437.105 302.742L408.026 307.972C401.42 309.172 394.605 308.353 388.471 305.622C388.141 306.321 387.71 306.967 387.192 307.54C384.266 310.776 380.349 312.95 376.055 313.722L374.302 314.037C372.384 314.382 370.829 312.493 371.537 310.677L372.153 309.096C373.031 306.846 373.268 304.396 372.841 302.018L369.037 280.871C365.754 262.621 377.888 245.165 396.138 241.883L425.217 236.652Z"
              className="fill-[#F8F8F8] dark:fill-[#252525]"
            />
          </g>
          <g data-animate="caret-left">
            <path
              d="M400.254 282.746L392.234 277.171C392.045 277.04 391.951 276.975 391.905 276.888C391.863 276.812 391.847 276.725 391.86 276.639C391.873 276.542 391.939 276.448 392.07 276.259L397.645 268.239"
              strokeWidth="2.457"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="stroke-[#989898] dark:stroke-[#D6D6D6]"
            />
          </g>
          <g data-animate="caret-right">
            <path
              d="M429.881 262.438L437.901 268.013C438.09 268.144 438.184 268.209 438.23 268.296C438.271 268.372 438.287 268.46 438.275 268.545C438.262 268.642 438.196 268.736 438.065 268.925L432.49 276.945"
              strokeWidth="2.457"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="stroke-[#989898] dark:stroke-[#D6D6D6]"
            />
          </g>
          <g data-animate="code-path">
            <motion.g
              data-animate="pulse"
            >
              <motion.g
                data-animate="opacity"
              >
                <motion.path
                  className="[--light-fill:#989898] [--dark-fill:#D6D6D6] dark:fill-(--dark-fill) fill-(--light-fill)"
                  style={{ willChange: "d" }}
                />
              </motion.g>
            </motion.g>
          </g>
          <g data-animate="slash">
            <path
              d="M423.804 261.037L423.126 271.144L422.447 281.25"
              strokeWidth="2.457"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="stroke-[#989898] dark:stroke-[#D6D6D6]"
            />
          </g>
        </g>
      </g>
    </motion.g>
    )
}

