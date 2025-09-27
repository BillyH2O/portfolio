
"use client";

import { motion } from "framer-motion";
import { TestimonialsColumn } from "../ui/testimonials-columns-1";
import { testimonials } from "@/app/data";
import { SectionTitle } from "../ui/SectionTitle";
import Image from "next/image";


const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);


export const TestimonialSection = () => {
  return (
    <section className="relative flex flex-col items-center justify-center py-40 px-2 md:px-10 xl:px-20">
      <div className="relative w-full h-full flex flex-col md:flex-row items-center justify-center">
      <SectionTitle 
        title="Avis Client" 
        image="/light-globe.png" 
        imageOnLeft={false} 
        reverseOnMobile={true}
        darkImage="/light-globe.png"
        lightImage="/dark-globe.png"
      /> 
      <Image src="/elipse.png" alt="ecipse2" width={300} height={160} className='absolute top-1/2 left-[40%] transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[160px] overflow-visible' />
      </div>
      <div className="container z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};