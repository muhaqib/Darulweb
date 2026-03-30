import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

import Imageweb1 from "../../assets/image/web 1.png";
import Imageweb2 from "../../assets/image/web 2.png";
import Imageweb3 from "../../assets/image/web 3.png";
import Imageweb4 from "../../assets/image/web 4.png";
import Imageweb5 from "../../assets/image/web 5.png";
import Imageweb6 from "../../assets/image/web 6.png";

export function Portfolio() {
  const projects = [
    {
      title: "E-Commerce Platform",
      category: "Web Development",
      image: Imageweb1,
      description:
        "A modern, scalable e-commerce solution with seamless checkout experience.",
      link: "https://example.com/e-commerce-platform",
    },
    {
      title: "Creative Portfolio",
      category: "UI/UX Design",
      image: Imageweb2,
      description:
        "Stunning portfolio website showcasing creative work with interactive elements.",
      link: "https://example.com/e-commerce-platform",
    },
    {
      title: "Mobile Banking App",
      category: "Mobile Development",
      image: Imageweb3,
      description:
        "Secure and intuitive banking app with advanced financial features.",
      link: "https://example.com/e-commerce-platform",
    },
    {
      title: "Task Management App",
      category: "Web Development",
      image: Imageweb4,
      description:
        "Efficient task management solution with real-time collaboration features.",
      link: "https://example.com/e-commerce-platform",
    },
    {
      title: "Creative Portfolio 2",
      category: "UI/UX Design",
      image: Imageweb5,
      description:
        "Modern UI/UX portfolio with smooth animations and clean layout.",
      link: "https://example.com/e-commerce-platform",
    },
    {
      title: "Mobile Banking App 2",
      category: "Mobile Development",
      image: Imageweb6,
      description:
        "Next-gen mobile banking experience with strong security and usability.",
      link: "https://example.com/e-commerce-platform",
    },
  ];

  return (
    <section
      id="portfolio"
      className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-blue-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-4">
            Our Work
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Featured Projects
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our portfolio of successful projects and see what we can do
            for you
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500">
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay hitam */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-500"></div>

                  {/* Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/40 to-transparent opacity-60 group-hover:opacity-80 transition duration-300"></div>

                  {/* Content (muncul saat hover) */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                    <p className="text-sm text-blue-200 mb-1 opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                      {project.category}
                    </p>

                    <h3 className="text-xl font-bold mb-2 opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-200">
                      {project.title}
                    </h3>

                    <p className="text-sm text-gray-200 opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-300">
                      {project.description}
                    </p>
                  </div>

                  {/* Icon */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition duration-300">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white rounded-full shadow-lg block"
                    >
                      <ExternalLink className="w-5 h-5 text-blue-600" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <a
            href="/PortofolioPage"
            className="inline-block px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-full hover:bg-blue-50 transition-all duration-300 text-center"
          >
            View All Projects
          </a>
        </motion.div>
      </div>
    </section>
  );
}
