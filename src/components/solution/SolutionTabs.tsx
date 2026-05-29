"use client";

import { useState } from "react";
import FunctOrganisation from "@/components/funct/functOrganisation";
import { FeaturesCard } from "@/components/cards/FeaturesCard";
import AvantagesContent from "@/components/avantages/avantagesContent";
import AvantagesHome from "@/components/section/AvantagesHome";
import PricingTable from "@/components/features/PricingTable";
import "@/styles/solution/solutionTabs.css";

type Tab = "comment" | "avantages" | "offres";

export default function SolutionTabs() {
  const [activeTab, setActiveTab] = useState<Tab>("comment");

  return (
    <div className="solution-tabs-wrapper">
      <div className="solution-tabs-nav">
        <button
          className={`solution-tab-btn${activeTab === "comment" ? " --active" : ""}`}
          onClick={() => setActiveTab("comment")}
        >
          Comment ça marche ?
        </button>
        <button
          className={`solution-tab-btn${activeTab === "avantages" ? " --active" : ""}`}
          onClick={() => setActiveTab("avantages")}
        >
          Avantages
        </button>
        <button
          className={`solution-tab-btn${activeTab === "offres" ? " --active" : ""}`}
          onClick={() => setActiveTab("offres")}
        >
          Nos offres
        </button>
      </div>

      <div className="solution-tab-content" key={activeTab}>
        {activeTab === "comment" && (
          <>
            <FunctOrganisation />
            <FeaturesCard />
          </>
        )}
        {activeTab === "avantages" && (
          <>
            <AvantagesHome showCta={false} />
            <AvantagesContent />
          </>
        )}
        {activeTab === "offres" && <PricingTable />}
      </div>
    </div>
  );
}
