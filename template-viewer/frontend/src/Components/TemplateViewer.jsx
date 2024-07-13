import { useState, useEffect } from "react";
import axios from "axios";
import nextimg from "../assets/next.png";
import previousimg from "../assets/previous.png";

const TemplateViewer = () => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/templates")
      .then((response) => {
        setTemplates(response.data);
        if (response.data.length > 0) {
          setSelectedTemplate(response.data[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching templates:", error);
      });
  }, []);

  const selectTemplate = (template) => {
    setSelectedTemplate(template);
  };

  const next = () => {
    const newIndex = currentIndex + 4;
    if (newIndex < templates.length) {
      setCurrentIndex(newIndex);
    }
  };

  const previous = () => {
    const newIndex = currentIndex - 4;
    if (newIndex >= 0) {
      setCurrentIndex(newIndex);
    }
  };

  return (
    <div id="container">
      <header>Filmstrip View</header>
      <div id="main" role="main">
        <div id="large">
          <div className="group">
            {selectedTemplate && (
              <>
                <img
                  src={`http://localhost:8000/images/large/${selectedTemplate.image}`}
                  alt="Large Template"
                  width="430"
                  height="360"
                />
                <div className="details">
                  <p>
                    <strong>Title</strong> {selectedTemplate.title}
                  </p>
                  <p>
                    <strong>Description</strong> {selectedTemplate.description}
                  </p>
                  <p>
                    <strong>Cost</strong> ${selectedTemplate.cost}
                  </p>
                  <p>
                    <strong>ID #</strong> {selectedTemplate.id}
                  </p>
                  <p>
                    <strong>Thumbnail File</strong> {selectedTemplate.thumbnail}
                  </p>
                  <p>
                    <strong>Large Image File</strong> {selectedTemplate.image}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="thumbnails">
          <div className="group">
            {templates.slice(currentIndex, currentIndex + 4).map((template) => (
              <a
                key={template.id}
                href="#"
                onClick={() => selectTemplate(template)}
                className={
                  selectedTemplate && selectedTemplate.id === template.id
                    ? "active"
                    : ""
                }
              >
                <img
                  src={`http://localhost:8000/images/thumbnails/${template.thumbnail}`}
                  alt={`Thumbnail ${template.id}`}
                  width="145"
                  height="121"
                />
                <span>{template.id}</span>
              </a>
            ))}
            <span
              className={`previous ${currentIndex === 0 ? "disabled" : ""}`}
              onClick={previous}
            >
              <img
                src={previousimg}
                alt="Previous"
                className={`navigation-icon ${
                  currentIndex === 0 ? "disabled" : ""
                }`}
              />
            </span>
            <span
              className={`next ${
                currentIndex + 4 >= templates.length ? "disabled" : ""
              }`}
              onClick={next}
            >
              <img
                src={nextimg}
                alt="Next"
                className={`navigation-icon ${
                  currentIndex + 4 >= templates.length ? "disabled" : ""
                }`}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateViewer;
