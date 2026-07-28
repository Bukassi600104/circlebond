import { Bell, Share2 } from "lucide-react";
import {
  ActivityItem,
  AnnouncementCard,
  Button,
  CircleCard,
  Comment,
  IconButton,
  LoadingSkeleton,
  MemberAvatar,
  NotificationItem,
  ProgressBar,
  ProgressRing,
  StatusBadge,
  Tabs,
  TierCard,
} from "@/components/ui";
import {
  AmountInput,
  DatePicker,
  EmailInput,
  OtpInput,
  PhoneInput,
  Textarea,
  TextInput,
  UploadField,
} from "@/components/forms";
import {
  BottomSheet,
  ConfirmationDialog,
  EmptyState,
  ErrorState,
  Modal,
  Toast,
} from "@/components/feedback";
import {
  BrandLockup,
  ComponentSection,
  NavigationBar,
  Sidebar,
  TopToolbar,
} from "@/components/layout";

function SpecimenCard({
  children,
  title,
  wide = false,
  full = false,
}: {
  children: React.ReactNode;
  title: string;
  wide?: boolean;
  full?: boolean;
}) {
  return (
    <div
      className={`bc-specimen-card ${wide ? "bc-specimen-card--wide" : ""} ${
        full ? "bc-specimen-card--full" : ""
      }`}
    >
      <h3>{title}</h3>
      {children}
    </div>
  );
}

const colors = [
  ["Deep Teal", "teal"],
  ["Muted Green", "green"],
  ["Soft Coral", "coral"],
  ["Coral Light", "coral-light"],
  ["Warm Gold", "gold"],
  ["Gold Light", "gold-light"],
  ["Mint Tint", "mint"],
  ["Soft Grey", "grey"],
];

