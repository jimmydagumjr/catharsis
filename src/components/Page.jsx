import React from "react"
import { motion } from "framer-motion"

const Page = ({ children, pageKey }) => (
   <motion.div
      key={pageKey}
      exit={{
         opacity: 0,
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