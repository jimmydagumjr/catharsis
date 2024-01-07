import React from "react"
import { motion } from "framer-motion"

const Page = ({ children, pageKey }) => (
   <motion.div
      key={pageKey}
      exit={{
         opacity: 0,
         filter: "blur(5px)",
         transition: {
            duration: 0.2
         }
      }}
   >
      {children}
   </motion.div >
)

export default Page