export default function ComponentLibraryPage() {
  return (
    <main className="bc-specimen">
      <section className="bc-specimen-hero">
        <div className="bc-specimen-hero__inner">
          <BrandLockup inverse />
          <p className="bc-specimen-hero__eyebrow">
            MILESTONE 2 · LOCKED VISUAL SYSTEM
          </p>
          <h1>Warm, trustworthy components for important moments.</h1>
          <p>
            The reusable BondCircle interface system for mobile-first product
            screens and expanded desktop workflows.
          </p>
        </div>
      </section>

      <div className="bc-token-strip" aria-label="Approved colour tokens">
        {colors.map(([label, token]) => (
          <div className={`bc-token bc-token--${token}`} key={token}>
            {label}
          </div>
        ))}
      </div>

      <div className="bc-specimen-main">
        <ComponentSection
          title="Typography and actions"
          description="Lora Semibold is reserved for the brand and selected headings. Inter carries every product interaction."
        >
          <SpecimenCard title="Type hierarchy">
            <div className="bc-stack bc-stack--vertical">
              <span
                style={{
                  fontFamily: "var(--font-brand)",
                  fontSize: "var(--text-h1)",
                }}
              >
                Celebrate together
              </span>
              <strong>Product heading</strong>
              <span>Body text for clear, calm instructions.</span>
              <small>Caption and supporting information</small>
            </div>
          </SpecimenCard>
          <SpecimenCard title="Button states" wide>
            <div className="bc-stack">
              <Button>Primary button</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost button</Button>
              <Button variant="danger">Delete</Button>
              <Button loading>Continue</Button>
              <Button disabled>Disabled</Button>
              <IconButton label="Notifications">
                <Bell size={19} />
              </IconButton>
              <IconButton label="Share circle">
                <Share2 size={19} />
              </IconButton>
            </div>
          </SpecimenCard>
        </ComponentSection>

        <ComponentSection
          title="Inputs and uploads"
          description="Every field carries a label, clear validation, optional guidance, and a minimum 44 px interaction target."
        >
          <SpecimenCard title="Identity fields">
            <div className="bc-stack bc-stack--vertical">
              <TextInput
                id="full-name"
                label="Full name"
                placeholder="Enter your full name"
              />
              <EmailInput
                id="email"
                label="Email address"
                placeholder="name@example.com"
                state="success"
                helper="Email address is valid"
              />
              <PhoneInput
                id="phone"
                label="Phone number"
                placeholder="+234 810 123 4567"
              />
            </div>
          </SpecimenCard>
          <SpecimenCard title="Circle fields">
            <div className="bc-stack bc-stack--vertical">
              <AmountInput
                id="amount"
                label="Target amount"
                placeholder="300,000"
              />
              <DatePicker id="event-date" label="Event date" />
              <TextInput
                id="invalid-name"
                label="Circle name"
                placeholder="Enter a circle name"
                state="error"
                helper="Circle name is required"
              />
            </div>
          </SpecimenCard>
          <SpecimenCard title="Verification and details">
            <div className="bc-stack bc-stack--vertical">
              <OtpInput />
              <Textarea
                id="announcement"
                label="Announcement"
                placeholder="Write an update for your circle"
              />
            </div>
          </SpecimenCard>
          <SpecimenCard title="Upload field" full>
            <UploadField id="receipt-upload" label="Upload payment proof" />
          </SpecimenCard>
        </ComponentSection>

        <ComponentSection
          title="Cards, members, and progress"
          description="Reusable data components mirror the approved mobile cards and expand cleanly across desktop layouts."
        >
          <SpecimenCard title="Circle card" wide>
            <CircleCard
              name="Ada’s Birthday Gift"
              type="Gift Circle · 6 members"
              amount="₦200,000"
              target="₦300,000"
              progress={67}
              status="active"
            />
          </SpecimenCard>
          <SpecimenCard title="Progress">
            <div className="bc-stack">
              <ProgressRing label="Contribution completion" value={67} />
              <div style={{ flex: 1 }}>
                <ProgressBar label="₦200,000 of ₦300,000" value={67} />
              </div>
            </div>
          </SpecimenCard>
          <SpecimenCard title="Member avatars">
            <div className="bc-stack">
              <MemberAvatar
                initials="AO"
                name="Amara Okafor"
                role="creator"
                size="large"
              />
              <MemberAvatar initials="CA" name="Chioma Ade" />
              <MemberAvatar initials="FL" name="Femi Lawal" size="small" />
            </div>
          </SpecimenCard>
          <SpecimenCard title="Status badges" wide>
            <div className="bc-stack">
              <StatusBadge status="draft" />
              <StatusBadge status="active" />
              <StatusBadge status="pending" />
              <StatusBadge status="invited" />
              <StatusBadge status="joined" />
              <StatusBadge status="receipt-submitted" />
              <StatusBadge status="awaiting-review" />
              <StatusBadge status="part-paid" />
              <StatusBadge status="paid" />
              <StatusBadge status="completed" />
              <StatusBadge status="archived" />
              <StatusBadge status="rejected" />
              <StatusBadge status="cancelled" />
              <StatusBadge status="delivered" />
            </div>
          </SpecimenCard>
          <SpecimenCard title="Tier cards" full>
            <div className="bc-tier-row">
              <TierCard
                name="Tier A · Classic"
                amount="₦8,000"
                gift="Gift: Mug"
              />
              <TierCard
                name="Tier B · Celebration"
                amount="₦25,000"
                gift="Gift: Cooler"
                selected
              />
              <TierCard
                name="Tier C · Premium"
                amount="₦110,000"
                gift="Gift: Gas Cooker"
              />
            </div>
          </SpecimenCard>
        </ComponentSection>

        <ComponentSection
          title="Communication and feedback"
          description="Updates stay readable, calm, and explicit; status is never communicated by colour alone."
        >
          <SpecimenCard title="Tabs" full>
            <Tabs
              active="Overview"
              items={[
                "Overview",
                "Members",
                "Contributions",
                "Announcements",
                "Activity",
              ]}
            />
          </SpecimenCard>
          <SpecimenCard title="Notifications">
            <NotificationItem
              title="New invitation received"
              detail="You have an invitation to join a circle."
              unread
            />
            <NotificationItem
              title="Receipt submitted"
              detail="A payment proof is awaiting review."
            />
          </SpecimenCard>
          <SpecimenCard title="Activity">
            <ActivityItem
              title="Chioma submitted a receipt"
              detail="2 hours ago"
            />
            <ActivityItem title="Bola joined the circle" detail="Yesterday" />
          </SpecimenCard>
          <SpecimenCard title="Comment">
            <Comment author="Chioma" time="1 hour ago">
              Great update! Thank you.
            </Comment>
          </SpecimenCard>
          <SpecimenCard title="Announcement" wide>
            <AnnouncementCard
              title="Gift delivery update"
              body="The main gift has been ordered and will be delivered before the event date."
              pinned
            />
          </SpecimenCard>
          <SpecimenCard title="Toast">
            <div className="bc-stack bc-stack--vertical">
              <Toast>Payment proof uploaded successfully.</Toast>
              <Toast kind="error">Upload failed. Please try again.</Toast>
            </div>
          </SpecimenCard>
        </ComponentSection>

        <ComponentSection
          title="Overlays and system states"
          description="Dialogs, sheets, loading, empty, and error states share the same restrained visual language."
        >
          <SpecimenCard title="Modal" wide>
            <Modal
              title="Assign co-admin"
              description="Choose a trusted member to help manage this circle."
            >
              <div className="bc-stack">
                <Button variant="secondary">Cancel</Button>
                <Button>Assign member</Button>
              </div>
            </Modal>
          </SpecimenCard>
          <SpecimenCard title="Bottom sheet">
            <BottomSheet title="Contributor options">
              <div className="bc-stack bc-stack--vertical">
                <Button>Upload receipt</Button>
                <Button variant="secondary">Confirm payment</Button>
              </div>
            </BottomSheet>
          </SpecimenCard>
          <SpecimenCard title="Confirmation dialog">
            <ConfirmationDialog
              title="Delete announcement?"
              body="This action cannot be undone."
              confirmLabel="Delete"
            />
          </SpecimenCard>
          <SpecimenCard title="Empty state">
            <EmptyState
              title="No circles yet"
              message="Create your first circle to bring people together."
              action="Create circle"
            />
          </SpecimenCard>
          <SpecimenCard title="Error state">
            <ErrorState
              title="Network error"
              message="We could not load this information. Check your connection and try again."
            />
          </SpecimenCard>
          <SpecimenCard title="Loading skeleton">
            <LoadingSkeleton />
          </SpecimenCard>
        </ComponentSection>

        <ComponentSection
          title="Responsive navigation"
          description="Mobile uses a five-item bottom navigation. Desktop uses a left sidebar and compact top toolbar."
        >
          <SpecimenCard title="Mobile navigation">
            <div className="bc-mobile-frame">
              <TopToolbar title="Dashboard" />
              <div style={{ minHeight: "12rem" }} />
              <NavigationBar />
            </div>
          </SpecimenCard>
          <SpecimenCard title="Desktop sidebar">
            <Sidebar />
          </SpecimenCard>
          <SpecimenCard title="Desktop toolbar">
            <TopToolbar title="Wedding Gift Circle" />
          </SpecimenCard>
        </ComponentSection>
      </div>
    </main>
  );
}
