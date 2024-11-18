import React from "react";

const Breadcrumb = ({ breadcrumbs, onBreadcrumbClick }) => {
  return (
    <div className="breadcrumb">
      {breadcrumbs.map((breadcrumb, index) => (
        <span key={index}>
          <button
            className="breadcrumb-item"
            onClick={() => onBreadcrumbClick(index)}
          >
            {breadcrumb}
          </button>
          {index < breadcrumbs.length - 1 && " > "}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumb;
