import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { marked } from 'marked';

const ProjectHoverContent = ({ project, isVisible }) => {
  const renderMarkdown = (content) => {
    if (!content) return '';
    return marked(content);
  };

  return (
    <AnimatePresence>
      {isVisible && project && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-4 text-white"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-medium text-white">{project.data.title}</h2>
            <a
              href={project.data.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 hover:underline"
            >
              View Project
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 7h10v10" />
                <path d="M7 17L17 7" />
              </svg>
            </a>
          </div>

          {project.data.tags && (
            <div className="flex flex-wrap gap-2">
              {project.data.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-light-primary px-3 py-1 text-sm text-white dark:bg-dark-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div 
            className="prose prose-invert mt-4 max-w-none"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(project.body) }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectHoverContent; 