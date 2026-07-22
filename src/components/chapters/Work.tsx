"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { profile } from "@/content/profile";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { Carousel } from "@/components/ui/Carousel";

// Flattened (non-union) shape so optional media fields narrow predictably —
// `(typeof profile.work.projects)[number]` is a union of per-project literal
// types, which makes control-flow narrowing on `image`/`video` collapse to `never`.
type Project = {
  [K in keyof (typeof profile.work.projects)[number]]: (typeof profile.work.projects)[number][K];
} & {
  image?: string;
  imageCaption?: string;
  video?: string;
  tools?: string[];
  gallery?: readonly { src: string; caption?: string; focus?: string }[];
  galleryGroups?: readonly {
    label: string;
    items: readonly { src?: string; video?: string; caption?: string; focus?: string }[];
  }[];
};

function CaseStudy({ project, open, onToggle }: { project: Project; open: boolean; onToggle: () => void }) {
  const { image, imageCaption, video, gallery, galleryGroups, company, role, duration, metrics, tools } = project;
  const hasVideo = Boolean(video);
  const hasGalleryGroups = Boolean(galleryGroups && galleryGroups.length > 0);
  const hasGallery = Boolean((gallery && gallery.length > 0) || hasGalleryGroups);
  const hasMedia = Boolean(image || video || hasGallery);
  const triggerId = `case-study-trigger-${project.index}`;
  const panelId = `case-study-panel-${project.index}`;
  return (
    <div className="border-b border-paper/10">
      <button
        id={triggerId}
        onClick={onToggle}
        data-cursor={open ? "Close" : "Open"}
        className="group grid w-full grid-cols-12 items-start gap-4 py-8 text-left md:items-center md:py-12"
        aria-expanded={open}
        aria-controls={panelId}
      >
        <span className="col-span-2 font-mono text-sm text-gold md:col-span-1">{project.index}</span>
        <div className="col-span-10 md:col-span-7">
          <h3 className="font-display text-3xl leading-tight transition-transform duration-500 group-hover:translate-x-2 md:text-5xl">
            {project.name}
          </h3>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.15em] text-paper/60">
            {company} · {role} · {duration}
          </p>
          {metrics.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {metrics.map((m) => (
                <span
                  key={m}
                  className="rounded-full border border-gold/30 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-gold"
                >
                  {m}
                </span>
              ))}
            </div>
          )}
        </div>
        <span className="col-span-8 col-start-3 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/60 md:col-span-3 md:col-start-auto">
          {project.tag}
        </span>
        <span aria-hidden="true" className="col-span-2 flex justify-end md:col-span-1">
          <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.4 }} className="text-2xl text-gold">
            +
          </motion.span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={triggerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            {hasMedia && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-10 md:pl-[8.33%]"
              >
                {hasGalleryGroups ? (
                  <div className="space-y-10">
                    {galleryGroups!.map((group) => (
                      <div key={group.label}>
                        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/60">
                          {group.label}
                        </p>
                        <Carousel
                          label={`${project.name} — ${group.label}`}
                          accent="bg-gold"
                          slideClassName="w-[85vw] max-w-[560px] md:w-[560px]"
                        >
                          {group.items.map((g, i) => (
                            <div key={g.src ?? g.video} className="h-full overflow-hidden border border-paper/10 bg-graphite">
                              <div className="relative aspect-video w-full">
                                {g.video ? (
                                  <video
                                    controls
                                    preload="none"
                                    playsInline
                                    className="h-full w-full bg-graphite object-contain"
                                  >
                                    <source src={g.video} type="video/mp4" />
                                  </video>
                                ) : (
                                  <Image
                                    src={g.src!}
                                    alt={g.caption ?? project.name}
                                    fill
                                    sizes="(min-width: 768px) 560px, 85vw"
                                    className="object-cover"
                                    style={g.focus ? { objectPosition: g.focus } : undefined}
                                    loading={i === 0 ? "eager" : "lazy"}
                                  />
                                )}
                              </div>
                              {g.caption && (
                                <p className="border-t border-paper/15 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.15em] text-paper/60">
                                  {g.caption}
                                </p>
                              )}
                            </div>
                          ))}
                        </Carousel>
                      </div>
                    ))}
                  </div>
                ) : hasGallery ? (
                  <Carousel label={`${project.name} gallery`} accent="bg-gold" slideClassName="w-[85vw] max-w-[560px] md:w-[560px]">
                    {gallery!.map((g, i) => (
                      <div key={g.src} className="h-full overflow-hidden border border-paper/10 bg-graphite">
                        <div className="relative aspect-video w-full">
                          <Image
                            src={g.src}
                            alt={g.caption ?? project.name}
                            fill
                            sizes="(min-width: 768px) 560px, 85vw"
                            className="object-cover"
                            style={g.focus ? { objectPosition: g.focus } : undefined}
                            loading={i === 0 ? "eager" : "lazy"}
                          />
                        </div>
                        {g.caption && (
                          <p className="border-t border-paper/15 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.15em] text-paper/60">
                            {g.caption}
                          </p>
                        )}
                      </div>
                    ))}
                  </Carousel>
                ) : (
                  <>
                    <div className="overflow-hidden border border-paper/10 bg-graphite">
                      {hasVideo ? (
                        <video
                          controls
                          preload="none"
                          playsInline
                          className="aspect-video w-full bg-graphite object-contain"
                        >
                          <source src={video!} type="video/mp4" />
                        </video>
                      ) : (
                        <div className="relative aspect-video w-full">
                          <Image
                            src={image!}
                            alt={imageCaption ?? project.name}
                            fill
                            sizes="(min-width: 768px) 700px, 100vw"
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>
                    {imageCaption && (
                      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.15em] text-paper/60">
                        {imageCaption}
                      </p>
                    )}
                  </>
                )}
              </motion.div>
            )}

            <div className="grid grid-cols-1 gap-x-10 gap-y-8 pb-14 md:grid-cols-2 md:pl-[8.33%]">
              {[
                {
                  label: "The Problem",
                  content: <p className="text-[15px] leading-relaxed text-paper/70">{project.problem}</p>,
                },
                {
                  label: "Responsibilities",
                  content: (
                    <ul className="space-y-1.5">
                      {project.responsibilities.map((r, i) => (
                        <li key={i} className="flex gap-2 text-[15px] leading-relaxed text-paper/70">
                          <span className="mt-[9px] h-1 w-1 flex-none rounded-full bg-paper/40" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  ),
                },
                ...(tools && tools.length > 0
                  ? [
                      {
                        label: "Tools Used",
                        content: (
                          <div className="flex flex-wrap gap-2">
                            {tools.map((t) => (
                              <span
                                key={t}
                                className="rounded-full border border-paper/25 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-paper/70"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        ),
                      },
                    ]
                  : []),
                {
                  label: "Business Impact",
                  content: <p className="font-display text-xl text-gold md:text-2xl">{project.outcome}</p>,
                },
                {
                  label: "Lessons Learned",
                  content: <p className="text-[15px] leading-relaxed text-paper/70">{project.takeaway}</p>,
                },
              ].map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
                >
                  <div className="mb-2 flex items-center gap-3">
                    <span className="font-mono text-[10px] text-gold">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/60">{f.label}</span>
                  </div>
                  {f.content}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Work() {
  const { kicker, title, projects } = profile.work;
  // Independently toggled (not a single-open accordion) — closing a panel
  // above the viewport used to yank the whole page up under Lenis's
  // frame-pinned scroll, burying whatever the user had just opened.
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]));

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <section id="projects" className="relative px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px] lg:pr-36">
        <Reveal className="kicker mb-10 text-gold">{kicker}</Reveal>
        <SplitText text={title} className="display-h1 mb-16 font-display" />

        <div className="border-t border-paper/10">
          {projects.map((p, i) => (
            <CaseStudy key={i} project={p} open={open.has(i)} onToggle={() => toggle(i)} />
          ))}
        </div>
      </div>
    </section>
  );
}
