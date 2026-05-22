"use client";

import { useState } from "react";
import CollectifsSection from "@/components/collectifs/CollectifsSection";
import FunctOrganisation from "@/components/funct/functOrganisation";
import { FeaturesCard } from "@/components/cards/FeaturesCard";
import AvantagesContent from "@/components/avantages/avantagesContent";
import PricingTable from "@/components/features/PricingTable";
import "@/styles/solution/solutionTabs.css";

type Tab = "pour-qui" | "comment" | "offres";

export default function SolutionTabs() {
  const [activeTab, setActiveTab] = useState<Tab>("pour-qui");

  return (
    <div className="solution-tabs-wrapper">
      <div className="solution-tabs-nav">
        <button
          className={`solution-tab-btn${activeTab === "pour-qui" ? " --active" : ""}`}
          onClick={() => setActiveTab("pour-qui")}
        >
          Pour qui ?
        </button>
        <button
          className={`solution-tab-btn${activeTab === "comment" ? " --active" : ""}`}
          onClick={() => setActiveTab("comment")}
        >
          Comment ça marche ?
        </button>
        <button
          className={`solution-tab-btn${activeTab === "offres" ? " --active" : ""}`}
          onClick={() => setActiveTab("offres")}
        >
          Nos offres
        </button>
      </div>

      <div className="solution-tab-content">
        {activeTab === "pour-qui" && <CollectifsSection />}
        {activeTab === "comment" && (
          <>
            <FunctOrganisation />
            <FeaturesCard />
            <AvantagesContent />
          </>
        )}
        {activeTab === "offres" && <PricingTable />}
      </div>
    </div>
  );
}
