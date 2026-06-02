import * as React from "react";

import DentalFlow from "./DentalFlow";
import LogisticsFlow from "./LogisticsFlow";
import WellnessRetreat from "./WellnessRetreat";
import RetailCommerce from "./RetailCommerce";
import MedicineConsult from "./MedicineConsult";
import HomeServices from "./HomeServices";
import ConstructionTracker from "./ConstructionTracker";
import AEOEngine from "./AEOEngine";
import N8nWorkflow from "./N8nWorkflow";
import WordPressSite from "./WordPressSite";
import ShopifyStore from "./ShopifyStore";
import AIDispatcher from "./AIDispatcher";
import FreightOps from "./FreightOps";
import WhatsAppCRM from "./WhatsAppCRM";
import AutoDealer from "./AutoDealer";
import ContentPipeline from "./ContentPipeline";
import VideoEditor from "./VideoEditor";
import BrandRescue from "./BrandRescue";

export {
  DentalFlow,
  LogisticsFlow,
  WellnessRetreat,
  RetailCommerce,
  MedicineConsult,
  HomeServices,
  ConstructionTracker,
  AEOEngine,
  N8nWorkflow,
  WordPressSite,
  ShopifyStore,
  AIDispatcher,
  FreightOps,
  WhatsAppCRM,
  AutoDealer,
  ContentPipeline,
  VideoEditor,
  BrandRescue,
};

export type IllustrationKey =
  | "dental"
  | "logistics"
  | "wellness"
  | "retail"
  | "medicine"
  | "home"
  | "construction"
  | "aeo"
  | "n8n"
  | "wp"
  | "shopify"
  | "ai-dispatcher"
  | "freight"
  | "whatsapp"
  | "auto"
  | "content"
  | "video"
  | "brand";

export const ILLUSTRATION_MAP: Record<
  IllustrationKey,
  React.ComponentType<{ className?: string }>
> = {
  dental: DentalFlow,
  logistics: LogisticsFlow,
  wellness: WellnessRetreat,
  retail: RetailCommerce,
  medicine: MedicineConsult,
  home: HomeServices,
  construction: ConstructionTracker,
  aeo: AEOEngine,
  n8n: N8nWorkflow,
  wp: WordPressSite,
  shopify: ShopifyStore,
  "ai-dispatcher": AIDispatcher,
  freight: FreightOps,
  whatsapp: WhatsAppCRM,
  auto: AutoDealer,
  content: ContentPipeline,
  video: VideoEditor,
  brand: BrandRescue,
};
