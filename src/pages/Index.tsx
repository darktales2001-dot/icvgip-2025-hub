import { PageLayout } from "@/components/PageLayout";
import { SessionCard } from "@/components/SessionCard";
import { Mic, Image, Eye, Building2, Calendar } from "lucide-react";
import scheduleImage from "@/assets/schedule.png";

const oralSessions = [
  { id: 1, title: "Oral Session-1", time: "Dec 18 - 9:00 AM" },
  { id: 2, title: "Oral Session-2", time: "Dec 19 - 9:00 AM" },
  { id: 3, title: "Oral Session-3", time: "Dec 19 - 2:30 PM" },
  { id: 4, title: "Oral Session-4", time: "Dec 20 - 9:00 AM" },
  { id: 5, title: "Oral Session-5", time: "Dec 20 - 2:30 PM" },
  { id: 6, title: "Oral Session-6", time: "Dec 20 - 2:30 PM" },
];

const posterSessions = [
  { id: 1, title: "Poster Session-1", time: "Dec 18 - 2:30 PM", desc: "Includes poster/oral papers, Vision India posters" },
  { id: 2, title: "Poster Session-2", time: "Dec 19 - 2:30 PM", desc: "Includes poster/oral papers, Tiny Papers Track posters" },
];

const industrySessions = [
  { id: 1, title: "Industry Session-1", time: "Dec 19 - 9:00 AM" },
  { id: 2, title: "Industry Session-2", time: "Dec 20 - 9:00 AM" },
  { id: 3, title: "Industry Session-3", time: "Dec 20 - 9:00 AM" },
];

export default function Index() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
          <Calendar className="h-4 w-4" />
          December 17-20, 2025
        </div>
        <h1 className="text-4xl font-bold text-foreground md:text-5xl font-serif mb-3">
          ICVGIP 2025 Program Schedule
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Indian Conference on Computer Vision, Graphics and Image Processing
        </p>
        <p className="text-muted-foreground mt-1">
          Venue: Auditorium Complex
        </p>
      </div>

      {/* Schedule Image */}
      <div className="mb-12 rounded-xl border border-border bg-card p-4 shadow-lg overflow-x-auto">
        <img
          src={scheduleImage}
          alt="ICVGIP 2025 Program Schedule"
          className="w-full min-w-[800px] rounded-lg"
        />
      </div>

      {/* Quick Navigation Cards */}
      <div className="space-y-8">
        {/* Vision India */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Eye className="h-5 w-5 text-accent" />
            Vision-India Session
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <SessionCard
              title="Vision-India Session"
              description="Showcasing research from Indian institutions at top-tier venues"
              link="/vision-india"
              variant="vision"
              icon={<Eye className="h-5 w-5 text-accent" />}
            />
          </div>
        </section>

        {/* Oral Sessions */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Mic className="h-5 w-5 text-primary" />
            Oral Sessions
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {oralSessions.map((session) => (
              <SessionCard
                key={session.id}
                title={session.title}
                description={session.time}
                link="/oral-sessions"
                variant="oral"
                icon={<Mic className="h-5 w-5 text-primary" />}
              />
            ))}
          </div>
        </section>

        {/* Poster Sessions */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Image className="h-5 w-5 text-[hsl(142,76%,40%)]" />
            Poster Sessions
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {posterSessions.map((session) => (
              <SessionCard
                key={session.id}
                title={session.title}
                description={`${session.time} • ${session.desc}`}
                link="/poster-sessions"
                variant="poster"
                icon={<Image className="h-5 w-5 text-[hsl(142,76%,40%)]" />}
              />
            ))}
          </div>
        </section>

        {/* Industry Sessions */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Building2 className="h-5 w-5 text-[hsl(340,82%,50%)]" />
            Industry Sessions
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {industrySessions.map((session) => (
              <SessionCard
                key={session.id}
                title={session.title}
                description={session.time}
                link="/"
                variant="industry"
                icon={<Building2 className="h-5 w-5 text-[hsl(340,82%,50%)]" />}
              />
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
