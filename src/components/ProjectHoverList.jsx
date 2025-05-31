import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectHoverContent from './ProjectHoverContent';

const ProjectHoverList = ({ projects }) => {
  const [hoveredProject, setHoveredProject] = useState(null);

  return (
    <div className="grid grid-cols-8 gap-20">
      <div className="group col-span-3">
        <ul className="flex flex-col gap-1">
          {projects.map((project) => (
            <motion.li
              key={project.id}
              onHoverStart={() => setHoveredProject(project)}
              className="relative"
            >
              <div
                className={`hover-element flex min-h-full rounded-lg p-4 transition-all duration-300 ${
                  hoveredProject?.id === project.id
                    ? 'bg-light-primary dark:bg-dark-primary'
                    : ''
                }`}
              >
                <div className="flex flex-col">
                  <p className="maintext pb-1 font-medium">
                    {project.data.title}
                  </p>
                  <p className="subtext text-sm">
                    {project.data.description}
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
      <div className="sticky top-32 col-span-5 self-start">
        <div className="box-bg default-border rounded-xl p-5">
          <ProjectHoverContent
            project={hoveredProject}
            isVisible={hoveredProject !== null}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectHoverList; 