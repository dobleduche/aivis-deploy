import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

import { useInitializeSettings } from "./hooks/useInitializeSettings";
import { useAuthStore } from "./stores/authStore";
import { useWorkspaceStore } from "./stores/workspaceStore";

import Layout from "./components/Layout";
import { CookieConsent } from "./components/CookieConsent";
import PageLoadingSpinner from "./components/PageLoadingSpinner";
import ProtectedRoute from "./components/ProtectedRoute";

import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import ReferralsPage from "./pages/ReferralsPage";
import SettingsPage from "./pages/SettingsPage";
import BillingPage from "./pages/BillingPage";
import AboutPage from "./pages/AboutPage";
import FAQ from "./pages/FAQ";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import VerifyLicensePage from "./pages/VerifyLicensePage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import PaymentCanceledPage from "./pages/PaymentCanceledPage";
import ResetAuth from "./pages/ResetAuth";
import ApiDocsPage from "./pages/ApiDocsPage";
import ServerHeadersPage from "./pages/ServerHeadersPage";
import IndexingPage from "./pages/IndexingPage";
import SchemaValidatorPage from "./pages/SchemaValidatorPage";
import RobotsCheckerPage from "./pages/RobotsCheckerPage";
import ContentExtractabilityPage from "./pages/ContentExtractabilityPage";

import Dashboard from "./views/Dashboard";
import AnalyzePage from "./views/AnalyzePage";
import PricingPage from "./views/PricingPage";
import AuthPage from "./views/AuthPage";
import AnalyticsPage from "./views/AnalyticsPage";
import KeywordsPage from "./views/KeywordsPage";
import CompetitorsPage from "./views/CompetitorsPage";
import NicheDiscoveryPage from "./views/NicheDiscoveryPage";
import CitationsPage from "./views/CitationsPage";
import ReportsPage from "./views/ReportsPage";
import GuidePage from "./views/GuidePage";
import ReverseEngineerPage from "./views/ReverseEngineerPage";
import PromptIntelligencePage from "./views/PromptIntelligencePage";
import AnswerPresencePage from "./views/AnswerPresencePage";
import BrandIntegrityPage from "./views/BrandIntegrityPage";
import ComparisonPage from "./pages/ComparisonPage";
import PlatformWorkflowPage from "./pages/PlatformWorkflowPage";
import MethodologyPage from "./pages/MethodologyPage";
import IntegrationsHubPage from "./pages/IntegrationsHubPage";
import McpConsolePage from "./pages/McpConsolePage";
import GscConsolePage from "./pages/GscConsolePage";
import CompetitiveLandscapePage from "./pages/CompetitiveLandscapePage";
import CompareOtterlyPage from "./pages/CompareOtterlyPage";
import CompareReauditPage from "./pages/CompareReauditPage";
import CompareProfoundPage from "./pages/CompareProfoundPage";
import CompareSemrushPage from "./pages/CompareSemrushPage";
import CompareAhrefsPage from "./pages/CompareAhrefsPage";
import CompareRankScalePage from "./pages/CompareRankScalePage";
import GlossaryPage from "./pages/GlossaryPage";
import AiVisibilityBenchmark from "./pages/AiVisibilityBenchmark";
import NotificationsPage from "./pages/NotificationsPage";
import Admin from "./pages/Admin";
import TeamPage from "./pages/TeamPage";

const ResetPassword = React.lazy(() => import("./pages/ResetPassword"));
const HelpCenter = React.lazy(() => import("./pages/HelpCenter"));
const Landing = React.lazy(() => import("./pages/Landing"));
const ScoreFixPage = React.lazy(() => import("./views/ScoreFixPage"));
const WhyAIVisibility = React.lazy(() => import("./pages/WhyAIVisibility"));
const AISearchVisibility2026 = React.lazy(() => import("./pages/AISearchVisibility2026"));
const InsightsPage = React.lazy(() => import("./pages/InsightsPage"));
const BlogsPage = React.lazy(() => import("./pages/BlogsPage"));
const BlogPostPage = React.lazy(() => import("./pages/BlogPostPage"));
const AEOPlaybook2026 = React.lazy(() => import("./pages/AEOPlaybook2026"));
const GeoAIRanking2026 = React.lazy(() => import("./pages/GeoAIRanking2026"));
const ConversationalQueryPlaybook2026 = React.lazy(() => import("./pages/ConversationalQueryPlaybook2026"));
const VoiceSearchAIAnswerOptimization2026 = React.lazy(() => import("./pages/VoiceSearchAIAnswerOptimization2026"));
const PublicReportPage = React.lazy(() => import("./pages/PublicReportPage"));
const CompliancePage = React.lazy(() => import("./pages/CompliancePage"));
const ChangelogPage = React.lazy(() => import("./pages/ChangelogPage"));
const PressPage = React.lazy(() => import("./pages/PressPage"));
const InviteAcceptPage = React.lazy(() => import("./pages/InviteAcceptPage"));

