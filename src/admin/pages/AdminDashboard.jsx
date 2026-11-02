import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import AdminOverviewTab from "../tabs/AdminOverviewTab";
import AdminProjectsTab from "../tabs/AdminProjectsTab";
import AdminSkillsTab from "../tabs/AdminSkillsTab";
import AdminExperienceTab from "../tabs/AdminExperienceTab";
import AdminEducationTab from "../tabs/AdminEducationTab";
import AdminCertificationsTab from "../tabs/AdminCertificationsTab";
import AdminBlogsTab from "../tabs/AdminBlogsTab";
import AdminMessagesTab from "../tabs/AdminMessagesTab";

export default function AdminDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab") || "overview";
  const [activeTab, setActiveTabState] = useState(tabParam);

  useEffect(() => {
    if (searchParams.get("tab") !== activeTab) {
      setSearchParams({ tab: activeTab }, { replace: true });
    }
  }, [activeTab, searchParams, setSearchParams]);

  const renderActiveTab = () => {
    switch (activeTab) {
      case "projects":
        return <AdminProjectsTab />;
      case "skills":
        return <AdminSkillsTab />;
      case "experience":
        return <AdminExperienceTab />;
      case "education":
        return <AdminEducationTab />;
      case "certifications":
        return <AdminCertificationsTab />;
      case "blogs":
        return <AdminBlogsTab />;
      case "messages":
        return <AdminMessagesTab />;
      case "overview":
      default:
        return <AdminOverviewTab setActiveTab={setActiveTabState} />;
    }
  };

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTabState}>
      {renderActiveTab()}
    </AdminLayout>
  );
}
