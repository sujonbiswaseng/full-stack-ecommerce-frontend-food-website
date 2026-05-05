import React from "react";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { getOwnPaymentActions } from "@/actions/order.action";
import Notfounddata from "@/components/Notfounddata";
import { TResponseOrderData } from "@/types/order/order.type";
import { TBasePayment } from "@/types/payment.type";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// InfoRow is an atomic, token-based, semantic row for displaying a label:value pattern
const InfoRow = ({
  label,
  value,
  highlight,
  mono = false,
}: {
  label: string;
  value: React.ReactNode;
  highlight?: boolean;
  mono?: boolean;
}) => (
  <div className="flex flex-row gap-4 py-2">
    <span className="text-muted-foreground font-medium min-w-[128px]">
      {label}:
    </span>
    <span
      className={[
        highlight
          ? "text-accent font-semibold"
          : mono
          ? "font-mono text-muted-foreground"
          : "text-foreground",
        "truncate",
      ].join(" ")}
    >
      {value}
    </span>
  </div>
);

const ResultStatusIcon = ({
  isSuccess,
}: {
  isSuccess: boolean;
}) => (
  <span
    className={`rounded-full p-4 bg-card border border-border shadow flex items-center justify-center mb-4 transition-colors duration-300 ${
      isSuccess
        ? "bg-accent/10 text-accent border-accent"
        : "bg-secondary/10 text-primary border-primary"
    }`}
    aria-label={isSuccess ? "Payment Successful" : "Payment Failed"}
  >
    <CheckCircle2
      className={
        isSuccess ? "text-accent" : "text-destructive"
      }
      size={48}
      strokeWidth={2.4}
    />
  </span>
);

const PaymentCard = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <motion.section
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="bg-card border border-border rounded-2xl shadow-lg px-6 py-8 md:px-8 w-full flex flex-col items-center gap-6 relative z-10"
    role="region"
    aria-label="Payment Card"
  >
    {children}
  </motion.section>
);

const CardDivider = () => (
  <div className="border-t border-border w-full my-6" aria-hidden="true" />
);

const SectionContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <div className="w-full max-w-[32rem] mx-auto px-4 py-8 md:py-12 flex flex-col items-center min-h-screen justify-center bg-background">
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center select-none -z-10">
      {/* Subtle background blob gradient, token-based */}
      <svg width="420" height="420" className="opacity-30 scale-110">
        <defs>
          <radialGradient id="g1" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="var(--background)" />
          </radialGradient>
        </defs>
        <circle cx="210" cy="210" r="210" fill="url(#g1)" />
      </svg>
    </div>
    {children}
  </div>
);

const RegistrationSummary = ({
  data,
}: {
  data: TResponseOrderData<{ payment: TBasePayment }>;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="w-full bg-card border border-border shadow-inner rounded-xl p-6 flex flex-col gap-2"
  >
    <InfoRow label="Order ID" value={data?.id || "-"} mono />
    <InfoRow label="Customer ID" value={data?.customerId || "-"} mono />
    <InfoRow label="Provider ID" value={data?.providerId || "-"} mono />
    <InfoRow label="First Name" value={data?.first_name || "-"} />
    <InfoRow label="Last Name" value={data?.last_name || "-"} />
    <InfoRow
      label="Total Price"
      value={
        <span className="inline-flex items-center font-semibold text-accent">
          <span className="mr-1 text-lg font-bold">৳</span>
          {data?.totalPrice ?? "-"}
        </span>
      }
    />
    <InfoRow label="Phone" value={data?.phone || "-"} />
    <InfoRow label="Address" value={data?.address || "-"} />
    <InfoRow
      label="Date"
      value={
        data?.createdAt
          ? new Date(data.createdAt).toLocaleString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : "-"
      }
    />
    <InfoRow
      label="Amount Paid"
      value={
        data?.payment?.amount ? `৳${data.payment.amount}` : "-"
      }
      highlight
    />
    <InfoRow
      label="Status"
      value={
        <span
          className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
            (data?.status || "").toLowerCase() === "paid"
              ? "bg-accent/10 text-accent"
              : (data?.status || "").toLowerCase() === "pending"
              ? "bg-secondary text-secondary"
              : "bg-destructive/10 text-destructive"
          }`}
        >
          {data?.status || "Unknown"}
        </span>
      }
    />
    <InfoRow
      label="Payment Status"
      value={
        <span
          className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
            (data?.payment?.status || "").toLowerCase() === "paid"
              ? "bg-accent/10 text-accent"
              : (data?.payment?.status || "").toLowerCase() === "pending"
              ? "bg-secondary text-secondary"
              : "bg-destructive/10 text-destructive"
          }`}
        >
          {data?.payment?.status || "Unknown"}
        </span>
      }
    />
    <InfoRow label="Payment ID" value={data?.payment?.id || "-"} mono />
    <InfoRow label="Transaction ID" value={data?.payment?.transactionId || "-"} mono />
  </motion.div>
);

