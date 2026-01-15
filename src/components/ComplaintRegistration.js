import React, { useState, useEffect, useRef } from "react";

export default function ComplaintRegistration({ onComplaintAdded }) {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", subject: "", description: ""
  });
  const [document, setDocument] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [filePreview, setFilePreview] = useState(null);
  const fileInputRef = useRef(null);

  // Cleanup preview URL
  useEffect(() => {
    return () => {
      if (filePreview) URL.revokeObjectURL(filePreview);
    };
  }, [filePreview]);

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) newErrors.name = "Name is required";
    else if (formData.name.length < 2) newErrors.name = "Name must be at least 2 characters";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email format";

    // Phone validation (India)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phone) newErrors.phone = "Phone is required";
    else if (!phoneRegex.test(formData.phone)) newErrors.phone = "Enter valid 10-digit Indian phone number";

    // Subject validation
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    else if (formData.subject.length < 5) newErrors.subject = "Subject must be at least 5 characters";

    // Description validation
    if (!formData.description.trim()) newErrors.description = "Description is required";
    else if (formData.description.length < 20) newErrors.description = "Description must be at least 20 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("subject", formData.subject);
      formDataToSend.append("description", formData.description);
      if (document) formDataToSend.append("document", document);

      const res = await fetch("http://localhost:8080/api/complaints/with-file", {
        method: "POST",
        body: formDataToSend,
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Failed to register complaint");
      }

      const newComplaint = await res.json();
      alert("✅ Complaint registered successfully! Reference ID: " + newComplaint.id);
      
      if (onComplaintAdded) onComplaintAdded(newComplaint);

      // Reset form
      setFormData({ name: "", email: "", phone: "", subject: "", description: "" });
      setDocument(null);
      setFilePreview(null);
      setErrors({});
      
    } catch (error) {
      console.error("Error:", error);
      alert("❌ " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("❌ File size must be less than 5MB");
        e.target.value = "";
        return;
      }
      if (!file.type.startsWith('image/') && !file.type.includes('pdf')) {
        alert("❌ Only images (JPG, PNG) and PDF files are allowed");
        e.target.value = "";
        return;
      }
      
      setDocument(file);
      if (file.type.startsWith('image/')) {
        const previewUrl = URL.createObjectURL(file);
        setFilePreview(previewUrl);
      } else {
        setFilePreview(null);
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeFile = () => {
    setDocument(null);
    setFilePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const getFieldStyle = (field) => ({
    width: "100%",
    padding: "16px 20px",
    border: errors[field] ? "2px solid #ff416c" : "2px solid rgba(0,212,255,0.3)",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(20px)",
    fontSize: "16px",
    transition: "all 0.3s ease",
    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
    outline: "none",
    fontFamily: "Segoe UI, sans-serif",
  });

  return (
    <div style={{
      maxWidth: "600px",
      margin: "2rem auto",
      padding: "2rem",
      background: "rgba(255,255,255,0.1)",
      backdropFilter: "blur(30px)",
      borderRadius: "24px",
      border: "1px solid rgba(0,212,255,0.3)",
      boxShadow: "0 25px 60px rgba(0,0,0,0.3)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Decorative glow */}
      <div style={{
        position: "absolute",
        top: "-50px",
        right: "-50px",
        width: "100px",
        height: "100px",
        background: "radial-gradient(circle, rgba(0,212,255,0.3), transparent)",
        borderRadius: "50%",
        animation: "float 6s ease-in-out infinite",
      }} />
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      <h2 style={{
        fontSize: "2.2rem",
        fontWeight: "800",
        background: "linear-gradient(45deg, #00d4ff, #ff4b2b, #ffd700)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        textAlign: "center",
        marginBottom: "2rem",
        letterSpacing: "-0.5px",
      }}>
        🚨 Register Complaint
      </h2>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1.5rem" }}>
        {/* ✅ NAME FIELD */}
        <div>
          <label style={{ display: "block", color: "#333", fontWeight: "600", marginBottom: "0.5rem" }}>
            Full Name <span style={{ color: "#ff416c" }}>*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={getFieldStyle("name")}
            placeholder="Enter your full name"
          />
          {errors.name && <p style={{ color: "#ff416c", fontSize: "0.9rem", marginTop: "0.25rem" }}>
            {errors.name}
          </p>}
        </div>

        {/* ✅ EMAIL FIELD */}
        <div>
          <label style={{ display: "block", color: "#333", fontWeight: "600", marginBottom: "0.5rem" }}>
            Email Address <span style={{ color: "#ff416c" }}>*</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            style={getFieldStyle("email")}
            placeholder="your.email@example.com"
          />
          {errors.email && <p style={{ color: "#ff416c", fontSize: "0.9rem", marginTop: "0.25rem" }}>
            {errors.email}
          </p>}
        </div>

        {/* ✅ PHONE FIELD */}
        <div>
          <label style={{ display: "block", color: "#333", fontWeight: "600", marginBottom: "0.5rem" }}>
            Phone Number <span style={{ color: "#ff416c" }}>*</span>
            <span style={{ color: "#666", fontSize: "0.85rem", display: "block" }}>(10 digits, starting with 6-9)</span>
          </label>
          <input
            type="tel"
            value={formData.phone}
            maxLength="10"
            onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
            style={getFieldStyle("phone")}
            placeholder="98xxxxxxxx"
          />
          {errors.phone && <p style={{ color: "#ff416c", fontSize: "0.9rem", marginTop: "0.25rem" }}>
            {errors.phone}
          </p>}
        </div>

        {/* ✅ SUBJECT FIELD */}
        <div>
          <label style={{ display: "block", color: "#333", fontWeight: "600", marginBottom: "0.5rem" }}>
            Complaint Subject <span style={{ color: "#ff416c" }}>*</span>
          </label>
          <input
            type="text"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            style={getFieldStyle("subject")}
            placeholder="e.g. Online Banking Fraud, UPI Scam"
          />
          {errors.subject && <p style={{ color: "#ff416c", fontSize: "0.9rem", marginTop: "0.25rem" }}>
            {errors.subject}
          </p>}
        </div>

        {/* ✅ DESCRIPTION FIELD */}
        <div>
          <label style={{ display: "block", color: "#333", fontWeight: "600", marginBottom: "0.5rem" }}>
            Detailed Description <span style={{ color: "#ff416c" }}>*</span>
          </label>
          <textarea
            rows="5"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            style={{
              ...getFieldStyle("description"),
              resize: "vertical",
              minHeight: "120px",
            }}
            placeholder="Provide complete details: dates, amounts, transaction IDs, scammer numbers, screenshots, chat logs, etc..."
          />
          {errors.description && <p style={{ color: "#ff416c", fontSize: "0.9rem", marginTop: "0.25rem" }}>
            {errors.description}
          </p>}
        </div>

        {/* ✅ FILE UPLOAD FIELD */}
        <div>
          <label style={{ display: "block", color: "#333", fontWeight: "600", marginBottom: "0.5rem" }}>
            Supporting Documents (Optional)
          </label>
          <div 
            style={{
              border: document ? "2px solid rgba(0,212,255,0.7)" : "2px dashed rgba(0,212,255,0.5)",
              borderRadius: "16px",
              padding: "2rem",
              textAlign: "center",
              background: "rgba(0,212,255,0.05)",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }} 
            onClick={triggerFileInput}
          >
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>
              {document ? "✅" : "📎"}
            </div>
            {document ? (
              <div>
                <p style={{ color: "#00d4ff", fontWeight: "600", marginBottom: "0.5rem" }}>
                  {document.name}
                </p>
                <p style={{ fontSize: "0.85rem", color: "#666" }}>
                  {(document.size / 1024 / 1024).toFixed(2)} MB
                </p>
                {filePreview && (
                  <img 
                    src={filePreview} 
                    alt="Preview" 
                    style={{
                      maxWidth: "120px",
                      maxHeight: "120px",
                      borderRadius: "8px",
                      boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
                      objectFit: "cover",
                      marginTop: "1rem"
                    }} 
                  />
                )}
              </div>
            ) : (
              <>
                <p style={{ color: "#666", marginBottom: "0.5rem" }}>
                  Click to upload evidence
                </p>
                <p style={{ fontSize: "0.85rem", color: "#999" }}>
                  Images (JPG, PNG), PDF • Max 5MB
                </p>
              </>
            )}
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            accept="image/*,.pdf"
            style={{ display: "none" }}
          />
          
          {document && (
            <button
              type="button"
              onClick={removeFile}
              style={{
                marginTop: "1rem",
                padding: "8px 16px",
                background: "rgba(255,65,108,0.2)",
                border: "1px solid #ff416c",
                borderRadius: "12px",
                color: "#ff416c",
                cursor: "pointer",
                fontSize: "0.9rem",
                width: "100%"
              }}
            >
              ❌ Remove File
            </button>
          )}
        </div>

        {/* ✅ SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={isLoading}
          style={{
            padding: "20px",
            borderRadius: "20px",
            fontSize: "1.2rem",
            fontWeight: "800",
            cursor: isLoading ? "not-allowed" : "pointer",
            border: "none",
            color: "white",
            background: isLoading 
              ? "linear-gradient(45deg, #666, #888)" 
              : "linear-gradient(45deg, #ff416c, #ff4b2b)",
            boxShadow: isLoading 
              ? "0 10px 25px rgba(0,0,0,0.3)" 
              : "0 15px 35px rgba(255,65,108,0.5)",
            transition: "all 0.3s ease",
          }}
        >
          {isLoading ? "⏳ Processing Complaint..." : "🚨 SUBMIT COMPLAINT"}
        </button>
      </form>
    </div>
  );
}
