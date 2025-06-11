import React from 'react';
type SectionProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};
const Section: React.FC<SectionProps> = ({
  title,
  children,
  className = ""
}) => {
  return <div className={`space-y-4 ${className}`}>
      
      {children}
    </div>;
};
export default Section;