import { TypeAnimation } from "react-type-animation"
import { motion } from "framer-motion"
import CatharsisCSS from "./../assets/css/Catharsis.module.css"

const Catharsis = () => {
   return (
      <div className={CatharsisCSS.catharsisBody}>
         <div className={CatharsisCSS.defContainer}>
            <motion.dt
               className={CatharsisCSS.word}
               initial={{ opacity: 0, filter: "blur(5px)" }}
               animate={{ opacity: 1, filter: "blur(0px)" }}
               transition={{ duration: 0.5 }}
            >
               ca·thar·sis
            </motion.dt>
            <motion.dd
               className={CatharsisCSS.pronunciation}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 0.5 }}
            >
               /kəˈθɑːrsɪs/
            </motion.dd>
            <TypeAnimation
               sequence={[
                  'the process of releasing, and thereby providing relief from, strong or repressed emotions',
                  1000,
                  'purification or purgation of the emotions (such as pity and fear) primarily through art',
                  1000
               ]}
               speed={55}
               deletionSpeed={77}
               className={CatharsisCSS.definition}
               repeat={Infinity}
            />
         </div>
      </div>
   )
}

export default Catharsis