/* ── Scroll to top on route change ─────────────────────── */
function ScrollToTop() {
  const { pathname, hash, search } = useLocation();
  useEffect(() => {
    const sectionParam = new URLSearchParams(search).get("section");
    const targetId = hash ? decodeURIComponent(hash.replace(/^#/, "")) : sectionParam;

    if (targetId) {
      const tryScroll = () => {
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
      };
      window.setTimeout(tryScroll, 0);
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname, hash, search]);
  return null;
}

function AuthRouteGate() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const location = useLocation();

  if (isAuthenticated) {
    const params = new URLSearchParams(location.search);
    let redirect = params.get("redirect") || "/";
    // Prevent open redirect: only allow relative paths (no protocol or //)
    if (redirect.includes("://") || redirect.startsWith("//")) {
      redirect = "/";
    }
    return <Navigate to={redirect} replace />;
  }

  return <AuthPage />;
}

export default function App() {
  useInitializeSettings();
  const isHydrated = useAuthStore((s) => s.isHydrated);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const fetchWorkspaces = useWorkspaceStore((s) => s.fetchWorkspaces);

  useEffect(() => {
    if (isHydrated && isAuthenticated) fetchWorkspaces();
  }, [isHydrated, isAuthenticated, fetchWorkspaces]);

  return (
    <div className="brand-vivid-ui">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "rgba(15,18,28,0.92)",
            color: "#ffffff",
            border: "1px solid rgba(255,255,255,0.22)",
            borderRadius: "12px",
            fontSize: "14px",
          },
          success: { iconTheme: { primary: "rgba(255,255,255,0.9)", secondary: "rgba(15,18,28,0.92)" } },
          error: {
            iconTheme: { primary: "#fecaca", secondary: "rgba(15,18,28,0.92)" },
            duration: 4000,
          },
        }}
      />
      <CookieConsent />
      <ScrollToTop />

      {!isHydrated ? null : (
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analyze" element={<AnalyzePage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/auth" element={<AuthRouteGate />} />
            <Route path="/reset-auth" element={<ResetAuth />} />
            <Route path="/analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
            <Route path="/keywords" element={<ProtectedRoute><KeywordsPage /></ProtectedRoute>} />
            <Route path="/competitors" element={<ProtectedRoute><CompetitorsPage /></ProtectedRoute>} />
            <Route path="/niche-discovery" element={<ProtectedRoute><NicheDiscoveryPage /></ProtectedRoute>} />
            <Route path="/citations" element={<ProtectedRoute><CitationsPage /></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} />
            <Route path="/reverse-engineer" element={<ProtectedRoute><ReverseEngineerPage /></ProtectedRoute>} />
            <Route path="/prompt-intelligence" element={<ProtectedRoute><PromptIntelligencePage /></ProtectedRoute>} />
            <Route path="/answer-presence" element={<ProtectedRoute><AnswerPresencePage /></ProtectedRoute>} />
            <Route path="/brand-integrity" element={<ProtectedRoute><BrandIntegrityPage /></ProtectedRoute>} />
            <Route path="/compare" element={<ComparisonPage />} />
            <Route path="/compare/aivis-vs-otterly" element={<CompareOtterlyPage />} />
            <Route path="/compare/aivis-vs-reaudit" element={<CompareReauditPage />} />
            <Route path="/compare/aivis-vs-profound" element={<CompareProfoundPage />} />
            <Route path="/compare/aivis-vs-semrush" element={<CompareSemrushPage />} />
            <Route path="/compare/aivis-vs-ahrefs" element={<CompareAhrefsPage />} />
            <Route path="/compare/aivis-vs-rankscale" element={<CompareRankScalePage />} />
            <Route path="/glossary" element={<GlossaryPage />} />
            <Route path="/benchmarks" element={<AiVisibilityBenchmark />} />
            <Route path="/workflow" element={<PlatformWorkflowPage />} />
            <Route path="/methodology" element={<MethodologyPage />} />
            <Route path="/integrations" element={<IntegrationsHubPage />} />
            <Route path="/mcp" element={<ProtectedRoute><McpConsolePage /></ProtectedRoute>} />
            <Route path="/gsc" element={<ProtectedRoute><GscConsolePage /></ProtectedRoute>} />
            <Route path="/competitive-landscape" element={<CompetitiveLandscapePage />} />

            <Route
              path="/score-fix"
              element={
                <ProtectedRoute>
                  <React.Suspense fallback={<PageLoadingSpinner />}>
                    <ScoreFixPage />
                  </React.Suspense>
                </ProtectedRoute>
              }
            />

            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/referrals" element={<ProtectedRoute><ReferralsPage /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
            <Route path="/billing" element={<ProtectedRoute><BillingPage /></ProtectedRoute>} />
            <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
            <Route path="/team" element={<ProtectedRoute><TeamPage /></ProtectedRoute>} />
            <Route path="/about" element={<AboutPage />} />
            <Route
              path="/press"
              element={
                <React.Suspense fallback={<PageLoadingSpinner />}>
                  <PressPage />
                </React.Suspense>
              }
            />

            <Route path="/faq" element={<FAQ />} />
            <Route path="/guide" element={<GuidePage />} />
            <Route path="/api-docs" element={<ApiDocsPage />} />
            <Route path="/server-headers" element={<ServerHeadersPage />} />
            <Route path="/indexing" element={<IndexingPage />} />
            <Route path="/tools/schema-validator" element={<SchemaValidatorPage />} />
            <Route path="/tools/robots-checker" element={<RobotsCheckerPage />} />
            <Route path="/tools/content-extractability" element={<ContentExtractabilityPage />} />
            <Route
              path="/help"
              element={
                <React.Suspense fallback={<PageLoadingSpinner />}>
                  <HelpCenter />
                </React.Suspense>
              }
            />
            <Route path="/support" element={<Navigate to="/help" replace />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route
              path="/compliance"
              element={
                <React.Suspense fallback={<PageLoadingSpinner />}>
                  <CompliancePage />
                </React.Suspense>
              }
            />
            <Route
              path="/changelog"
              element={
                <React.Suspense fallback={<PageLoadingSpinner />}>
                  <ChangelogPage />
                </React.Suspense>
              }
            />

            <Route path="/verify-email" element={<VerifyEmailPage />} />
            <Route path="/verify-license" element={<VerifyLicensePage />} />
            <Route
              path="/invite/:token"
              element={
                <React.Suspense fallback={<PageLoadingSpinner />}>
                  <InviteAcceptPage />
                </React.Suspense>
              }
            />

            <Route
              path="/reset-password"
              element={
                <React.Suspense fallback={<PageLoadingSpinner />}>
                  <ResetPassword />
                </React.Suspense>
              }
            />

            <Route path="/payment-success" element={<PaymentSuccessPage />} />
            <Route path="/payment-canceled" element={<PaymentCanceledPage />} />

            <Route
              path="/landing"
              element={
                <React.Suspense fallback={<PageLoadingSpinner />}>
                  <Landing />
                </React.Suspense>
              }
            />
            <Route
              path="/why-ai-visibility"
              element={
                <React.Suspense fallback={<PageLoadingSpinner />}>
                  <WhyAIVisibility />
                </React.Suspense>
              }
            />
            <Route
              path="/ai-search-visibility-2026"
              element={
                <React.Suspense fallback={<PageLoadingSpinner />}>
                  <AISearchVisibility2026 />
                </React.Suspense>
              }
            />
            <Route
              path="/insights"
              element={
                <React.Suspense fallback={<PageLoadingSpinner />}>
                  <InsightsPage />
                </React.Suspense>
              }
            />
            <Route
              path="/blogs"
              element={
                <React.Suspense fallback={<PageLoadingSpinner />}>
                  <BlogsPage />
                </React.Suspense>
              }
            />
            <Route
              path="/blogs/:slug"
              element={
                <React.Suspense fallback={<PageLoadingSpinner />}>
                  <BlogPostPage />
                </React.Suspense>
              }
            />
            <Route
              path="/aeo-playbook-2026"
              element={
                <React.Suspense fallback={<PageLoadingSpinner />}>
                  <AEOPlaybook2026 />
                </React.Suspense>
              }
            />
            <Route
              path="/geo-ai-ranking-2026"
              element={
                <React.Suspense fallback={<PageLoadingSpinner />}>
                  <GeoAIRanking2026 />
                </React.Suspense>
              }
            />
            <Route
              path="/conversational-query-playbook-2026"
              element={
                <React.Suspense fallback={<PageLoadingSpinner />}>
                  <ConversationalQueryPlaybook2026 />
                </React.Suspense>
              }
            />
            <Route
              path="/voice-search-ai-answer-optimization-2026"
              element={
                <React.Suspense fallback={<PageLoadingSpinner />}>
                  <VoiceSearchAIAnswerOptimization2026 />
                </React.Suspense>
              }
            />
            <Route
              path="/report/public/:token"
              element={
                <React.Suspense fallback={<PageLoadingSpinner />}>
                  <PublicReportPage />
                </React.Suspense>
              }
            />
            <Route
              path="/report/:token"
              element={
                <React.Suspense fallback={<PageLoadingSpinner />}>
                  <PublicReportPage />
                </React.Suspense>
              }
            />

            <Route path="/login" element={<Navigate to="/auth?mode=signin" replace />} />
            <Route path="/register" element={<Navigate to="/auth?mode=signup" replace />} />
            <Route path="/dashboard" element={<Navigate to="/" replace />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      )}
    </div>
  );
}
