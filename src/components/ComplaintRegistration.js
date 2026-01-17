import React, { useState, useEffect, useRef } from "react";

export default function ComplaintRegistration({ onComplaintAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    description: ""
  });

  const [document, setDocument] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [filePreview, setFilePreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (filePreview) URL.revokeObjectURL(filePreview);
    };
  }, [filePreview]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    else if (formData.name.length < 2)
      newErrors.name = "Name must be at least 2 characters";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email))
      newErrors.email = "Invalid email format";

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phone) newErrors.phone = "Phone is required";
    else if (!phoneRegex.test(formData.phone))
      newErrors.phone = "Enter valid 10-digit Indian phone number";

    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    else if (formData.subject.length < 5)
      newErrors.subject = "Subject must be at least 5 characters";

    if (!formData.description.trim())
      newErrors.description = "Description is required";
    else if (formData.description.length < 20)
      newErrors.description = "Description must be at least 20 characters";

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

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        description: ""
      });
      setDocument(null);
      setFilePreview(null);
      setErrors({});
    } catch (error) {
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
      if (!file.type.startsWith("image/") && !file.type.includes("pdf")) {
        alert("❌ Only images (JPG, PNG) and PDF files are allowed");
        e.target.value = "";
        return;
      }

      setDocument(file);
      if (file.type.startsWith("image/")) {
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

  const inputStyle = (field) =>
    `w-full px-4 py-3 rounded-xl bg-white/10 text-white border ${
      errors[field] ? "border-red-500" : "border-white/30"
    } focus:border-cyan-400 focus:outline-none transition`;

  return (
    <div
  className="max-w-xl mx-auto mt-10 p-6 rounded-2xl 
    bg-gradient-to-br from-sky-900 to-slate-900 
    border border-white/20 shadow-2xl"
>
      <h2 className="text-2xl font-extrabold text-white text-center mb-6">
        Register Complaint
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label className="text-white font-semibold">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className={inputStyle("name")}
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="text-red-400 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="text-white font-semibold">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className={inputStyle("email")}
            placeholder="your.email@example.com"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="text-white font-semibold">
            Phone Number <span className="text-red-500">*</span>
            <span className="text-gray-300 text-xs block">
              (10 digits, starting with 6-9)
            </span>
          </label>
          <input
            type="tel"
            value={formData.phone}
            maxLength="10"
            onChange={(e) =>
              setFormData({
                ...formData,
                phone: e.target.value.replace(/\D/g, ""),
              })
            }
            className={inputStyle("phone")}
            placeholder="98xxxxxxxx"
          />
          {errors.phone && (
            <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Subject */}
        <div>
          <label className="text-white font-semibold">
            Complaint Subject <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.subject}
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
            className={inputStyle("subject")}
            placeholder="e.g. Online Banking Fraud, UPI Scam"
          />
          {errors.subject && (
            <p className="text-red-400 text-sm mt-1">{errors.subject}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="text-white font-semibold">
            Detailed Description <span className="text-red-500">*</span>
          </label>
          <textarea
            rows="5"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className={inputStyle("description")}
            placeholder="Provide complete details: dates, amounts, transaction IDs, scammer numbers..."
          />
          {errors.description && (
            <p className="text-red-400 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        {/* File Upload */}
        <div>
          <label className="text-white font-semibold">
            Supporting Documents (Optional)
          </label>

          <div
            onClick={triggerFileInput}
            className={`mt-2 p-6 rounded-xl border-dashed border ${
              document ? "border-cyan-400" : "border-white/30"
            } bg-white/5 text-center cursor-pointer`}
          >
            <div className="text-3xl mb-2">
              {document ? "✅" : "📎"}
            </div>

            {document ? (
              <div>
                <p className="text-cyan-200 font-semibold">
                  {document.name}
                </p>
                <p className="text-gray-300 text-sm">
                  {(document.size / 1024 / 1024).toFixed(2)} MB
                </p>
                {filePreview && (
                  <img
                    src={filePreview}
                    alt="Preview"
                    className="mt-3 w-24 h-24 rounded-lg object-cover mx-auto"
                  />
                )}
              </div>
            ) : (
              <>
                <p className="text-gray-300">Click to upload evidence</p>
                <p className="text-gray-400 text-sm">
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
            className="hidden"
          />

          {document && (
            <button
              type="button"
              onClick={removeFile}
              className="mt-3 w-full py-2 rounded-xl border border-red-500 text-red-400"
            >
              ❌ Remove File
            </button>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-lg hover:opacity-90 transition"
        >
          {isLoading ? "⏳ Processing..." : "SUBMIT COMPLAINT"}
        </button>
      </form>
    </div>
  );
}
