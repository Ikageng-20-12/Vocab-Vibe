import React from 'react';
import { BookOpen, Video, FileText, ExternalLink } from 'lucide-react';

const ResourcesPage = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">IELTS Preparation Resources</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <section className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <BookOpen className="text-blue-500" size={24} />
            <h2 className="text-xl font-semibold ml-2">Tips for Speaking Test</h2>
          </div>
          <div className="space-y-4">
            <ResourceCard
              title="Improving Fluency"
              description="Learn techniques to speak more naturally and confidently"
              type="article"
            />
            <ResourceCard
              title="Common Grammar Mistakes"
              description="Avoid these frequent errors in your speaking"
              type="article"
            />
            <ResourceCard
              title="Vocabulary Enhancement"
              description="Expand your vocabulary for better expression"
              type="article"
            />
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Video className="text-green-500" size={24} />
            <h2 className="text-xl font-semibold ml-2">Video Tutorials</h2>
          </div>
          <div className="space-y-4">
            <ResourceCard
              title="Part 1 Strategy Guide"
              description="Master the introduction and interview section"
              type="video"
            />
            <ResourceCard
              title="Cue Card Success"
              description="How to excel in Part 2 long-turn speaking"
              type="video"
            />
            <ResourceCard
              title="Advanced Discussion Skills"
              description="Techniques for Part 3 abstract topics"
              type="video"
            />
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <FileText className="text-purple-500" size={24} />
            <h2 className="text-xl font-semibold ml-2">Practice Materials</h2>
          </div>
          <div className="space-y-4">
            <ResourceCard
              title="Sample Questions Bank"
              description="100+ practice questions for all parts"
              type="practice"
            />
            <ResourceCard
              title="Model Answers"
              description="Example responses with explanations"
              type="practice"
            />
            <ResourceCard
              title="Self-Assessment Tools"
              description="Evaluate your speaking performance"
              type="practice"
            />
          </div>
        </section>
      </div>

      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Additional Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ExternalResource
            title="Official IELTS Website"
            description="Access official IELTS preparation materials"
            url="#"
          />
          <ExternalResource
            title="British Council Resources"
            description="Free practice tests and materials"
            url="#"
          />
        </div>
      </div>
    </div>
  );
};

const ResourceCard = ({ title, description, type }: {
  title: string;
  description: string;
  type: 'article' | 'video' | 'practice';
}) => {
  const typeColors = {
    article: 'bg-blue-100 text-blue-800',
    video: 'bg-green-100 text-green-800',
    practice: 'bg-purple-100 text-purple-800',
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium">{title}</h3>
        <span className={`text-xs px-2 py-1 rounded-full ${typeColors[type]}`}>
          {type}
        </span>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

const ExternalResource = ({ title, description, url }: {
  title: string;
  description: string;
  url: string;
}) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-start p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
  >
    <div>
      <h3 className="font-medium flex items-center">
        {title}
        <ExternalLink size={16} className="ml-2" />
      </h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </a>
);

export default ResourcesPage;