const TrackingReferenceCard = ({
  orderId,
  paymentId,
}: {
  orderId: string;
  paymentId: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="bg-card border border-border rounded-xl shadow-inner p-6"
  >
    <div className="flex items-center justify-between mb-4">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
        Tracking Reference
      </p>
      <span className="text-xs font-bold bg-destructive/10 text-destructive px-3 py-1 rounded">
        FAILED
      </span>
    </div>
    <details className="group w-full">
      <summary className="cursor-pointer text-sm font-medium text-primary underline select-none">
        Show IDs
      </summary>
      <div className="mt-3 flex flex-col gap-2">
        <InfoRow label="Order ID" value={orderId} mono />
        <InfoRow label="Payment ID" value={paymentId} mono />
      </div>
    </details>
    <p className="mt-4 text-xs text-muted-foreground">
      Please try payment again. If this issue continues, contact support with these IDs.
    </p>
  </motion.div>
);

const HelpFooter = () => (
  <div className="w-full text-xs text-muted-foreground pt-8 text-center">
    Need help?&nbsp;
    <a
      href="https://wa.me/01804935939"
      className="underline text-primary hover:text-accent transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      Contact Support
    </a>
  </div>
);

const PaymentSuccessPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) => {
  try {
    const { id } = await params;
    const resolvedSearchParams = await searchParams;
    const paymentId = (resolvedSearchParams?.paymentId as string | undefined) ?? "-";
    const orderResult = await getOwnPaymentActions(id, paymentId);
    const paymentData = orderResult?.data as TResponseOrderData<{ payment: TBasePayment }>;
    const isServiceSuccess = Boolean(orderResult?.success);
    const paymentStatus = paymentData?.payment?.status === "PAID";
    const isSuccessView = isServiceSuccess && paymentStatus;

    return (
      <main className="relative bg-background min-h-screen flex items-center justify-center">
        <SectionContainer>
          <PaymentCard>
            <ResultStatusIcon isSuccess={isSuccessView} />
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex flex-col items-center gap-2 mb-2"
            >
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                {isSuccessView ? "Payment Successful" : "Payment Failed"}
              </h1>
              <p className="text-sm text-muted-foreground text-center max-w-xs">
                {isSuccessView
                  ? "Thank you for your payment. Your registration has been confirmed. All details are below."
                  : orderResult?.message ||
                    "We could not verify this payment in our records. Please try again or contact support."}
              </p>
            </motion.div>
            <div className="w-full">
              <CardDivider />
              <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-4">
                Registration Summary
              </h2>
              {isSuccessView || isServiceSuccess !== false ? (
                <RegistrationSummary data={paymentData} />
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="my-8 flex flex-col gap-4 w-full"
                >
                  <div className="text-center space-y-2">
                    <p className="text-sm font-semibold text-destructive">
                      Payment Verification Failed
                    </p>
                    <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                      No payment record was found for this event right now.
                    </p>
                  </div>
                  <TrackingReferenceCard orderId={id} paymentId={paymentId} />
                </motion.div>
              )}
            </div>
            <div className="flex flex-col md:flex-row gap-4 w-full mt-8">
              <Button asChild variant="default" size="lg" className="flex-1">
                <Link href="/Meals">Browse More Meals</Link>
              </Button>
              <Button asChild variant="secondary" size="lg" className="flex-1">
                <Link href="/">Home</Link>
              </Button>
            </div>
            <HelpFooter />
          </PaymentCard>
        </SectionContainer>
      </main>
    );
  } catch (error) {
    return (
      <Notfounddata
        content="Something went wrong. Please try again."
        btntext="Home"
        path="/"
      />
    );
  }
};

export default PaymentSuccessPage;