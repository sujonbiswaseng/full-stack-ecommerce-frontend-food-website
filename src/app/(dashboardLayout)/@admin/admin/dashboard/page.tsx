
import { getStatsAction } from "@/actions/stats.actions";
import DashboardContent from "@/components/dashboard/DashboardContent";
import Notfounddata from "@/components/Notfounddata";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import ErrorFallback from "@/components/shared/ErrorFallback";
import { getSession } from "@/services/auth.service";
import { DashboardData } from "@/types/stats.type";

const AdminPage = async () => {
  const statsData = await getStatsAction();
  const userinfo = await getSession();
  const role = userinfo?.data?.role;
  if (!userinfo || role==null || !userinfo.success) {
    return (
      <Notfounddata
        content="You must be logged in as an admin to view the dashboard."
        btntext="Go to Login"
        emoji="🔒"
        filter=""
        path="/login"
        key="no-session-admin-dashboard"
      />
    );
  }

  return (
    <div className="w-full">
      <ErrorBoundary
        fallback={
          <ErrorFallback
            title="Dashboard Error"
            message="An error occurred while loading your dashboard. Please refresh the page or try again later."
          />
        }
      >
        {statsData ? (
          <div>
            <DashboardContent role={role as string} data={statsData.data as DashboardData} />
          </div>
        ) : (
          <div className="text-destructive">
            Failed to load dashboard data. Please try again later.
          </div>
        )}
      </ErrorBoundary>
    </div>
  );
};

export default AdminPage;
