import React from "react"
import { motion } from "framer-motion"

const Page = ({ children, pageKey }) => (
   <motion.div
      key={pageKey}
      exit={{
         opacity: 0,
         filter: "blur(5px) brightness(1.5)",
         transition: {
            type: "tween",
            duration: 0.3
         }
      }}
   >
      {children}
   </motion.div >
)

export default Page