// src/components/ui/tabs.jsx

import React, { useState } from "react";
import clsx from "clsx";

export function Tabs({ defaultValue, children }) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const triggers = [];
  const contents = [];

  React.Children.forEach(children, (child) => {
    if (child.type === TabsList) {
      triggers.push(React.cloneElement(child, { activeTab, setActiveTab }));
    } else if (child.type === TabsContent) {
      contents.push(
        React.cloneElement(child, { activeTab }) // still passing activeTab
      );
    }
  });

  return (
    <div className="w-full">
      {triggers}
      <div className="mt-4">
        {contents.map((content) => (
          <React.Fragment key={content.props.value}>
            {content}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export function TabsList({ children, activeTab, setActiveTab }) {
  return (
    <div className="flex space-x-2 border-b">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { activeTab, setActiveTab })
      )}
    </div>
  );
}

export function TabsTrigger({ value, children, activeTab, setActiveTab }) {
  const isActive = activeTab === value;
  return (
    <button
      onClick={() => setActiveTab(value)}
      className={clsx(
        "px-4 py-2 text-sm font-medium transition-all duration-300 border-b-2",
        isActive
          ? "border-primary text-primary"
          : "border-transparent text-muted-foreground hover:text-primary"
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, activeTab }) {
  if (value !== activeTab) return null;
  return <div>{children}</div>;
}
