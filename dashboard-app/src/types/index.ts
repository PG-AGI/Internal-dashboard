// TypeScript interfaces for all API responses

// ===== Overall Analytics =====
export interface InfrastructureCostAllocation {
    asr: number;
    tts: number;
    llm: number;
}

export interface OverallAnalytics {
    totalMinutes: number;
    totalCost: number;
    totalRevenue: number;
    margin: number;
    costPerMinute: number;
    infrastructureCostAllocation: InfrastructureCostAllocation;
}

export interface OverallAnalyticsResponse {
    status: boolean;
    message: string;
    result: OverallAnalytics;
}

// ===== Storage Analytics =====
export interface CustomerStorage {
    _id: string;
    estimatedMonthlyCost: number;
    totalSize: number;
    totalSizeGB: number;
    userName: string;
}

export interface StorageAnalytics {
    customerWiseStorage: CustomerStorage[];
    storageRatePerGB: number;
    totalOverallCost: number;
    totalStorage: number;
    totalStorageGB: number;
}

export interface StorageAnalyticsResponse {
    status: boolean;
    message: string;
    result: StorageAnalytics;
}

// ===== Customer =====
export interface CostBreakdown {
    asr: number;
    llm: number;
    storage: number;
    tts: number;
    total?: number;
}

export interface TopCampaign {
    id: string;
    title: string;
    value: number;
}

export interface UsageData {
    date: string;
    value: number;
}

export interface CustomerSummary {
    costBreakdown: CostBreakdown;
    email: string;
    id: string;
    profit: number;
    revenue: number;
    top5Campaigns: TopCampaign[];
    totalCost: number;
    totalMinutes: number;
    totalTexts: number;
    usage30d: UsageData[];
    usage7d: UsageData[];
    usage90d: UsageData[];
    userName: string;
}

export interface CustomerSummaryResponse {
    status: boolean;
    message: string;
    result: CustomerSummary;
}

export interface CustomerListItem {
    _id: string;
    averageCallCost: number;
    createdAt: string;
    email: string;
    lastActive: string | null;
    messageSent: number;
    numReplies: number | null;
    totalCallTime: number;
    totalMinutes: number;
    totalNumCall: number;
    totalSpent: number;
    userName: string;
}

export interface CustomerListResponse {
    status: boolean;
    message: string;
    result: CustomerListItem[];
}

// ===== Campaign =====
export interface CallMetrics {
    costPerCall: number;
    pickupRate: number;
    totalCalls: number;
    totalMinutes: number;
}

export interface TextMetrics {
    costPerMsg: number;
    replyRate: number;
    totalMessages: number;
}

export interface Funnel {
    delivered: number;
    read: number;
    replied: number;
    sent: number;
}

export interface CampaignAnalytics {
    callMetrics: CallMetrics;
    costBreakdown: CostBreakdown;
    createdAt: string;
    funnel: Funnel;
    id: string;
    textMetrics: TextMetrics;
    title: string;
    userId: string;
}

export interface CampaignAnalyticsResponse {
    status: boolean;
    message: string;
    result: CampaignAnalytics;
}

export interface CampaignListItem {
    _id: string;
    asr: string;
    averageCallCost: number;
    calendar: string;
    clearMemory: boolean;
    createdAt: string;
    description: string;
    detectInactivity: boolean;
    firstLine: string;
    flowName: string;
    inactiveCallTimeout: number;
    isFreeflow: boolean;
    knowledgeBase: string;
    language: string;
    maxCallTimeout: number;
    postCallAnalysis: boolean;
    postCallAnalysisSchema: Record<string, string>;
    public: boolean;
    purpose: string;
    reschedule: string | null;
    sampleSid: string;
    script: string;
    silenceTimer: number;
    startMessage: boolean;
    successParameter: string | null;
    systemPrompt: string;
    textConfiguration: unknown | null;
    timeZone: string;
    title: string;
    tone: string;
    totalCallTime: number;
    totalNumCall: number;
    totalSpent: number;
    userId: string;
    voice: string;
    wordsToInterrupt: number;
}

export interface CampaignListResponse {
    status: boolean;
    message: string;
    result: CampaignListItem[];
}

// ===== Call Logs =====
export interface CallExtraInfo {
    actualElapse: number;
    asrCost: number;
    asrCostOwn: number;
    costUnit: string;
    gptCost: number;
    gptModel: string;
    totalCost: number;
    totalCostOwn: number;
    ttsCost: number;
    ttsCostOwn: number;
    twilioCost: number;
}

export interface PostCallAnalysisData {
    'Interested '?: boolean;
    bussiness?: string;
    'meeting booked?'?: boolean;
    success_reasoning?: string;
    [key: string]: unknown;
}

export interface CallLog {
    _id: string;
    asr: string;
    audio: string;
    audioLogs: string[];
    batchId: string;
    callCost: number;
    callCreatedTtime: string;
    callElapseTtime: number;
    callEndTtime: string;
    callSid: string;
    callStartTtime: string;
    callStatus: 'ANSWERED' | 'NO_ANSWER' | 'BUSY' | 'FAILED' | string;
    campaignId: string;
    clearMemory: boolean;
    createdAt: string;
    extraInfo: CallExtraInfo;
    extraParams: Record<string, unknown>;
    integrationInfo: Record<string, unknown>;
    isTextPipeline: boolean;
    meetingBooked: boolean | null;
    messageId: string | null;
    name: string;
    numMessages: number | null;
    phoneNumber: string;
    postCallAnalysisData: PostCallAnalysisData;
    rescheduled: boolean | null;
    schedulerStatus: string;
    startMessage: boolean;
    success: boolean | null;
    successReasoning: string | null;
    textStatus: string;
    transcription: string;
    userId: string;
}

export interface CallLogsResponse {
    status: boolean;
    message: string;
    result: CallLog[];
}

// ===== API Response wrapper =====
export interface ApiResponse<T> {
    status: boolean;
    message: string;
    result: T;
}
